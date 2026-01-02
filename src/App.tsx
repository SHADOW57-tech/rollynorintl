import "./App.css";

import { Routes, Route } from "react-router-dom";
import RouteTransition from "./components/RouteTransition";
import Home from "./page/Home";
import FloatButton from "./components/FloatButton";
import ReachUs from "./page/ReachUs";

// import other pages...

const App: React.FC = () => {
  return (
    <>
      <RouteTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reach-us" element={<ReachUs />} />
        </Routes>
      </RouteTransition>
      <FloatButton />
    </>
  );
};

export default App;
