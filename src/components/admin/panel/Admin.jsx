import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import scss from "./Admin.module.scss";
import { useAuth } from "../../../context/AuthProvider";
import { useTheme } from "../../../context/ThemeContext";
import {
  FaMoon,
  FaSun,
  FaBox,
  FaPlus,
  FaClipboardList,
  FaUserMd,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";

const Admin = () => {
  // ✅ Все хуки в самом начале, в одном и том же порядке
  const { t } = useTranslation();
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ useEffect всегда после useState, не внутри условий
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isAdmin) return null;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="adminPanel">
      <div className={scss.content_main}>
        <div className={scss.header}>
          <h2>{t("admin.dashboard.title")}</h2>
          <div className={scss.headerActions}>
            <button
              className={scss.burgerBtn}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div className={scss.content}>
          {/* Десктопное меню */}
          <div className={scss.desktopSidebar}>
            <ul>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to=""
                end
              >
                <FiHome /> <h4>{t("admin.sidebar.home")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="addMaterial"
              >
                <FaPlus /> <h4>{t("admin.sidebar.addProduct")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="addServices"
              >
                <FaPlus /> <h4>{t("admin.sidebar.addService")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="allMaterials"
              >
                <FaBox /> <h4>{t("admin.sidebar.allProducts")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="allServices"
              >
                <FaClipboardList /> <h4>{t("admin.sidebar.allServices")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="appointments"
              >
                <FaClipboardList /> <h4>{t("admin.sidebar.appointments")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="doctors"
              >
                <FaUserMd /> <h4>{t("admin.sidebar.doctors")}</h4>
              </NavLink>

              <button className={scss.nav} onClick={handleLogout}>
                <FiLogOut /> <h4>{t("admin.sidebar.logout")}</h4>
              </button>
            </ul>
            <hr className={scss.divider} />
          </div>

          {/* Мобильное бургер-меню */}
          <div className={`${scss.mobileSidebar} ${menuOpen ? scss.open : ""}`}>
            <div className={scss.mobileHeader}>
              <h3>{t("admin.dashboard.title")}</h3>
              <button
                className={scss.closeBtn}
                onClick={() => setMenuOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <ul>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to=""
                end
                onClick={handleNavClick}
              >
                <FiHome /> <h4>{t("admin.sidebar.home")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="addMaterial"
                onClick={handleNavClick}
              >
                <FaPlus /> <h4>{t("admin.sidebar.addProduct")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="addServices"
                onClick={handleNavClick}
              >
                <FaPlus /> <h4>{t("admin.sidebar.addService")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="allMaterials"
                onClick={handleNavClick}
              >
                <FaBox /> <h4>{t("admin.sidebar.allProducts")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="allServices"
                onClick={handleNavClick}
              >
                <FaClipboardList /> <h4>{t("admin.sidebar.allServices")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="appointments"
                onClick={handleNavClick}
              >
                <FaClipboardList /> <h4>{t("admin.sidebar.appointments")}</h4>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? scss.active : scss.nav
                }
                to="doctors"
                onClick={handleNavClick}
              >
                <FaUserMd /> <h4>{t("admin.sidebar.doctors")}</h4>
              </NavLink>

              <button className={scss.nav} onClick={handleLogout}>
                <FiLogOut /> <h4>{t("admin.sidebar.logout")}</h4>
              </button>
            </ul>
          </div>

          {/* Затемнение фона */}
          {menuOpen && (
            <div className={scss.overlay} onClick={() => setMenuOpen(false)} />
          )}

          <main className={scss.right}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
