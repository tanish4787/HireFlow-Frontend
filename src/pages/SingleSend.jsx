import { useEffect, useState } from "react";
import { useResumeStore } from "../stores/resume.store";
import { useRecruiterStore } from "../stores/recruiter.store";
import { useTemplateStore } from "../stores/template.store";
import { useSendStore } from "../stores/send.store";

const SingleSend = () => {
  const { resumes, fetchResumes } = useResumeStore();
  const { recruiters, fetchRecruiters } = useRecruiterStore();
  const { templates, fetchTemplates } = useTemplateStore();

  const { sendSingle, sending, results, error, clearResults } = useSendStore();

  const [resumeId, setResumeId] = useState("");
  const [recruiterId, setRecruiterId] = useState("");
  const [templateId, setTemplateId] = useState("");

  useEffect(() => {
    fetchResumes();
    fetchRecruiters();
    fetchTemplates();

    return () => clearResults();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    await sendSingle({
      resumeId,
      recruiterId,
      templateId,
    });
  };

  return (
    <div>
      <h1>Send Resume (Single)</h1>

      <form onSubmit={handleSend}>
        <div>
          <label>Resume</label>
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
        </div>

        <div>
          <label>Recruiter</label>
          <select
            value={recruiterId}
            onChange={(e) => setRecruiterId(e.target.value)}
            required
          >
            <option value="">Select Recruiter</option>
            {recruiters.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name} ({r.company})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Template</label>
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
        </div>

        <button type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send Resume"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <div>
          <h3>Send Result</h3>
          <ul>
            {results.map((res, idx) => (
              <li key={idx}>
                {res.recruiterEmail} — {res.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleSend;
