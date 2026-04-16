#!/bin/bash

# ============================================================
# Nexthire - AWS EC2 Ubuntu Deployment Script
# Frontend: React + Vite  |  Backend: Node.js/Express
# ============================================================

set -e  # Exit on any error

echo "🚀 Starting Nexthire Deployment on Ubuntu EC2..."

# ── 1. SYSTEM UPDATES & BASE PACKAGES ──────────────────────
echo "📦 Updating system and installing base packages..."
sudo apt update -y
sudo apt install -y git nginx curl

# ── 2. NODE.JS (LTS via NodeSource) ────────────────────────
echo "📦 Installing Node.js LTS..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# ── 3. PM2 (Process Manager) ───────────────────────────────
echo "📦 Installing PM2 globally..."
sudo npm install -g pm2

# ── 4. CLONE REPOSITORY ────────────────────────────────────
echo "📁 Cloning repository..."
cd /home/ubuntu
rm -rf app
git clone https://github.com/madhurijamana223344/Nexthire-campus-automated-placement-solution.git app

# Fix permissions so Nginx can serve files
sudo chmod 755 /home/ubuntu
sudo chmod -R 755 /home/ubuntu/app

# ── 5. PATHS ───────────────────────────────────────────────
BACKEND_DIR="/home/ubuntu/app/backend"
FRONTEND_DIR="/home/ubuntu/app/react-project"
DEPLOY_USER="ubuntu"

# ══════════════════════════════════════════════════════════════
# BACKEND SETUP
# ══════════════════════════════════════════════════════════════
echo ""
echo "⚙️  Setting up Backend..."
cd "$BACKEND_DIR"

# Stop existing PM2 process if running
pm2 stop nexthire-backend 2>/dev/null || true
pm2 delete nexthire-backend 2>/dev/null || true

# Install dependencies
npm install --omit=dev

# Write .env file
cat > .env << 'ENVEOF'
MONGO_URI=mongodb://jamanamadhuri:madhuri123@ac-qtxx4ro-shard-00-00.gpjhos7.mongodb.net:27017,ac-qtxx4ro-shard-00-01.gpjhos7.mongodb.net:27017,ac-qtxx4ro-shard-00-02.gpjhos7.mongodb.net:27017/?ssl=true&replicaSet=atlas-10jhvg-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
PORT=5000
ENVEOF

# Kill any process using port 5000 (fixes EADDRINUSE)
fuser -k 5000/tcp 2>/dev/null || true
sleep 1

# Start backend with PM2
pm2 start server.js --name "nexthire-backend" --interpreter node
pm2 save

# Configure PM2 to auto-start on reboot
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u "$DEPLOY_USER" --hp /home/$DEPLOY_USER
pm2 save

echo "✅ Backend running on port 5000"

# ══════════════════════════════════════════════════════════════
# FRONTEND SETUP (Vite build → dist/)
# ══════════════════════════════════════════════════════════════
echo ""
echo "⚙️  Setting up Frontend..."
cd "$FRONTEND_DIR"

npm install

# Build with increased memory limit (avoids OOM on small instances)
NODE_OPTIONS="--max-old-space-size=1024" npm run build

echo "✅ Frontend built at: $FRONTEND_DIR/dist"

# ══════════════════════════════════════════════════════════════
# NGINX CONFIGURATION
# ══════════════════════════════════════════════════════════════
echo ""
echo "⚙️  Configuring Nginx..."

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Write Nexthire Nginx config
sudo tee /etc/nginx/sites-available/nexthire > /dev/null << 'NGINXEOF'
server {
    listen 80;
    server_name _;

    # ── Serve React/Vite frontend (dist folder) ──
    root /home/ubuntu/app/react-project/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # ── Reverse proxy API to backend port 5000 ──
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

    # ── Serve uploaded files (profile images, etc.) ──
    location /uploads/ {
        alias /home/ubuntu/app/backend/uploads/;
        access_log off;
    }
}
NGINXEOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/nexthire /etc/nginx/sites-enabled/nexthire

# Test config and reload
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx

echo "✅ Nginx configured and running"

# ══════════════════════════════════════════════════════════════
# FINAL STATUS
# ══════════════════════════════════════════════════════════════
echo ""
echo "════════════════════════════════════════════════"
echo "✅  NEXTHIRE DEPLOYMENT COMPLETE!"
echo "════════════════════════════════════════════════"
echo ""
echo "🌐 App URL:      http://$(curl -s http://checkip.amazonaws.com)"
echo "⚙️  Backend:      PM2 → port 5000"
echo "🖥️  Frontend:     Nginx → /home/ubuntu/app/react-project/dist"
echo ""
echo "📋 Useful commands:"
echo "   pm2 status                  → Check backend status"
echo "   pm2 logs nexthire-backend   → View backend logs"
echo "   sudo systemctl status nginx → Check Nginx status"
echo "   sudo nginx -t               → Test Nginx config"
echo "════════════════════════════════════════════════"
