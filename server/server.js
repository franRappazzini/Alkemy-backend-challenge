const express = require("express");
const cors = require("cors");
const { sequelize } = require("../db/db");
const auth = require("./routes/auth");
const char = require("./routes/characters");
const server = express();

server.use(cors());
server.use(express.json());

server.use("/auth", auth);
server.use("/characters", char);

server.listen(3001, () => {
  sequelize.sync({ force: false });
  console.log("Server listening on port: 3001");
});
