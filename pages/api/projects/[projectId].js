import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { projectId } = req.query;
  const idr = new ObjectId(projectId);

  try {
    const client = await clientPromise;
    const db = client.db("projectcollaborate");

    const project = await db.collection("projects").findOne({ _id: idr });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return; // Make sure to return after sending the response
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
