import React from "react";
import Header from "./header/Header";
import MainRoutes from "../routes/MainRoutes";
import Footer from "./footer/Footer";
const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <MainRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
