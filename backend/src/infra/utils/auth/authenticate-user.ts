import { FastifyJWT } from "@fastify/jwt";
import { UserType } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

export async function authUser(
  request: FastifyRequest,
  reply: FastifyReply,
  user_type?: UserType
) {
  const cookie = request.cookies.access_token;

  if (cookie) {
    const header_auth = request.headers["authorization"];

    if (header_auth) {
      const token = header_auth?.replace("Bearer", "").trim();
      const decoded_token = request.jwt.decode<FastifyJWT["User"]>(token);

      if (
        (!user_type && decoded_token) ||
        (user_type && decoded_token && decoded_token.login.type === user_type)
      )
        return;
    }
    return reply.status(401).send({ error: "Unauthorized" });
  }
}
