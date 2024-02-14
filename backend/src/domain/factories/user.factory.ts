import UserService from "@/application/services/user.service";
import PrismaUserRepository from "@/infra/repositories/prisma/prisma-user.repository";
import { prisma } from "@/infra/utils";
import UserController from "@/presentations/controllers/user.controller";

export const UserFactory = (): UserController => {
  const repository = new PrismaUserRepository(prisma);
  const service = new UserService(repository);

  return new UserController(service);
};
