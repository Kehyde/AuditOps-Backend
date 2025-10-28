import Audit from "../models/auditsModel.js";
import Finding from "../models/findingsModel.js";

const createAudit = async (req, res) => {
  try {
    const audit = await Audit.create(req.body);
    res.status(201).json(audit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAudits = async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.clientName) filters.clientName = req.query.clientName;

    const audits = await Audit.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: "findings", // Mongo collection name for findings
          localField: "_id",
          foreignField: "auditId",
          as: "findings",
        },
      },
      {
        $addFields: {
          findingsCount: { $size: "$findings" }, // adds findingsCount
        },
      },
      {
        $project: {
          findings: 0,
        },
      },
    ]);

    res.status(200).json(audits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAuditById = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id).lean();
    if (!audit) {
      return res.status(404).json({ error: "Audit not found" });
    }

    //fetch associated findings
    const findings = await Finding.find({ auditId: audit._id }).lean();

    //combine audit with findings
    const auditWithFindings = {
      ...audit,
      findings: findings,
    };

    res.status(200).json(auditWithFindings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).lean();
    if (!audit) {
      return res.status(404).json({ error: "Audit not found" });
    }
    res.status(200).json(audit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndDelete(req.params.id).lean();
    if (!audit) {
      return res.status(404).json({ error: "Audit not found" });
    }
    res.status(200).json({ message: "Audit deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createAudit,
  getAudits,
  getAuditById,
  updateAudit,
  deleteAudit,
};
