import React from "react";
import FilterOptions from "./components/FilterPart";
import LogTable from "./components/LogTable";
import { Provider } from "react-redux";
import { store } from "./Store";

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <h1 className="text-center text-6xl font-extrabold text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] tracking-widest py-6">
          LOG VAULT
        </h1>

        <FilterOptions />
        <LogTable />
      </Provider>
    </div>
  );
}
