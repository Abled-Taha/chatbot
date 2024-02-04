import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./public";

export default function MainRoute() {
  return (
    <Router>
      <Routes>
        {PublicRoutes?.map((item, index) => (
          <Route key={index} path={item.path} element={<item.component />} />
        ))}
      </Routes>
    </Router>
  );
}
