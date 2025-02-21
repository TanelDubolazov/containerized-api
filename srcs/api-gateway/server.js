const path = require("path");
// Explicitly load the root .env (two levels up from this file)
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const fs = require("fs");
const yaml = require("js-yaml");
const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const { configureProxy } = require("./proxy");

let openApiDocument = {};
try {
  const openApiFile = fs.readFileSync(path.join(__dirname, "openapi.yaml"), "utf8");
  openApiDocument = yaml.load(openApiFile);
} catch (err) {
  console.error("⚠️ Could not load openapi.yaml:", err.message);
}

const app = express();

// If we have an OpenAPI document, serve Swagger UI
if (Object.keys(openApiDocument).length > 0) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
}

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure HTTP Proxy for inventory routes, etc.
configureProxy(app);

// Any custom routes (e.g., billing)
const billingRoutes = require("./routes");
app.use("/api/billing", billingRoutes);

// Start gateway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
  if (Object.keys(openApiDocument).length > 0) {
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  } else {
    console.log("No OpenAPI spec loaded – Swagger docs not available.");
  }
});
