const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.searchPath = "/api/search";
    this.usersPath = "/api/users";

    // Connecting to database
    this.connectingDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectingDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Body Parser
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.searchPath, require("../routes/search"));
    this.app.use(this.usersPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }
}

module.exports = Server;
