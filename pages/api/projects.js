import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("projectcollaborate");

    const movies = await db.collection("projects").find({}).sort({}).toArray();

    res.json(movies);
  } catch (e) {
    console.error(e);
  }
};
