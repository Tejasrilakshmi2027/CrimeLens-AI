import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (

        <div className="flex h-screen bg-slate-100">

            <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

            <div className="flex-1 flex flex-col">

                <Navbar />

                <main className="flex-1 overflow-auto p-6">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}