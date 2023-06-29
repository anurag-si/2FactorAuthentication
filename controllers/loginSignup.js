const express = require("express");
const newUser = require("../models/userAuth");
const Speakeasy = require("speakeasy");

module.exports.signUp = async (req, res, next) => {
  const { email, contact, password } = req.body;

  let user = await newUser.findOne({ email });
  if (user) {
    return res.status(400).send("User already exists");
  } else {
    user = new newUser({
      email: email,
      contact: contact,
      password: password,
    });
    await user.save();
    res.send(user);
    console.log(user);
  }
};

module.exports.secretCode = async (req, res, next) => {
  var secret = Speakeasy.generateSecret({ length: 20 });
  res.send({ secret: secret.base32 });
};

module.exports.token = async (req, res, next) => {
    res.send({
        "token": Speakeasy.totp({
            secret: req.body.secret,
            encoding: "base32"
        }),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
    });
}

module.exports.verify = async (req,res, next) => {
    res.send({
        "valid": Speakeasy.totp.verify({
            secret: req.body.secret,
            encoding: "base32",
            token: req.body.token,
            window: 0
        })
    });
}
