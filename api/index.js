const express = require("express");
const cors = require("cors");
require("dotenv").config();
const UserModel = require("./models/User");
const bcrypt = require("bcryptjs");
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

// Video stop at 1:17:42 [1/7/2025]

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

await mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await UserModel.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      res.json("password ok");
    } else {
      res.status(422).json("wrong password");
    }
  } else {
    res.status(404).json("User not found");
  }
});

app.listen(4000);

//Here at the stage i wanna add the DB
//current IP address (223.233.83.98)
//Username : pratikraorane65
//Password : SOZe8vHFCslU68Hv
//connection string
//mongodb+srv://pratikraorane65:SOZe8vHFCslU68Hv@booking-airbnb-app.ycwfdst.mongodb.net/?retryWrites=true&w=majority&appName=booking-airbnb-app
