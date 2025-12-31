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
  }, [fetchAllRecruiters, fetchResumes, fetchTemplates, clearResults]);

  const toggleRecruiter = (id) => {
    setRecruiterIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleSend = async (e) => {
    e.preventDefault();
    await sendBatch({ recruiterIds, resumeId, templateId });
    toast.success("Batch send completed. Review results below.");
  };

  return (
    <div className="space-y-10 animate-fade-up">
      <div>
        <h1 className="text-2xl font-semibold text-gray-100">
          Batch Resume Send
        </h1>
        <p className="text-sm text-gray-400 mt-1 max-w-xl">
          Send a single resume to multiple recruiters in one deliberate,
          controlled action.
        </p>
      </div>

      <form
        onSubmit={handleSend}
        className="
          bg-[#161A22]
          border border-[#23283A]
          rounded-2xl
          p-6 md:p-8
          space-y-6
          shadow-[0_20px_40px_rgba(0,0,0,0.45)]
        "
      >
        <SelectField
          label="Resume"
          icon={<HiOutlineDocumentText />}
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
        >
          <option value="">Select resume</option>
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
          <option value="">Select template</option>
          {templates.map((t) => (
            <option key={t._id} value={t._id}>
              {t.subject}
            </option>
          ))}
        </SelectField>

        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 flex items-center gap-2">
            <HiOutlineUsers />
            Select recruiters
          </label>

          <div
            className="
              border border-[#23283A]
              rounded-xl
              p-3
              max-h-64
              overflow-y-auto
              space-y-1
              bg-[#0F1117]
            "
          >
            {recruiters.map((r) => (
              <label
                key={r._id}
                className="
                  flex items-center gap-3
                  px-3 py-2
                  rounded-lg
                  text-sm text-gray-200
                  cursor-pointer
                  hover:bg-[#1C2030]
                  transition
                "
              >
                <input
                  type="checkbox"
                  checked={recruiterIds.includes(r._id)}
                  onChange={() => toggleRecruiter(r._id)}
                  className="h-4 w-4 accent-indigo-500"
                />
                <span>
                  {r.name} <span className="text-gray-400">({r.company})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="
            inline-flex items-center gap-2
            rounded-xl
            bg-linear-to-r from-indigo-500 to-violet-500
            px-6 py-3
            text-sm font-medium
            text-white
            hover:opacity-90
            transition
            disabled:opacity-60
          "
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

      {error && <p className="text-sm text-red-400">{error}</p>}

      {results.length > 0 && (
        <div
          className="
            bg-[#161A22]
            border border-[#23283A]
            rounded-xl
            p-5
            space-y-3
          "
        >
          <h3 className="text-sm font-medium text-gray-300">
            Batch send results
          </h3>

          <ul className="text-sm text-gray-200 space-y-1">
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
      <label className="text-xs font-medium text-gray-400 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <select
        {...props}
        required
        className="
          w-full
          px-4 py-2.5
          rounded-xl
          bg-[#0F1117]
          border border-[#23283A]
          text-gray-200
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500
          transition
        "
      >
        {children}
      </select>
    </div>
  );
};

export default BatchSend;
