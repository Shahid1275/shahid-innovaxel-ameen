import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UrlDashboard from "./pages/UrlDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UrlDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
