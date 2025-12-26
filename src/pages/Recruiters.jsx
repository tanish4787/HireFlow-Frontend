import { useEffect, useState } from "react";
import { useRecruiterStore } from "../stores/recruiter.store";

const Recruiters = () => {
  const { recruiters, loading, error, fetchAllRecruiters, addRecruiter } =
    useRecruiterStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchAllRecruiters();
  }, [fetchAllRecruiters]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addRecruiter({ name, email, company, role });

    setName("");
    setEmail("");
    setCompany("");
    setRole("");
    e.target.reset();
  };

  return (
    <div>
      <h1>Recruiters</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          Add Recruiter
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {recruiters.length === 0 && !loading && <p>No recruiters yet</p>}

      <ul>
        {recruiters.map((recruiter) => (
          <li key={recruiter.email}>
            <span>{recruiter.name}</span>
            <span>{recruiter.email}</span> <span>{recruiter.company}</span>
            <span>{recruiter.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recruiters;
