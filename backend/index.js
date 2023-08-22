const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/data");
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Mongoose
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connection established");
}

// Routes
// Home Route
server.get("/", (req, res) => {
  res.send("Hello World");
});

// API Route
server.use("/api/v1/data", routes.routes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
