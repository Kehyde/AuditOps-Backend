import Audit from "../models/auditsModel";
import auditController from "../controllers/auditController";
import { jest, describe, it, expect, beforeAll, afterAll } from "@jest/globals";

describe("createAudit controller", () => {
  it("should create a new audit and return 201 status", async () => {
    // Mock request and response objects
    const req = {
      body: {
        title: "Unit Test Audit",
        description: "Testing audit creation",
        clientName: "TestClient",
        status: "Open",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(), // allows chaining (res.status(...).json(...))
      json: jest.fn(),
    };

    // Mock the Audit.create() method to simulate database success
    const mockAudit = { ...req.body, _id: "mockedId123" };
    Audit.create = jest.fn().mockResolvedValue(mockAudit);

    // Run the controller function
    await auditController.createAudit(req, res);

    // Assertions
    expect(Audit.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockAudit);
  });

  it("should handle errors and return 500 status", async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate an error from Mongoose
    Audit.create = jest.fn().mockRejectedValue(new Error("DB error"));

    await auditController.createAudit(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });
});
