import React from "react";

function MainLayout({ children }) {
  return (
    <div className="main-layout flex-1 bg-[#EDEDED] border-2 border-white rounded-2xl overflow-y-auto p-4">
      {children}
    </div>
  );
}

export default MainLayout;
