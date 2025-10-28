import Finding from "../models/findingsModel.js";

const createFinding = async (req, res) => {
  try {
    const finding = await Finding.create({
      title: req.body.title,
      description: req.body.description,
      severity: req.body.severity,
      status: req.body.status,
      auditId: req.params.auditId,
    });
    res.status(201).json(finding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFindingsByAudit = async (req, res) => {
  try {
    const findings = await Finding.find({ auditId: req.params.auditId }).lean();
    res.status(200).json(findings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFinding = async (req, res) => {
  try {
    const finding = await Finding.findOneAndUpdate(
      { _id: req.params.findingId, auditId: req.params.auditId },
      req.body,
      { new: true }
    );
    if (!finding) {
      return res.status(404).json({ message: "Finding not found" });
    }
    res.status(200).json(finding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFinding = async (req, res) => {
  try {
    const finding = await Finding.findOneAndDelete({
      _id: req.params.findingId,
      auditId: req.params.auditId,
    });
    if (!finding) {
      return res.status(404).json({ message: "Finding not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createFinding,
  getFindingsByAudit,
  updateFinding,
  deleteFinding,
};
