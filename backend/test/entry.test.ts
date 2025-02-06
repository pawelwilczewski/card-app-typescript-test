import prisma from "@/db";
import { server } from "@/server";
import { Entry } from "@prisma/client";

describe("server routes", () => {
  let testEntry: Entry;

  beforeAll(async () => {
    await server.ready();
  });

  beforeEach(async () => {
    testEntry = await prisma.entry.create({
      data: {
        title: "Test Entry",
        description: "Initial Description",
        created_at: new Date(),
      },
    });
  });

  afterEach(async () => {
    await prisma.entry.deleteMany();
  });

  afterAll(async () => {
    await server.close();
  });

  describe("POST /create/", () => {
    it("should_createNewEntry_withValidData", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/create/",
        payload: {
          title: "New Entry",
          description: "Test Description",
        },
      });

      expect(response.statusCode).toBe(200);
      const createdEntry = JSON.parse(response.payload);
      expect(createdEntry.title).toBe("New Entry");
    });

    it("should_return400_whenScheduledAtIsInPast", async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const response = await server.inject({
        method: "POST",
        url: "/create/",
        payload: {
          title: "New Entry",
          description: "Test Description",
          scheduled_at: pastDate.toISOString(),
        },
      });

      expect(response.statusCode).toBe(400);
    });

    it("should_handleMissingCreatedAtBySettingCurrentDate", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/create/",
        payload: {
          title: "No Date Entry",
          description: "Test",
        },
      });

      const createdEntry = JSON.parse(response.payload);
      expect(new Date(createdEntry.created_at).getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe("DELETE /delete/:id", () => {
    it("should_deleteExistingEntry", async () => {
      const response = await server.inject({
        method: "DELETE",
        url: `/delete/${testEntry.id}`,
      });

      expect(response.statusCode).toBe(200);
    });

    it("should_return500_whenDeletingNonExistentEntry", async () => {
      const response = await server.inject({
        method: "DELETE",
        url: "/delete/non-existent-id",
      });

      expect(response.statusCode).toBe(500);
    });
  });

  describe("GET /get/", () => {
    it("should_returnAllEntries", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/get/",
      });

      expect(response.statusCode).toBe(200);
      const entries = JSON.parse(response.payload);
      expect(entries.length).toBe(1);
      expect(entries[0].id).toBe(testEntry.id);
    });
  });

  describe("GET /get/:id", () => {
    it("should_returnExistingEntry", async () => {
      const response = await server.inject({
        method: "GET",
        url: `/get/${testEntry.id}`,
      });

      expect(response.statusCode).toBe(200);
      const entry = JSON.parse(response.payload);
      expect(entry.id).toBe(testEntry.id);
    });

    it("should_return500_forNonExistentId", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/get/non-existent-id",
      });

      expect(response.statusCode).toBe(500);
    });
  });

  describe("PUT /update/:id", () => {
    it("should_updateExistingEntry", async () => {
      const updateData = {
        title: "Updated Title",
        description: "Updated Description",
      };

      const response = await server.inject({
        method: "PUT",
        url: `/update/${testEntry.id}`,
        payload: updateData,
      });

      expect(response.statusCode).toBe(200);

      const updatedEntry = await prisma.entry.findUnique({
        where: { id: testEntry.id },
      });
      expect(updatedEntry?.title).toBe(updateData.title);
    });

    it("should_return400_whenUpdatingWithPastScheduledAt", async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const response = await server.inject({
        method: "PUT",
        url: `/update/${testEntry.id}`,
        payload: {
          scheduled_at: pastDate.toISOString(),
        },
      });

      expect(response.statusCode).toBe(400);
    });

    it("should_return500_whenUpdatingNonExistentEntry", async () => {
      const response = await server.inject({
        method: "PUT",
        url: "/update/non-existent-id",
        payload: {
          title: "Should Fail",
        },
      });

      expect(response.statusCode).toBe(500);
    });
  });

  describe("complex_scenario", () => {
    it("should_handleFullCrudCycle", async () => {
      const createResponse = await server.inject({
        method: "POST",
        url: "/create/",
        payload: {
          title: "CRUD Test",
          description: "Test Description",
        },
      });
      const createdEntry = JSON.parse(createResponse.payload);

      const getResponse = await server.inject({
        method: "GET",
        url: `/get/${createdEntry.id}`,
      });
      expect(getResponse.statusCode).toBe(200);

      const updateResponse = await server.inject({
        method: "PUT",
        url: `/update/${createdEntry.id}`,
        payload: {
          title: "Updated Title",
        },
      });
      expect(updateResponse.statusCode).toBe(200);

      const deleteResponse = await server.inject({
        method: "DELETE",
        url: `/delete/${createdEntry.id}`,
      });
      expect(deleteResponse.statusCode).toBe(200);

      const getAfterDelete = await server.inject({
        method: "GET",
        url: `/get/${createdEntry.id}`,
      });
      expect(getAfterDelete.statusCode).toBe(500);
    });
  });
});
