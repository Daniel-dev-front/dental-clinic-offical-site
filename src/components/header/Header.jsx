import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import scss from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import { PiUserListFill } from "react-icons/pi";
import { TbUserSquareRounded } from "react-icons/tb";
import { FiLogIn } from "react-icons/fi"; // <-- импортируем иконку входа
import SignUp from "../../pages/auth/signUp/SignUp";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";

const Header = () => {
  const { t } = useTranslation();
  const { user, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => setIsOpen(!isOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="header" className={scrolled ? scss.scrolled : ""}>
      <div className="container">
        <div className={scss.header}>
          <div className={scss.logo}>
            <span>D</span>
            <h2>Dental Clinic</h2>
          </div>

          <div className={`${scss.navi} ${scss.desktopNav}`}>
            <NavLink
              className={({ isActive }) =>
                isActive ? scss.activeNav : scss.nav
              }
              to="/"
            >
              <h4>{t("header.home")}</h4>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? scss.activeNav : scss.nav
              }
              to="/about"
            >
              <h4>{t("header.about")}</h4>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? scss.activeNav : scss.nav
              }
              to="/services"
            >
              <h4>{t("header.services")}</h4>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? scss.activeNav : scss.nav
              }
              to="/store"
            >
              <h4>{t("header.store")}</h4>
            </NavLink>
          </div>

          <div className={scss.rightSection}>
            <LanguageSwitcher />
            <button onClick={toggleTheme} className={scss.themeToggle}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            <div className={scss.register}>
              {!user ? (
                <>
                  <h4
                    className={`${scss.nav} ${scss.desktopRegister}`}
                    onClick={toggleModal}
                  >
                    {t("header.register")}
                  </h4>
                  <FiLogIn
                    className={`${scss.mobileRegister} ${scss.nav}`}
                    onClick={toggleModal}
                    size={24}
                  />
                </>
              ) : (
                <div className={scss.userMenu}>
                  {isAdmin ? (
                    <Link className={scss.profileLink} to="/admin">
                      <span>
                        <TbUserSquareRounded color="white" size={28} />
                        <h4 className={scss.nav}>{t("header.admin")}</h4>
                      </span>
                    </Link>
                  ) : (
                    <Link className={scss.profileLink} to="/profile">
                      <span>
                        <FaUserCircle size={28} color="white" />
                        <h4 className={scss.nav}>{t("header.profile")}</h4>
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            <button className={scss.burgerBtn} onClick={toggleMenu}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {menuOpen && (
            <div className={scss.mobileNav}>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                <h4>{t("header.home")}</h4>
              </NavLink>
              <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                <h4>{t("header.about")}</h4>
              </NavLink>
              <NavLink to="/services" onClick={() => setMenuOpen(false)}>
                <h4>{t("header.services")}</h4>
              </NavLink>
              <NavLink to="/store" onClick={() => setMenuOpen(false)}>
                <h4>{t("header.store")}</h4>
              </NavLink>

              {!user && (
                <h4
                  className={scss.nav}
                  onClick={() => {
                    toggleModal();
                    setMenuOpen(false);
                  }}
                >
                  {t("header.register")}
                </h4>
              )}
            </div>
          )}
        </div>
      </div>

      {isOpen && <SignUp isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Header;
