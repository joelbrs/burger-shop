import z from "zod";
import HashFromString from "@/infra/utils/hashs/hash-generator";
import { UserRepository } from "@/infra/repositories/user.repository";
import { compare } from "@/infra/utils";
import { FastifyReply, FastifyRequest } from "fastify";

export default class UserService {
  constructor(private _repository: UserRepository) {}

  async create(request: FastifyRequest) {
    const user_body_schema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    });

    const { name, email, password } = user_body_schema.parse(request.body);

    const doesUserExists = (await this.findByEmail(email)) !== null;

    if (doesUserExists) {
      throw new Error("User already exists!");
    }

    const user = await this._repository.create({
      name,
      email,
      password_hash: HashFromString(password),
    });

    return user;
  }

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const user_body_schema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });

    const { email, password } = user_body_schema.parse(request.body);
    const user = await this.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const doesPasswordMatches = compare(
      HashFromString(password),
      user.password_hash
    );

    if (!doesPasswordMatches) {
      throw new Error("Invalid credentials!");
    }

    try {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
      };

      const access_token = request.jwt.sign({ login: payload });
      reply.setCookie("access_token", access_token, {
        httpOnly: true,
        secure: true,
      });

      return { access_token };
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string) {
    return await this._repository.findByEmail(email);
  }
}
