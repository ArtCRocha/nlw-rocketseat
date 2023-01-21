import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";
const port = 3030;

const app = Fastify();

app.register(cors); // Permite especificar qual endereço front-end irá utilizar essa api: {origin: ["http://localhsot..."]}

app.register(appRoutes);

app.listen(
  {
    port: port,
  },
  () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
  }
);
