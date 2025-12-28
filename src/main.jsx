import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../src/app/App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2000,
        style: {
          background: "#161A22",
          color: "#E5E7EB",
          border: "1px solid #23283A",
        },
      }}
    />
  </BrowserRouter>
);
