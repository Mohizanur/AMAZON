const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Stripe with secret key
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json()); // Ensure JSON body parsing

// Root route for testing
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success 1" });
});

// Payment creation route
app.post("/payment/create", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log incoming request body

    const total = req.body.total; // Read 'total' from body, not query

    if (!total || total <= 0) {
      return res.status(403).json({ message: "Total must be greater than 0" });
    }

    // Create a payment intent using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

      res.status(201).json({
        clientSecret:paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

// Export API function for Firebase
exports.api = onRequest(app);
