import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FaHeart,
  FaShoppingCart,
  FaCalendarAlt,
  FaUserCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FiLogOut, FiHome } from "react-icons/fi";
import scss from "./ClientLayout.module.scss";
import { useAuth } from "../../../context/AuthProvider";

const ClientLayout = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="container">
      <div className={scss.clientPanel}>
        <div className={scss.content}>
          <div className={scss.desktopSidebar}>
            <ul>
              <NavLink
                to="/profile"
                end
                className={({ isActive }) => (isActive ? scss.active : "")}
              >
                <FiHome /> {t("client.dashboard.wishlist")}
              </NavLink>
              <NavLink
                to="/profile/wishlist"
                className={({ isActive }) => (isActive ? scss.active : "")}
              >
                <FaHeart /> {t("client.dashboard.wishlist")}
              </NavLink>
              <NavLink
                to="/profile/cart"
                className={({ isActive }) => (isActive ? scss.active : "")}
              >
                <FaShoppingCart /> {t("client.dashboard.cart")}
              </NavLink>
              <NavLink
                to="/profile/appointments"
                className={({ isActive }) => (isActive ? scss.active : "")}
              >
                <FaCalendarAlt /> {t("client.dashboard.myAppointments")}
              </NavLink>
              <NavLink
                to="/profile/settings"
                className={({ isActive }) => (isActive ? scss.active : "")}
              >
                <FaUserCog /> {t("client.dashboard.settings")}
              </NavLink>
              <button onClick={handleLogout} className={scss.logoutBtn}>
                <FiLogOut /> {t("header.logout")}
              </button>
            </ul>
          </div>

          <div className={`${scss.mobileSidebar} ${menuOpen ? scss.open : ""}`}>
            <div className={scss.mobileHeader}>
              <h3>{t("client.dashboard.title")}</h3>
              <button className={scss.closeBtn} onClick={handleNavClick}>
                <FaTimes />
              </button>
            </div>
            <ul>
              <NavLink
                to="/profile"
                end
                className={({ isActive }) => (isActive ? scss.active : "")}
                onClick={handleNavClick}
              >
                <FiHome /> {t("client.dashboard.wishlist")}
              </NavLink>
              <NavLink
                to="/profile/wishlist"
                className={({ isActive }) => (isActive ? scss.active : "")}
                onClick={handleNavClick}
              >
                <FaHeart /> {t("client.dashboard.wishlist")}
              </NavLink>
              <NavLink
                to="/profile/cart"
                className={({ isActive }) => (isActive ? scss.active : "")}
                onClick={handleNavClick}
              >
                <FaShoppingCart /> {t("client.dashboard.cart")}
              </NavLink>
              <NavLink
                to="/profile/appointments"
                className={({ isActive }) => (isActive ? scss.active : "")}
                onClick={handleNavClick}
              >
                <FaCalendarAlt /> {t("client.dashboard.myAppointments")}
              </NavLink>
              <NavLink
                to="/profile/settings"
                className={({ isActive }) => (isActive ? scss.active : "")}
                onClick={handleNavClick}
              >
                <FaUserCog /> {t("client.dashboard.settings")}
              </NavLink>
              <button onClick={handleLogout} className={scss.logoutBtn}>
                <FiLogOut /> {t("header.logout")}
              </button>
            </ul>
          </div>

          {menuOpen && (
            <div className={scss.overlay} onClick={() => setMenuOpen(false)} />
          )}

          <main className={scss.main}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
