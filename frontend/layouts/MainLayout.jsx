import React, { use } from "react";
import Modal from "../src/components/Modal";
import { useTaskStore } from "../src/store/taskStore";

function MainLayout({ children }) {
  const { isEditing } = useTaskStore();
  return (
    <div className="scrollbar-hidden h-[85vh] flex-1 bg-[#EDEDED] border-2 border-white rounded-2xl overflow-y-auto p-4">
      {isEditing && <Modal />}
      {children}
    </div>
  );
}

export default MainLayout;
