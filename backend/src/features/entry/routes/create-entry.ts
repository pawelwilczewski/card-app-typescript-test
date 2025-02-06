import prisma from "@/db";
import { Entry } from "@prisma/client";
import { FastifyInstance } from "fastify";

export default async function createEntryRoute(server: FastifyInstance): Promise<void> {
  server.post<{ Body: Entry }>("/create/", async (req, reply) => {
    const newEntryBody = req.body;
    newEntryBody.created_at = newEntryBody.created_at ? new Date(req.body.created_at) : new Date();
    // eslint-disable-next-line unicorn/no-null
    newEntryBody.scheduled_at = newEntryBody.scheduled_at ? new Date(req.body.scheduled_at!) : null;
    try {
      const createdEntryData = await prisma.entry.create({ data: req.body });
      reply.send(createdEntryData);
    } catch {
      reply.status(500).send({ msg: "Error creating entry" });
    }
  });
}
