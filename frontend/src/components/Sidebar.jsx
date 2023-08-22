import React from "react";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen p-3 bg-[#0d1117] shadow w-60 text-white">
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">Visualizer Dashboard</h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <a
                href="/"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <span>Home</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
