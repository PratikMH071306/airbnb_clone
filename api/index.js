const express = require("express");
const cors = require("cors");
const app = express();

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

//For parsing application/json
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  res.json({
    message: `User registered with Name: ${name}, Email: ${email}, Password: ${password}`,
  });
});

app.listen(4000);

//Here at the stage i wanna add the DB

Mongose = require("mongoose");
