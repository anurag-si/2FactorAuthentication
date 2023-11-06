const express = require("express");
const newUser = require("../Models/userAuth");
const Speakeasy = require("speakeasy");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser = await newUser.findOne({ email });

  async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  if (existingUser) {
    return res.status(400).send("User already exists");
  } else {
    hashPassword(password).then((hashedPassword) => {
      const user = new newUser({
        email: email,
        password: password,
      });
      user
        .save()
        .then((result) => {
          generateToken(email, res);
          res.status(201).send({
            message: "Registration Successful",
            result,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "User not created",
            error,
          });
        });
    });
  }
};
