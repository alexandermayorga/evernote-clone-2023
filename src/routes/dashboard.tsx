import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

export default function Dashboard() {
  const pageTitle = `Dashboard | Mammoth Notes`;
  useEffect(() => {
    document.title = pageTitle;
  }, []);

  return (
    <>
      <div className="main d-flex">
        <div
          id="sidebar"
          className="scrollarea border-end border-3 flex-shrink-0"
        >
          <Sidebar />
        </div>
        <div id="page-content" className="flex-grow-1 p-4 scrollarea">
          <Outlet />
        </div>
      </div>
    </>
  );
}
