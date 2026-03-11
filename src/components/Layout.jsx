import React, { Suspense } from "react";
import Header from "./header/Header";
import MainRoutes from "../routes/MainRoutes";
import Footer from "./footer/Footer";
import "./Loader.css"

const Loader = () => (
  <div className="loader-container">
    <div className="spinner"></div>
    <p>Загрузка...</p>
  </div>
);

const Layout = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <main>
          <MainRoutes />
        </main>
        <Footer />
      </Suspense>
    </>
  );
};

export default Layout;
