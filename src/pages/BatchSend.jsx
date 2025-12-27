import { useEffect, useState } from "react";
import { useResumeStore } from "../stores/resume.store";
import { useRecruiterStore } from "../stores/recruiter.store";
import { useTemplateStore } from "../stores/template.store";
import { useSendStore } from "../stores/send.store";

const BatchSend = () => {
  const { resumes, fetchResumes } = useResumeStore();
  const { recruiters, fetchAllRecruiters } = useRecruiterStore();
  const { templates, fetchTemplates } = useTemplateStore();
  const { sendBatch, sending, results, error, clearResults } = useSendStore();

  const [resumeId, setResumeId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [recruiterIds, setRecruiterIds] = useState([]);

  useEffect(() => {
    fetchResumes();
    fetchAllRecruiters();
    fetchTemplates();

    return () => clearResults();
  }, []);

  const toggleRecruiter = (id) => {
    setRecruiterIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleSend = async (e) => {
    e.preventDefault();

    await sendBatch({
      recruiterIds,
      resumeId,
      templateId,
    });
  };

  return (
    <div>
      <h1>Send Resume (Batch)</h1>

      <form onSubmit={handleSend}>
        <select
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          required
        >
          <option value="">Select Resume</option>
          {resumes.map((r) => (
            <option key={r._id} value={r._id}>
              {r.label}
            </option>
          ))}
        </select>

        <select
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
          required
        >
          <option value="">Select Template</option>
          {templates.map((t) => (
            <option key={t._id} value={t._id}>
              {t.subject}
            </option>
          ))}
        </select>

        <div>
          {recruiters.map((r) => (
            <label key={r._id}>
              <input
                type="checkbox"
                checked={recruiterIds.includes(r._id)}
                onChange={() => toggleRecruiter(r._id)}
              />
              {r.name} ({r.company})
            </label>
          ))}
        </div>

        <button type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send Batch"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <ul>
          {results.map((res, idx) => (
            <li key={idx}>
              {res.recruiterEmail} — {res.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BatchSend;
