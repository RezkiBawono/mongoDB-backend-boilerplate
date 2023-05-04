// Importing required modules
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const { middlewareLogger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const mongoose = require("mongoose");
const connectToDatabase = require("./config/connectDB");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const errorLogger = require("./middleware/errorLog");
const PORT = process.env.PORT || 3000;

// Configuring environment variables
dotenv.config();

// Connect to MongoDB via mongoose
connectToDatabase();

// Middleware for logger
app.use(middlewareLogger);

// Middleware for CORS
app.use(cors(corsOptions));

// Middleware for parsing incoming requests with JSON payloads
app.use(express.json());

// Middleware for cookie-parser
app.use(cookieParser());

// Middleware for parsing incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World! This is MERN tutorial");
});

// Error handling middleware
app.use(errorHandler);

// Start the server
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
});

// listen for the "error" event on the Mongoose connection object and log it using Winston
mongoose.connection.on("error", (error) => {
  errorLogger.error(error.message);
});
