import { Outlet } from "react-router-dom";
import MiniSideBar from "../src/components/MiniSideBar";
import Header from "../src/components/Header";
import MainContentLayout from "./MainContentLayout";
import Sidebar from "./AnalyticsBar";
import MainLayout from "./MainLayout";

const DashboardLayout = () => {
  return (
    <div className="h-full overflow-hidden flex ">
      <MiniSideBar />
      <div className="flex-1 flex flex-col w-screen ">
        <Header />
        <div className="h-screen w-full flex flex-col">
          <MainContentLayout>
            <MainLayout>
              <Outlet />
              <Sidebar />
            </MainLayout>
          </MainContentLayout>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
