const express = require("express");
const mongoose = require("mongoose");
const { signUp } = require("./controllers/loginSignup.js");
const dotenv = require("dotenv");
const {
  secretCode,
  verify,
  qrCodeGenerator,
} = require("./Controllers/verification.js");
const BodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.post("/signup", signUp);
app.post("/authentication", secretCode);

app.post("/qrcode", qrCodeGenerator);
// app.post("/token", token);
app.post("/verify", verify);

const port = 3000;

const uri =
  "mongodb+srv://anurag2FA:3ZrkbyAN4DUUYjD6@2factorauthentication.eoc5dwb.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

connect();

app.listen(port, () => {
  console.log("Hi I am here");
});
