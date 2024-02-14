import { FastifyInstance } from "fastify";
import { UserFactory } from "@/domain/factories";

const factory = UserFactory();

export async function UserRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    return factory.create(request, reply);
  });

  app.post("/auth", async (request, reply) => {
    return factory.authenticate(request, reply);
  });
}
