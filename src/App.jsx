// import React from "react";
// import StickyHeadTable from "./components/LogTable";

import FilterOptions from "./components/FilterPart";

export default function App() {
  return (
    <div className="app-root min-h-screen flex flex-col bg-gradient-to-b from-[#f5f7fb] to-white text-slate-900">

      {/* HEADER */}
      <header className="app-header h-20 shadow-md flex items-center bg-gradient-to-r from-cyan-600 to-sky-600">
        <div className="header-inner max-w-[1200px] w-full mx-auto px-4 flex items-center justify-between">
          
          <div className="brand flex items-center gap-3">
            <div className="logo-dot w-11 h-11 rounded-lg bg-white/40 shadow border border-white/20" />
            <h1 className="title text-3xl font-extrabold text-white">LogVault</h1>
          </div>

          <div className="header-sub flex items-center gap-3 text-white font-semibold">
            <div className="clock px-3 py-1 rounded-md bg-white/10 text-sm">
              {new Date().toLocaleTimeString()}
            </div>
            <div className="user-pill px-3 py-1 rounded-full bg-white/15 text-sm">Ayman</div>
          </div>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-area flex-1 overflow-auto py-6">
        <div className="container max-w-[1200px] mx-auto px-4">
          {/* <StickyHeadTable /> */}
          <FilterOptions/>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="app-footer py-3 border-t border-slate-200 text-slate-600">
        <div className="footer-inner max-w-[1200px] mx-auto px-4 flex justify-between">
          <span>© {new Date().getFullYear()} LogVault</span>
          <span>Made with React + MUI + Tailwind</span>
        </div>
      </footer>

    </div>
  );
}
