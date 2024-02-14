import { Prisma } from "@prisma/client";
import { UserRepository } from "../user.repository";
import { PrismaClient } from "@prisma/client/extension";

export default class PrismaUserRepository implements UserRepository {
  constructor(private _client: PrismaClient) {}

  async findByEmail(email: string) {
    const user = await this._client.user.findUnique({ where: { email } });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    return await this._client.user.create({ data });
  }
}
