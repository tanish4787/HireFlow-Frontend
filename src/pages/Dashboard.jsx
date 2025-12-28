import { Link } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineTemplate,
  HiOutlinePaperAirplane,
  HiOutlineCollection,
} from "react-icons/hi";

const Dashboard = () => {
  return (
    <div className="space-y-10 animate-fade-up">
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl text-gray-100">
          Dashboard
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-2xl">
          Prepare your outreach setup and send resumes with intent — without
          accidental re-sending or noise.
        </p>
      </div>

      <div
        className="
          bg-[#161A22]
          border border-[#23283A]
          rounded-2xl
          p-6
          shadow-[0_20px_40px_rgba(0,0,0,0.45)]
        "
      >
        <h2 className="text-sm font-medium text-gray-400 mb-6">
          Quick actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard
            to="/resumes"
            icon={<HiOutlineDocumentText />}
            title="Resumes"
            desc="Upload and manage the resumes you send"
          />

          <ActionCard
            to="/recruiters"
            icon={<HiOutlineUserGroup />}
            title="Recruiters"
            desc="Track people you personally reach out to"
          />

          <ActionCard
            to="/templates"
            icon={<HiOutlineTemplate />}
            title="Templates"
            desc="Create role-specific outreach messages"
          />

          <ActionCard
            to="/send/single"
            icon={<HiOutlinePaperAirplane />}
            title="Send (Single)"
            desc="Send a resume deliberately to one recruiter"
          />

          <ActionCard
            to="/send/batch"
            icon={<HiOutlineCollection />}
            title="Send (Batch)"
            desc="Send one resume to multiple recruiters"
          />
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ to, icon, title, desc }) => {
  return (
    <Link
      to={to}
      className="
        group
        flex items-start gap-4
        p-4
        rounded-xl
        bg-[#0F1117]
        border border-[#23283A]
        hover:border-indigo-500/50
        transition
      "
    >
      <div
        className="
          text-indigo-400
          text-xl
          mt-1
          group-hover:scale-110
          transition
        "
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-100">{title}</p>
        <p className="text-xs text-gray-400 mt-1">{desc}</p>
      </div>
    </Link>
  );
};

export default Dashboard;
