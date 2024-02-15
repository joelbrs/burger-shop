import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyCors from "@fastify/cors";
import cookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { UserRoutes } from "./presentations/routes/user.routes";
import ProductRoutes from "./presentations/routes/product.routes";
import { randomBytes } from "crypto";
import { authUser } from "./infra/utils/auth/authenticate-user";

export const app: FastifyInstance = fastify();

/** Modules */
app.register(cookie, { hook: "preHandler" });
app.register(fastifyJwt, { secret: randomBytes(32).toString("hex") });
app.register(fastifyCors, {
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  origin: true,
});

/** Global Hooks */
app.addHook("preHandler", async (request, _) => {
  request.jwt = app.jwt;
});

/** Decorates */
app.decorate("authClient", (request: FastifyRequest, reply: FastifyReply) => {
  return authUser(request, reply, "CLIENT");
});
app.decorate("authAdmin", (request: FastifyRequest, reply: FastifyReply) => {
  return authUser(request, reply, "ADMIN");
});
app.decorate("authUser", (request: FastifyRequest, reply: FastifyReply) => {
  return authUser(request, reply);
});

/** Routes */
app.register(UserRoutes, { prefix: "/users" });
app.register(ProductRoutes, { prefix: "/products" });
