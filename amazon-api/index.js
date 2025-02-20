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
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://amazon-clone-monasir-pw0zvg5g1-monasirs-projects.vercel.app",
    ],
  })
);
app.use(express.json());

// Root route for testing
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is running successfully!" });
});

// Payment creation route
app.post("/payment/create", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { total } = req.body;

    if (!total || total <= 0) {
      return res.status(403).json({ message: "Total must be greater than 0" });
    }

    // Create a payment intent using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

// Export for Vercel
module.exports = app;
