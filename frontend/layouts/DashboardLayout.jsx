//import { Outlet } from "react-router-dom";
import MiniSideBar from "../src/components/MiniSideBar";
import Header from "../src/components/Header";
import MainContentLayout from "./MainContentLayout";
import Sidebar from "./AnalyticsBar";
import MainLayout from "./MainLayout";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-full flex ">
      <MiniSideBar />
      <div className="flex-1 flex flex-col w-screen ">
        <Header />
        <div className="h-screen w-full flex flex-col">
          <MainContentLayout>
            <MainLayout>{children}</MainLayout>
            <Sidebar />
          </MainContentLayout>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
