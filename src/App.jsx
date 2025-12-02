import React from "react";
import FilterOptions from "./components/FilterPart";
import LogTable from "./components/LogTable";
import { Provider } from "react-redux";
import { store } from "./Store";

export default function App() {
  return (
    <Provider store={store}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <h1 className="
          text-center 
          text-4xl md:text-6xl 
          font-extrabold 
          text-cyan-400 
          drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]
          tracking-widest 
          py-4
        ">
          LOG VAULT
        </h1>

        <div className="mt-4">
          <FilterOptions />
        </div>

        <div className="mt-6">
          <LogTable />
        </div>
      </div>
    </Provider>
  );
}
