import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>HireFlow Dashboard</h1>

      <ul>

        <li>
          <Link to="/resumes">Manage Resumes</Link>
        </li>

        <li>
          <Link to="/recruiters">Manage Recruiters</Link>
        </li>

        <li>
          <Link to="/templates">Manage Templates</Link>
        </li>

        <li>
          <Link to="/send/single">Send Resume (Single)</Link>
        </li>

        <li>
          <Link to="/send/batch">Send Resume (Batch)</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Dashboard;
