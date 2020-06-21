import React from "react";
import { GWTListView } from "./GWT/GWTListView";
import './App.css';

// Fetch Gwt document from backend service. For now this is hardcoded.
// import { ActivationGwtDocument } from "./GWT/ActivationGwtDocument";
import { CameraGwt } from "./GWT/CameraGwt";

export default function App() {
  return (
    <div className="App">
      <GWTListView gwtDocument={CameraGwt} />
    </div>
  );
}