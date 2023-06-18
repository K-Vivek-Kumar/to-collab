import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, details, deadline } = req.body;

      // Connect to the MongoDB client
      const client = await clientPromise;
      const db = client.db("projectcollaborate");

      // Create a new project document in the collection
      const result = await db.collection("projects").insertOne({
        title,
        details,
        deadline,
      });

      // Return the newly created project details
      res.status(201).json(result.ops[0]);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
