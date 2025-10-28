import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import Audit from "../models/auditsModel.js";
import Finding from "../models/findingsModel.js";

const exportAuditPDF = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id).lean();
    if (!audit) return res.status(404).json({ error: "Audit not found" });

    const findings = await Finding.find({ auditId: audit._id }).lean();

    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const filePath = path.join(
      "exports",
      `${audit.title.replace(/ /g, "_")}.pdf`
    );

    if (!fs.existsSync("exports")) fs.mkdirSync("exports");
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Default text color and font
    doc.fillColor("#000000").font("Helvetica");

    // Header
    doc.fontSize(22).text(audit.title, { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Client: ${audit.clientName}`);
    doc.text(`Status: ${audit.status}`);
    doc.text(`Created: ${new Date(audit.createdAt).toLocaleDateString()}`);
    doc.moveDown();

    // Findings
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("Findings", { underline: true });
    doc.moveDown();

    findings.forEach((f, idx) => {
      // Bold title for each finding
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text(`${idx + 1}. ${f.title}`);

      // Details
      doc.fontSize(12).font("Helvetica").text(`Severity: ${f.severity}`);
      doc.text(`Status: ${f.status}`);
      doc.text(f.description);
      doc.moveDown(0.5);

      // Separator line between findings
      if (idx < findings.length - 1) {
        doc
          .strokeColor("#000000")
          .lineWidth(0.5)
          .moveTo(doc.page.margins.left, doc.y)
          .lineTo(doc.page.width - doc.page.margins.right, doc.y)
          .stroke();
        doc.moveDown(0.5);
      }
    });

    // Footer
    doc.moveDown();
    doc.fontSize(10).text("Property of AuditOps", {
      align: "center",
      opacity: 0.6,
    });

    doc.end();

    stream.on("finish", () => {
      res.download(filePath, `${audit.title.replace(/ /g, "_")}.pdf`);
    });
  } catch (error) {
    console.error("Error in exportAuditPDF:", error);
    res.status(500).json({ error: error.message });
  }
};

export default {
  exportAuditPDF,
};
