const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

//Creación del servidor
const server = express();

//Uso de middlewares
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

//Uso de rutas
server.use(router);

module.exports = server;
