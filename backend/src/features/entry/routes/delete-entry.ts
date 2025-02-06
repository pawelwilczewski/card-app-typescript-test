import prisma from "@/db";
import { FastifyInstance } from "fastify";

export default async function deleteEntryRoute(server: FastifyInstance) {
  server.delete<{ Params: { id: string } }>("/delete/:id", async (req, reply) => {
    try {
      await prisma.entry.delete({ where: { id: req.params.id } });
      reply.send({ msg: "Deleted successfully" });
    } catch {
      reply.status(500).send({ msg: "Error deleting entry" });
    }
  });
}