import createEntryRoute from "@/features/entry/routes/create-entry";
import deleteEntryRoute from "@/features/entry/routes/delete-entry";
import getEntriesRoute from "@/features/entry/routes/get-entries";
import getEntryRoute from "@/features/entry/routes/get-entry";
import updateEntryRoute from "@/features/entry/routes/update-entry";
import cors from "@fastify/cors";
import fastify from "fastify";

export const server = fastify();

server.register(cors, {});

server.register(createEntryRoute);
server.register(getEntryRoute);
server.register(getEntriesRoute);
server.register(updateEntryRoute);
server.register(deleteEntryRoute);
