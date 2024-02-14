import UserService from "@/application/services/user.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { ICreateUserRequest } from "../../../@types/users/create-user";
import { IAuthenticateRequest } from "../../../@types/users/authenticate-user";

export default class UserController {
  constructor(private readonly _service: UserService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const user = await this._service.create(request);
    return reply.status(201).send(user);
  }

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const user = await this._service.authenticate(request, reply);
    return reply.status(200).send(user);
  }
}
