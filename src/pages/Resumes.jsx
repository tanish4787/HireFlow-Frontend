import { useEffect, useState } from "react";
import { useResumeStore } from "../stores/resume.store";
import {
  HiOutlineDocumentText,
  HiOutlineUpload,
  HiOutlineTrash,
} from "react-icons/hi";
import { FiLoader } from "react-icons/fi";

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
    <div className="space-y-10 animate-fade-up">
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl text-gray-100">
          Resumes
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-2xl">
          Upload and manage the resumes you deliberately send to recruiters.
        </p>
      </div>

      <form
        onSubmit={handleUpload}
        className="
          bg-[#161A22]
          border border-[#23283A]
          rounded-2xl
          p-6
          space-y-5
          shadow-[0_20px_40px_rgba(0,0,0,0.45)]
        "
      >
        <h2 className="text-sm font-medium text-gray-400">Upload resume</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Resume label"
            icon={<HiOutlineDocumentText />}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Frontend Engineer Resume"
            required
          />

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">
              PDF file
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="
                w-full text-sm
                file:mr-4
                file:rounded-lg
                file:border
                file:bg-[#0F1117]
                file:px-4
                file:py-2
                file:text-sm
                file:font-medium
                file:text-gray-300
                file:border
                file:border-[#23283A]
                hover:file:border-indigo-500/40
                transition
              "
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex items-center gap-2
            rounded-xl
            bg-linear-to-r from-indigo-500 to-violet-500
            hover:from-indigo-600 hover:to-violet-600
            px-4 py-2.5
            text-sm font-medium text-white
            transition
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <HiOutlineUpload />
              Upload Resume
            </>
          )}
        </button>
      </form>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FiLoader className="animate-spin" />
          Loading resumes…
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      {resumes.length === 0 && !loading && (
        <p className="text-sm text-gray-500">No resumes uploaded yet.</p>
      )}

      {resumes.length > 0 && (
        <ul className="space-y-3">
          {resumes.map((resume) => (
            <li
              key={resume._id}
              className="
                flex items-center justify-between
                gap-4
                p-4
                rounded-xl
                bg-[#0F1117]
                border border-[#23283A]
                hover:border-indigo-500/40
                transition
              "
            >
              <div className="flex items-center gap-3">
                <HiOutlineDocumentText className="text-indigo-400 text-xl" />
                <span className="font-medium text-gray-100">
                  {resume.label}
                </span>
              </div>

              <button
                onClick={() => deleteResume(resume._id)}
                className="
                  inline-flex items-center gap-1
                  text-sm text-red-400
                  hover:text-red-300
                  transition
                "
              >
                <HiOutlineTrash />
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Input = ({ label, icon, ...props }) => {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-400">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </span>
        <input
          {...props}
          className="
            w-full
            pl-11 pr-4 py-2.5
            bg-[#0F1117]
            border border-[#23283A]
            rounded-xl
            text-gray-200
            placeholder-gray-500
            focus:outline-none
            focus:ring-2 focus:ring-indigo-500/50
            transition
          "
        />
      </div>
    </div>
  );
};

export default Resumes;
