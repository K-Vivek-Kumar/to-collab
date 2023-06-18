import clientPromise from "../lib/mongodb";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  details: string;
  deadline: Date;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <div>
      <h1>Projects from all time</h1>
      <p>
        <small>(All Projects)</small>
      </p>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h1>{project.title}</h1>
            <h2>{project._id}</h2>
            <h3>{project.details}</h3>
            <p>{project.deadline}</p>
            <Link href={`/projects/${project._id}`} legacyBehavior>
              <a>View Details</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("projectcollaborate");

    const p = await db.collection("projects").find({}).toArray();

    return {
      props: { projects: JSON.parse(JSON.stringify(p)) },
    };
  } catch (e) {
    console.error(e);
  }
}
