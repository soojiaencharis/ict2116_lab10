const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/search", (req, res) => {
  const { username } = req.body;
  // Simulate XSS vulnerability by returning raw input
  res.send(`<p>Welcome, ${username}</p>`);
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});