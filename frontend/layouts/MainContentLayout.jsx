import React from "react";
import { useAuthStore } from "../src/store/authStore.js";

function MainContentLayout({ children }) {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id; // safe access

  console.log(userId);

  return (
    <main className={`pb-[1.5rem] flex h-full ${userId ? "pr-[20rem]" : ""} `}>
      {children}
    </main>
  );
}

export default MainContentLayout;
