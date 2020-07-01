import React from "react";
import { ListView } from "./components/ListView";
import './App.css';

// Fetch Gwt document from backend service. For now this is hardcoded.
// import { ActivationGwtDocument } from "./utils/ActivationGwtDocument";
import { CameraGwt } from "./utils/CameraGwt";
// import { ReturnGwt } from './utils/ReturnGwt';
// import { SkypeBusinessSetup } from './utils/SkypeBusinessSetup';

export default function App() {
  return (
    <div className="App">
      <ListView gwtDocument={CameraGwt} />
    </div>
  );
}