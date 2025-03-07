// proxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

const configureProxy = (app) => {
  const inventoryApiUrl = process.env.INVENTORY_API_URL;

  if (!inventoryApiUrl) {
    console.warn("INVENTORY_API_URL is not set. Proxy will not function.");
    return;
  }

  app.use("/api/movies", createProxyMiddleware({
    target: inventoryApiUrl,
    changeOrigin: true,
    // Enable detailed logging for debugging
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying ${req.method} request to: ${inventoryApiUrl}${req.url}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response with status ${proxyRes.statusCode} from: ${inventoryApiUrl}${req.url}`);
    },
    onError: (err, req, res) => {
      console.error("Proxy encountered an error:", err);
      // It's important to send a response back to the client in case of errors
      res.status(500).send("Proxy error.");
    }
  }));

  console.log(`Proxy configured: /api/movies → ${inventoryApiUrl}`);
};

module.exports = { configureProxy };
