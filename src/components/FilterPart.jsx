import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { setFilter } from "../logSlice";

/**
 * FilterOptions
 * Props:
 *  - onSearch(filters) called when Search clicked or Enter pressed
 *  - initialFilters optional
 */
export default function FilterOptions({ onSearch = () => {}, initialFilters = {} }) {
  const [levels, setLevels] = useState(initialFilters.levels || []);
  const [components, setComponents] = useState(initialFilters.components || []);
  const [hosts, setHosts] = useState(initialFilters.hosts || []);
  const [requestId, setRequestId] = useState([]);
  const [timeStamp, setTimeStamp] = useState([]);


  const handleCheckbox = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // console.log("level: ", levels);


  
  
const dispatch=useDispatch()
const handleSubmit = (e) => {
  e.preventDefault();

  const filter = {
    level:levels,
    component: components,
    host:hosts,
    requestId: requestId,
    timeStamp: timeStamp,
  };

  // console.log("filters: ", filter);
  

  dispatch(setFilter(filter));
};


  const LEVELS = ["INFO", "ERROR", "DEBUG", "WARN"];
  const COMPONENTS = ["api-server", "auth", "cache", "database", "worker"];
  const HOSTS = ["cache01", "db01", "web01", "web02", "worker01"];

  return (
    <form onSubmit={handleSubmit} className="w-full p-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-4">
        <input
          name="timestamp"
          type="text"
          placeholder="enter the DateTime (e.g. 2025-11-17 16:53:00)"
          value={timeStamp}
          onChange={(e) => setTimeStamp(e.target.value)}
          className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          name="request_id"
          type="text"
          placeholder="enter the RequestId"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
          className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          type="submit"
          className="w-28 shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded px-3 py-2 text-sm font-medium shadow"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <fieldset className="p-3 rounded border border-gray-100 bg-indigo-50">
          <legend className="text-sm font-semibold text-indigo-700 mb-2">Levels</legend>
          <div className="flex flex-wrap gap-3 text-sm">
            {LEVELS.map((lvl) => (
              <label key={lvl} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={levels.includes(lvl)}
                  onChange={() => handleCheckbox(lvl, levels, setLevels)}
                />
                <span>{lvl}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="p-3 rounded border border-gray-100 bg-amber-50">
          <legend className="text-sm font-semibold text-amber-800 mb-2">Components</legend>
          <div className="flex flex-wrap gap-3 text-sm">
            {COMPONENTS.map((cmp) => (
              <label key={cmp} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={components.includes(cmp)}
                  onChange={() => handleCheckbox(cmp, components, setComponents)}
                />
                <span>{cmp}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="p-3 rounded border border-gray-100 bg-emerald-50">
          <legend className="text-sm font-semibold text-emerald-800 mb-2">Hosts</legend>
          <div className="flex flex-wrap gap-3 text-sm">
            {HOSTS.map((hst) => (
              <label key={hst} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={hosts.includes(hst)}
                  onChange={() => handleCheckbox(hst, hosts, setHosts)}
                />
                <span>{hst}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </form>
  );
}
