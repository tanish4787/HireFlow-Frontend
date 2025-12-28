import { useEffect, useState } from "react";
import { useResumeStore } from "../stores/resume.store";
import { useRecruiterStore } from "../stores/recruiter.store";
import { useTemplateStore } from "../stores/template.store";
import { useSendStore } from "../stores/send.store";

import {
  HiOutlineDocumentText,
  HiOutlineUser,
  HiOutlineTemplate,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

const SingleSend = () => {
  const { resumes, fetchResumes } = useResumeStore();
  const { recruiters, fetchAllRecruiters } = useRecruiterStore();
  const { templates, fetchTemplates } = useTemplateStore();

  const { sendSingle, sending, results, error, clearResults } = useSendStore();

  const [resumeId, setResumeId] = useState("");
  const [recruiterId, setRecruiterId] = useState("");
  const [templateId, setTemplateId] = useState("");

  useEffect(() => {
    fetchResumes();
    fetchAllRecruiters();
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

    if (results?.reason === "DUPLICATE") {
      toast.error("You’ve already sent this resume to this recruiter.");
      return;
    }

    if (results?.reason === "FAILED") {
      toast.error("Failed to send resume. Try again.");
    }

    if (results?.ok) {
      toast.success("Resume sent successfully!");
    }
  };

  return (
    <div className="space-y-10 animate-fade-up">
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl text-gray-100">
          Send Resume
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-2xl">
          This action sends a resume to one recruiter. HireFlow prevents
          accidental duplicates.
        </p>
      </div>

      <form
        onSubmit={handleSend}
        className="
          bg-[#161A22]
          border border-[#23283A]
          rounded-2xl
          p-6
          space-y-6
          shadow-[0_30px_60px_rgba(0,0,0,0.55)]
        "
      >
        <Step title="Choose resume" icon={<HiOutlineDocumentText />}>
          <SelectField
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
        </Step>

        <Step title="Choose recruiter" icon={<HiOutlineUser />}>
          <SelectField
            value={recruiterId}
            onChange={(e) => setRecruiterId(e.target.value)}
          >
            <option value="">Select recruiter</option>
            {recruiters.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name} ({r.company})
              </option>
            ))}
          </SelectField>
        </Step>

        <Step title="Choose template" icon={<HiOutlineTemplate />}>
          <SelectField
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
        </Step>

        <div className="h-px bg-[#23283A]" />

        <button
          type="submit"
          disabled={sending}
          className="
            inline-flex items-center gap-2
            rounded-xl
            bg-linear-to-r from-indigo-500 to-violet-500
            hover:from-indigo-600 hover:to-violet-600
            px-5 py-3
            text-sm font-medium text-white
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
              Send deliberately
            </>
          )}
        </button>
      </form>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {results.length > 0 && (
        <div
          className="
            bg-[#0F1117]
            border border-[#23283A]
            rounded-xl
            p-4
          "
        >
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Send result
          </h3>

          <ul className="text-sm text-gray-300 space-y-1">
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

const Step = ({ title, icon, children }) => {
  return (
    <div className="space-y-2">
      <p className="flex items-center gap-2 text-xs font-medium text-gray-400">
        <span className="text-indigo-400">{icon}</span>
        {title}
      </p>
      {children}
    </div>
  );
};

const SelectField = ({ children, ...props }) => {
  return (
    <select
      {...props}
      required
      className="
        w-full
        pl-4 pr-4 py-2.5
        bg-[#0F1117]
        border border-[#23283A]
        rounded-xl
        text-gray-200
        focus:outline-none
        focus:ring-2 focus:ring-indigo-500/50
        transition
      "
    >
      {children}
    </select>
  );
};

export default SingleSend;
