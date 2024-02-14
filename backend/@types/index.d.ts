import { JWT } from "@fastify/jwt";
import { UserType } from "@prisma/client";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }

  export interface FastifyInstance {
    authUser: any;
    authClient: any;
    authAdmin: any;
  }
}

type UserPayload = {
  login: {
    id: string;
    email: string;
    name: string;
    type: UserType;
  };
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    User: UserPayload;
  }
}
