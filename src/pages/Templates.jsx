import { useEffect, useState } from "react";
import { useTemplateStore } from "../stores/template.store";
import {
  HiOutlineBriefcase,
  HiOutlineMail,
  HiOutlineDocumentText,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";
import { FiLoader } from "react-icons/fi";

const Templates = () => {
  const {
    templates,
    loading,
    error,
    fetchTemplates,
    createTemplate,
    deleteTemplate,
  } = useTemplateStore();

  const [role, setRole] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTemplate({
      role,
      subject,
      body,
    });

    setRole("");
    setSubject("");
    setBody("");
  };

  return (
    <div className="space-y-10 animate-fade-up">
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl text-gray-100">
          Templates
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-2xl">
          Create and reuse carefully crafted outreach messages for different
          roles.
        </p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FiLoader className="animate-spin" />
          Loading templates…
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="
          bg-[#161A22]
          border border-[#23283A]
          rounded-2xl
          p-6
          space-y-5
          shadow-[0_20px_40px_rgba(0,0,0,0.45)]
        "
      >
        <h2 className="text-sm font-medium text-gray-400">Create template</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Role"
            icon={<HiOutlineBriefcase />}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Frontend Engineer"
            required
          />

          <Input
            label="Subject"
            icon={<HiOutlineMail />}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-400">
            Email body
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500">
              <HiOutlineDocumentText />
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={6}
              placeholder="Write your outreach message here…"
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
                resize-none
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
              Creating…
            </>
          ) : (
            <>
              <HiOutlinePlus />
              Create Template
            </>
          )}
        </button>
      </form>

      {templates.length > 0 && (
        <ul className="space-y-3">
          {templates.map((template) => (
            <li
              key={template._id}
              className="
                p-4
                rounded-xl
                bg-[#0F1117]
                border border-[#23283A]
                hover:border-indigo-500/40
                transition
              "
            >
              <div className="space-y-1">
                <p className="text-sm text-gray-300">
                  <span className="text-gray-500">Role:</span> {template.role}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="text-gray-500">Subject:</span>{" "}
                  {template.subject}
                </p>
              </div>

              <button
                onClick={() => deleteTemplate(template._id)}
                className="
                  mt-3
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

      {templates.length === 0 && !loading && (
        <p className="text-sm text-gray-500">No templates created yet.</p>
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

export default Templates;
