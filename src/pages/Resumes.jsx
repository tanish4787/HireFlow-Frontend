import { useEffect, useState } from "react";
import { useResumeStore } from "../stores/resume.store";

const Resumes = () => {
  const { resumes, loading, error, fetchResumes, uploadResume, deleteResume } =
    useResumeStore();

  const [file, setFile] = useState(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return;

    await uploadResume(file, label);

    setFile(null);
    setLabel("");
    e.target.reset();
  };

  return (
    <div>
      <h1>Resumes</h1>

      <form onSubmit={handleUpload}>
        <div>
          <label>Resume Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Upload Resume (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          Upload
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {resumes.map((resume) => (
          <li key={resume._id}>
            <span>{resume.label}</span>
            <button onClick={() => deleteResume(resume._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resumes;
