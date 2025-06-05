import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { SoundProvider } from "./context/soundContext";
import Loader from "./components/Loader";
import "./index.css";

const App = React.lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <SoundProvider>
      <Suspense fallback={<Loader />}>
        <Router>
          <App />
        </Router>
      </Suspense>
    </SoundProvider>
  // </React.StrictMode>
);
