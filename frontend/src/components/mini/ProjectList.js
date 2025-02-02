import { useEffect, useState } from "react";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;
    
    try {
      const response = await fetch(`/projects/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete project");
      setProjects(projects.filter((project) => project.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Project List</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                onClick={() => deleteProject(project.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
