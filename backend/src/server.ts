import { app } from "./app";
import { env } from "./infra/utils";

app.listen({ host: "0.0.0.0", port: env.PORT }, (_, address) => {
  console.log(`Server running at ${address}`);
});
