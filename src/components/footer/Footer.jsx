import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
import scss from "./Footer.module.scss";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={scss.footer}>
      <div className="container">
        <div className={scss.footerContent}>
          {/* Колонка 1: Лого и описание */}
          <div className={scss.column}>
            <div className={scss.logo}>
              <span>D</span>
              <h3>Dental Clinic</h3>
            </div>
            <p className={scss.description}>{t("footer.aboutUs")}</p>
            <div className={scss.socialLinks}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Колонка 2: Навигация */}
          <div className={scss.column}>
            <h4>{t("footer.navigation")}</h4>
            <ul className={scss.links}>
              <li>
                <Link to="/">{t("header.home")}</Link>
              </li>
              <li>
                <Link to="/about">{t("header.about")}</Link>
              </li>
              <li>
                <Link to="/services">{t("header.services")}</Link>
              </li>
              <li>
                <Link to="/store">{t("header.store")}</Link>
              </li>
            </ul>
          </div>

          <div className={scss.column}>
            <h4>{t("footer.services")}</h4>
            <ul className={scss.links}>
              <li>
                <Link to="/services#therapy">{t("services.list.therapy")}</Link>
              </li>
              <li>
                <Link to="/services#implantation">
                  {t("services.list.implantation")}
                </Link>
              </li>
              <li>
                <Link to="/services#orthodontics">
                  {t("services.list.orthodontics")}
                </Link>
              </li>
              <li>
                <Link to="/services#surgery">{t("services.list.surgery")}</Link>
              </li>
              <li>
                <Link to="/services#hygiene">{t("services.list.hygiene")}</Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Контакты */}
          <div className={scss.column}>
            <h4>{t("footer.contacts")}</h4>
            <ul className={scss.contactInfo}>
              <li>
                <FaMapMarkerAlt />
                <span>{t("footer.address")}</span>
              </li>
              <li>
                <FaPhone />
                <a href="tel:+996502078338">+996 502 078 338</a>
              </li>
              <li>
                <FaEnvelope />
                <a href="mailto:info@dentalclinic.kg">info@dentalclinic.kg</a>
              </li>
              <li>
                <FaClock />
                <span>{t("footer.workHours")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть с копирайтом */}
        <div className={scss.bottom}>
          <p>
            &copy; {currentYear} Dental Clinic. {t("footer.allRightsReserved")}
          </p>
          <p>
            <Link to="/privacy">{t("footer.privacy")}</Link>
            {" | "}
            <Link to="/terms">{t("footer.terms")}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
