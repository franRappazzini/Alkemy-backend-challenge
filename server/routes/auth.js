const { Router } = require("express");
const auth = Router();

auth.get("/login", (req, res) => {});

auth.get("/register", (req, res) => {});

module.exports = auth;
