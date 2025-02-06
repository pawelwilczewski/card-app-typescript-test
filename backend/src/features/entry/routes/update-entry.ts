import prisma from "@/db";
import { Entry } from "@prisma/client";
import { FastifyInstance } from "fastify";

export default async function updateEntryRoute(server: FastifyInstance) {
  server.put<{ Params: { id: string }; Body: Entry }>("/update/:id", async (req, reply) => {
    let updatedEntryBody = req.body;
    updatedEntryBody.created_at
      ? (updatedEntryBody.created_at = new Date(req.body.created_at))
      : (updatedEntryBody.created_at = new Date());
    try {
      await prisma.entry.update({
        data: req.body,
        where: { id: req.params.id },
      });
      reply.send({ msg: "Updated successfully" });
    } catch {
      reply.status(500).send({ msg: "Error updating" });
    }
  });
}
