import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Verify from "../pages/Verify";
import Dashboard from "../pages/Dashboard";
import Resumes from "../pages/Resumes";
import Recruiters from "../pages/Recruiters";
import Templates from "../pages/Templates";
import SingleSend from "../pages/SingleSend";
import BatchSend from "../pages/BatchSend";

import ProtectedRoute from "../pages/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/verify" element={<Verify />} />

      <Route element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="resumes" element={<Resumes />} />
        <Route path="recruiters" element={<Recruiters />} />
        <Route path="templates" element={<Templates />} />
        <Route path="send/single" element={<SingleSend />} />
        <Route path="send/batch" element={<BatchSend />} />
      </Route>
    </Routes>
  );
}
