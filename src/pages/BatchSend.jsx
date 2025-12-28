import { useEffect, useState } from "react";
import { useResumeStore } from "../stores/resume.store";
import { useRecruiterStore } from "../stores/recruiter.store";
import { useTemplateStore } from "../stores/template.store";
import { useSendStore } from "../stores/send.store";
import toast from "react-hot-toast";

import {
  HiOutlineDocumentText,
  HiOutlineTemplate,
  HiOutlineUsers,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import { FiLoader } from "react-icons/fi";

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
    toast.success("Batch send completed. Review results below.");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Send Resume (Batch)
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Send a single resume to multiple recruiters in one controlled action.
        </p>
      </div>

      <form
        onSubmit={handleSend}
        className="bg-white border rounded-2xl p-6 space-y-6 shadow-sm"
      >
        <SelectField
          label="Resume"
          icon={<HiOutlineDocumentText />}
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
        >
          <option value="">Select Resume</option>
          {resumes.map((r) => (
            <option key={r._id} value={r._id}>
              {r.label}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Template"
          icon={<HiOutlineTemplate />}
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
        >
          <option value="">Select Template</option>
          {templates.map((t) => (
            <option key={t._id} value={t._id}>
              {t.subject}
            </option>
          ))}
        </SelectField>

        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-2">
            <HiOutlineUsers />
            Select recruiters
          </label>

          <div className="border rounded-xl p-4 max-h-60 overflow-y-auto space-y-2">
            {recruiters.map((r) => (
              <label
                key={r._id}
                className="flex items-center gap-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
              >
                <input
                  type="checkbox"
                  checked={recruiterIds.includes(r._id)}
                  onChange={() => toggleRecruiter(r._id)}
                  className="h-4 w-4"
                />
                <span>
                  {r.name} <span className="text-gray-500">({r.company})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-60"
        >
          {sending ? (
            <>
              <FiLoader className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <HiOutlinePaperAirplane />
              Send Batch
            </>
          )}
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {results.length > 0 && (
        <div className="bg-white border rounded-xl p-4 space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            Batch send results
          </h3>

          <ul className="text-sm text-gray-700 space-y-1">
            {results.map((res, idx) => (
              <li key={idx}>
                {res.recruiterEmail} —{" "}
                <span className="font-medium">{res.status}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const SelectField = ({ label, icon, children, ...props }) => {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <select
        {...props}
        required
        className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {children}
      </select>
    </div>
  );
};

export default BatchSend;
