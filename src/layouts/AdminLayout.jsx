import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";



const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 font-display antialiased overflow-hidden">
    <div className="flex h-screen w-full">
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      <div className="flex-1 flex flex-col">
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-background-light dark:bg-background-dark">
          <Outlet />
          <footer className="mt-8 text-center text-slate-400 text-xs py-4">
              © 2023 EduMaster School Management System. All rights reserved.
            </footer>
        </main>
      </div>
    </div>
    </div>
  );
};

export default AdminLayout;
