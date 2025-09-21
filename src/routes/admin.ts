// src/routes/admin.ts
import { Router, Request, Response } from "express";
import { pool } from "../lib/mysqldb";

const router = Router();

// Type for request body for addProjectDetails
interface ProjectDetail {
  key: string;
  value: string;
}

interface AddProjectDetailsRequest extends Request {
  body: {
    propertyid: string;
    details: ProjectDetail[];
  };
}

// GET /admin/:propertyid
router.get("/:propertyid", async (req: Request, res: Response) => {
  const { propertyid } = req.params;

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      "SELECT `key`, `value` FROM launchpadtable WHERE propertyid = ?",
      [propertyid]
    );
    conn.release();
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching project details:", error);
    return res.status(500).json({ error: "Failed to fetch project details" });
  }
});

// POST /admin/addProjectDetails
router.post(
  "/addProjectDetails",
  async (req: AddProjectDetailsRequest, res: Response) => {
    const { propertyid, details } = req.body;

    if (!propertyid || !Array.isArray(details)) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const values = details
      .filter((d) => d.key && d.value)
      .map((d) => [propertyid, d.key, d.value]);

    if (values.length === 0) {
      return res.status(400).json({ error: "No valid key-value pairs" });
    }

    try {
      const conn = await pool.getConnection();
      await conn.query(
        "INSERT INTO launchpadtable (propertyid, `key`, `value`) VALUES ?",
        [values]
      );
      conn.release();
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Error saving project details:", err);
      return res.status(500).json({ error: "Database error" });
    }
  }
);

export default router;
