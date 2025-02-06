import prisma from "@/db";
import { Entry } from "@prisma/client";
import { FastifyInstance } from "fastify";

export default async function getEntryRoute(server: FastifyInstance) {
  server.get<{ Body: Entry; Params: { id: string } }>("/get/:id", async (req, reply) => {
    const dbEntry = await prisma.entry.findUnique({
      where: { id: req.params.id },
    });
    if (!dbEntry) {
      reply.status(500).send({ msg: `Error finding entry with id ${req.params.id}` });
    }
    reply.send(dbEntry);
  });
}
