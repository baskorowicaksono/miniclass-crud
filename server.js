// Importing Modules
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const passport = require("passport");
const configurePassport = require("./config/passport-jwt-config");
const { sequelize } = require("./models/");

// Import Routes
const authRoute = require("./routers/auth");
const miniclassRoute = require("./routers/miniclass");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static Middleware
app.use(express.static(path.join(__dirname, "./public")));
app.use("/uploads", express.static("uploads"));

// Passport setup middleware
app.use(passport.initialize());
configurePassport();

// Route Middlewares
app.use("/api/user", authRoute);
app.use("/layanan", miniclassRoute);

// HTML file uploader
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public", "login.html"))
})

app.get("/register.html", (req, res) => {
    res.sendFile(path.join(__dirname, "./public", "register.html"))
})

// DB Connection
app.listen({ port: 3001 }, async () => {
    console.log("Server up on http://localhost:3001\n");
    await sequelize.authenticate();
    console.log("\nDatabase Connected!");
});