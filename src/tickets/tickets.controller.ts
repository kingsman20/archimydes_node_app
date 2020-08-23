import * as express from "express";
import { getRepository } from "typeorm";
import { Ticket } from "./ticket.entity";
import { CreateUpdateTicketDto } from "./ticket.dto";
import validationMiddleware from "../middlewares/validation.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import checkRole from "../middlewares/check-role.middleware";

class TicketsController {
  public path = "/tickets";
  public router = express.Router();
  private ticketRepository = getRepository(Ticket);

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, authMiddleware, checkRole, this.getAllTickets);
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreateUpdateTicketDto),
      this.createTicket
    );
    this.router.get(`${this.path}/:id`, authMiddleware, this.getTicketById);
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      checkRole,
      validationMiddleware(CreateUpdateTicketDto, true),
      this.updateTicket
    );
  }

  getAllTickets = async (
    request: express.Request,
    response: express.Response
  ) => {
    const tickets = await this.ticketRepository.find();
    response.send(tickets);
  };

  createTicket = async (request, response: express.Response) => {
    const ticket: CreateUpdateTicketDto = request.body;
    try {
      const newTicket = this.ticketRepository.create({
        ...ticket,
        author: request.user,
      });

      await this.ticketRepository.save(newTicket);
      response.send(newTicket);
    } catch (error) {
      response.status(400).send(`Error in creating ticket ${error}`);
    }
  };

  getTicketById = async (request, response: express.Response) => {
    const id = request.params.id;
    const ticket = await this.ticketRepository.findOne(id, {
      relations: ["author"],
    });

    if (!ticket) {
      return response
        .status(404)
        .send({ message: "Ticket with given ID does not exist" });
    }

    if (request.user.id != ticket.author.id) {
      return response
        .status(403)
        .send({ message: "Access denied: You can only view the ticket you created" });
    }

    ticket.author.password = undefined; // Exclude password field from response

    response.send(ticket);
  };

  updateTicket = async (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id;

    const ticket = await this.ticketRepository.findOne(id);

    if (ticket) {
      const ticketData: CreateUpdateTicketDto = request.body;
      const updatedTicket = {
        ...ticket,
        ...ticketData,
      };

      await this.ticketRepository.update(id, updatedTicket);
      response.send(updatedTicket);
    } else {
      return response
        .status(404)
        .send({ message: "Ticket with given ID does not exist" });
    }
  };
}

export default TicketsController;
