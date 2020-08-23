import App from "./app";
import TicketController from "./tickets/tickets.controller";
import UserController from "./users/users.controller";
import { createConnection } from "typeorm";
import config from "./ormconfig";
// const config = require('./ormconfig');

require("dotenv").config();

const port = process.env.PORT || 3001;

// Connect to the DB and start the server
(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log("Error connecting to the database", error);
    return error;
  }

  // Initialize the controllers
  const app = new App([new TicketController(), new UserController()], port);

  app.listen();
})();
