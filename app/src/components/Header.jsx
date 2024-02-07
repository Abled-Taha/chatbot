// Header.jsx
import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="header-section">
      <div className="flex items-center justify-between p-4">
        <p className="text-3xl text-slate-200 font-semibold grow">
          PMBOK
        </p>
        <button id="sidebar-toggle" onClick={toggleSidebar}>Toggle sidebar</button>
      </div>
    </div>
  );
}

export default Header;
