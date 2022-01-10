const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// routes
const form = require("./routes/form");

// connect database
connectDB();

// cors
app.use(cors());

app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// use route
app.use("/api/form", form);

// setting up port

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
