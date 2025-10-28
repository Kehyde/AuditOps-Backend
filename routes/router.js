import express from "express";
import auditController from "../controllers/auditController.js";
import findingsController from "../controllers/findingsController.js";
import pdfController from "../controllers/pdfController.js";

const router = express.Router();
// Basic route
router.get("/", (req, res) => {
  res.send("Welcome to the AuditOps API");
});

//Routes for audits
router.post("/audits", auditController.createAudit);

router.get("/audits", auditController.getAudits);

router.get("/audits/:id", auditController.getAuditById);

router.post("/audits/:id", auditController.updateAudit);

router.delete("/audits/:id", auditController.deleteAudit);

//Routes for findings
router.post("/audits/:auditId/findings", findingsController.createFinding);

router.get("/audits/:auditId/findings", findingsController.getFindingsByAudit);

router.post(
  "/audits/:auditId/findings/:findingId",
  findingsController.updateFinding
);

router.delete(
  "/audits/:auditId/findings/:findingId",
  findingsController.deleteFinding
);

//Routes for pdf generation

router.get("/audits/:id/export", pdfController.exportAuditPDF);

export default router;
