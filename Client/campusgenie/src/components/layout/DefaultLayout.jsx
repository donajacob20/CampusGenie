import React from "react";
import Header from "./header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer";

function DefaultLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const isDashboard = location.pathname === "/chat/dashboard";
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {isHomePage ? (
        <Header />
      ) : (
        <div
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
        >
          <Header />
        </div>
      )}
      <div style={{ paddingBottom: isHomePage ? 0 : "60px" }}>
        <Outlet />
      </div>
      {isHomePage || isDashboard ? (
        <Footer />
      ) : (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default DefaultLayout;
