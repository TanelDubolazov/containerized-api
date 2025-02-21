const path = require("path");
// Explicitly load the root .env (two levels up from this file)
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const express = require("express");
const cors = require("cors");
const db = require("./app/config/database.js");
const { healthCheck } = require("./app/controllers/healthcheck");
const { consumeMessages } = require("./amqpConsumer");

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check endpoint
app.get("/health", healthCheck);

// Sync with DB and then consume messages
db.sync()
  .then(() => {
    console.log("Database synced successfully.");

    // Start consuming RabbitMQ messages
    consumeMessages();

    const port = process.env.PORT || 8081;
    app.listen(port, () => {
      console.log(`Billing API listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
