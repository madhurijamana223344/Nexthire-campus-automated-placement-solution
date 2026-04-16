// ============================================================
// Central API configuration for Nexthire
// Since Nginx proxies /api/ → localhost:5000 on EC2,
// we use a relative URL ("/api") so it works in ALL environments:
//   - Local dev  → hits localhost:5000 via Vite proxy
//   - Production → hits same EC2 IP via Nginx reverse proxy
// ============================================================

const API_BASE = "/api";

export default API_BASE;
