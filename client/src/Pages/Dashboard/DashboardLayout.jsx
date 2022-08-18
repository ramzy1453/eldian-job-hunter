import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../Assets/Wrappers/SharedLayout";
import Navbar from "../../Components/Navbar";
import { SidebarDesktop, SidebarPhone } from "../../Components/Sidebar";

const DashboardLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SidebarDesktop />
        <SidebarPhone />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default DashboardLayout;
