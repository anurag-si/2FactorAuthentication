const express = require("express");
const Speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const session = require("express-session");

let secret;

module.exports.secretCode = async (req, res, next) => {
  secret = Speakeasy.generateSecret({ length: 20 });
  console.log(secret);
  res.send("");
};

module.exports.qrCodeGenerator = async (req, res, next) => {
  const secret = await req.cookies.secret;
  const data = await qrcode.toDataURL(secret.otpauth_url);
  console.log(data);
  res.send("");
};

module.exports.verify = async (req, res, next) => {
  const isValid = Speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: "822910",
  });
  console.log(isValid);
  res.send({
    valid: isValid,
  });
};
