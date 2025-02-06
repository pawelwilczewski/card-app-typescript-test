import prisma from "@/db";
import { Entry } from "@prisma/client";
import { FastifyInstance } from "fastify";

export default async function getEntriesRoute(server: FastifyInstance): Promise<void> {
  server.get<{ Reply: Entry[] }>("/get/", async (req, reply) => {
    const dbAllEntries = await prisma.entry.findMany({});
    reply.send(dbAllEntries);
  });
}
