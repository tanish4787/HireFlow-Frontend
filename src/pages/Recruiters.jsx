import { useEffect, useState } from "react";
import { useRecruiterStore } from "../stores/recruiter.store";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
  HiOutlinePlus,
} from "react-icons/hi";
import { FiLoader } from "react-icons/fi";

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
    <div className="space-y-10 animate-fade-up">
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl text-gray-100">
          Recruiters
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-2xl">
          Keep track of the people you personally reach out to — intentionally,
          not at scale.
        </p>
      </div>

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
        <h2 className="text-sm font-medium text-gray-400">Add recruiter</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            icon={<HiOutlineUser />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email"
            type="email"
            icon={<HiOutlineMail />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Company"
            icon={<HiOutlineOfficeBuilding />}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <Input
            label="Role"
            icon={<HiOutlineBriefcase />}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
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
              Adding…
            </>
          ) : (
            <>
              <HiOutlinePlus />
              Add Recruiter
            </>
          )}
        </button>
      </form>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FiLoader className="animate-spin" />
          Loading recruiters…
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      {recruiters.length === 0 && !loading && (
        <p className="text-sm text-gray-500">
          No recruiters yet. Add your first contact above.
        </p>
      )}

      {recruiters.length > 0 && (
        <ul className="space-y-3">
          {recruiters.map((recruiter) => (
            <li
              key={recruiter.email}
              className="
                flex flex-col md:flex-row md:items-center md:justify-between
                gap-3
                p-4
                rounded-xl
                bg-[#0F1117]
                border border-[#23283A]
                hover:border-indigo-500/40
                transition
              "
            >
              <div>
                <p className="font-medium text-gray-100">{recruiter.name}</p>
                <p className="text-sm text-gray-400">{recruiter.email}</p>
              </div>

              <div className="text-sm text-gray-400">
                <span className="mr-4">{recruiter.company}</span>
                <span className="text-gray-500">{recruiter.role}</span>
              </div>
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

export default Recruiters;
