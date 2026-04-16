#!/bin/bash

# ============================================================
# Nexthire — AWS EC2 Amazon Linux Deployment Script
# Frontend: React + Vite  |  Backend: Node.js/Express + PM2
# OS: Amazon Linux 2023  |  User: ec2-user
# ============================================================

set -e  # Exit immediately on any error

DEPLOY_USER="ec2-user"
APP_DIR="/home/ec2-user/app"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/react-project"

echo "🚀 Starting Nexthire Deployment on Amazon Linux..."

# ── 1. SYSTEM UPDATES ──────────────────────────────────────
echo ""
echo "📦 Updating system packages..."
sudo dnf update -y
sudo dnf install -y git nginx

# ── 2. NODE.JS 22 via NVM ──────────────────────────────────
echo ""
echo "📦 Installing NVM and Node.js 22 (LTS)..."

# Install nvm
export NVM_DIR="/home/$DEPLOY_USER/.nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load nvm in this script session
export NVM_DIR="/home/$DEPLOY_USER/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

# Install and use Node.js 22
nvm install 22
nvm use 22
nvm alias default 22

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version:     $(npm -v)"

# ── 3. PM2 (Process Manager) ───────────────────────────────
echo ""
echo "📦 Installing PM2 globally..."
npm install -g pm2

# ── 4. CLONE REPOSITORY ────────────────────────────────────
echo ""
echo "📁 Cloning Nexthire repository..."
cd /home/$DEPLOY_USER
rm -rf app
git clone https://github.com/madhurijamana223344/Nexthire-campus-automated-placement-solution.git app

# Allow Nginx to access files in home directory
sudo chmod 755 /home/$DEPLOY_USER
sudo chmod -R 755 $APP_DIR

# ══════════════════════════════════════════════════════════
# BACKEND SETUP
# ══════════════════════════════════════════════════════════
echo ""
echo "⚙️  Setting up Backend..."
cd "$BACKEND_DIR"

# Stop existing PM2 process (ignore errors if not running)
pm2 stop nexthire-backend  2>/dev/null || true
pm2 delete nexthire-backend 2>/dev/null || true

# Kill anything already on port 5000 (fixes EADDRINUSE)
sudo fuser -k 5000/tcp 2>/dev/null || true
sleep 1

# Install production dependencies
npm install --omit=dev

# Write .env configuration
cat > .env << 'ENVEOF'
MONGO_URI=mongodb://jamanamadhuri:madhuri123@ac-qtxx4ro-shard-00-00.gpjhos7.mongodb.net:27017,ac-qtxx4ro-shard-00-01.gpjhos7.mongodb.net:27017,ac-qtxx4ro-shard-00-02.gpjhos7.mongodb.net:27017/?ssl=true&replicaSet=atlas-10jhvg-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
PORT=5000
ENVEOF

# Start backend with PM2 using the nvm-managed node
NODE_PATH="$(which node)"
pm2 start server.js --name "nexthire-backend" --interpreter "$NODE_PATH"
pm2 save

# Configure PM2 auto-start on reboot (Amazon Linux / systemd)
NODE_BIN_PATH="$(dirname $(which node))"
sudo env PATH=$PATH:$NODE_BIN_PATH $(which pm2) startup systemd -u $DEPLOY_USER --hp /home/$DEPLOY_USER
pm2 save

echo "✅ Backend started on port 5000"

# ══════════════════════════════════════════════════════════
# FRONTEND SETUP (Vite → builds to dist/)
# ══════════════════════════════════════════════════════════
echo ""
echo "⚙️  Setting up Frontend (Vite)..."
cd "$FRONTEND_DIR"

npm install

# Build with extra memory (needed on t2.micro/t3.micro)
NODE_OPTIONS="--max-old-space-size=1024" npm run build

echo "✅ Frontend built at: $FRONTEND_DIR/dist"

# ══════════════════════════════════════════════════════════
# NGINX CONFIGURATION (Amazon Linux: conf.d/)
# ══════════════════════════════════════════════════════════
echo ""
echo "⚙️  Configuring Nginx..."

# Remove any conflicting default config
sudo rm -f /etc/nginx/conf.d/default.conf

# Write Nexthire Nginx config
sudo tee /etc/nginx/conf.d/nexthire.conf > /dev/null << 'NGINXEOF'
server {
    listen 80;
    server_name _;

    # Serve React/Vite frontend (dist folder)
    root /home/ec2-user/app/react-project/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Reverse proxy API calls to backend on port 5000
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve uploaded files (profile images, resumes, etc.)
    location /uploads/ {
        alias /home/ec2-user/app/backend/uploads/;
        access_log off;
    }
}
NGINXEOF

# Validate Nginx config before restarting
sudo nginx -t

# Enable and start Nginx
sudo systemctl enable nginx
sudo systemctl restart nginx

echo "✅ Nginx configured and running"

# ══════════════════════════════════════════════════════════
# FINAL STATUS
# ══════════════════════════════════════════════════════════
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com 2>/dev/null || echo "<your-ec2-public-ip>")

echo ""
echo "══════════════════════════════════════════════════════"
echo "✅  NEXTHIRE DEPLOYMENT COMPLETE!"
echo "══════════════════════════════════════════════════════"
echo ""
echo "🌐 App URL:       http://$PUBLIC_IP"
echo "⚙️  Backend:       PM2 (port 5000) — Node.js $(node -v)"
echo "🖥️  Frontend:      Nginx → $FRONTEND_DIR/dist"
echo ""
echo "📋 Useful commands:"
echo "   pm2 status                   → Check backend status"
echo "   pm2 logs nexthire-backend    → View backend logs"
echo "   sudo systemctl status nginx  → Check Nginx status"
echo "   sudo nginx -t                → Test Nginx config"
echo "   sudo tail -f /var/log/nginx/error.log"
echo "══════════════════════════════════════════════════════"
