import React from "react";
import "./App.css";
import CurrentDateTime from "./components/CurrentDateTime";
import DnD from "./projects/dnd/DnD";
import { useDispatch, useSelector } from "react-redux";
import { handleSample } from "./redux/global/global-slice";
import { RootState } from "./redux/store";

function App() {
  const dispatch = useDispatch();
  const showSampleData = useSelector((state: RootState) => state.dnd.toDoLists);

  return (
    <div className="position-relative app-container">
      <div
        className="btn-group btn-group-toggle px-4 py-4 d-flex justify-content-end"
        data-toggle="buttons"
      >
        <button
          className={`btn btn-${showSampleData ? "primary" : "secondary"} `}
          onClick={() => dispatch(handleSample())}
        >
          Sample Data
        </button>
      </div>
      <CurrentDateTime />
      <DnD />
    </div>
  );
}

export default App;
