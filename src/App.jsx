import React from "react";
import FilterOptions from "./components/FilterPart";
import LogTable from "./components/LogTable";
import { Provider } from "react-redux";
import { store } from "./Store";

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <h1 className="text-center text-6xl font-Orbitron">LOG VAULT</h1>
        <FilterOptions />
        <LogTable />
      </Provider>
    </div>
  );
}
