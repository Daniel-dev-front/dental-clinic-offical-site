import React from "react";
import { useTranslation } from "react-i18next";
import scss from "./NavServices.module.scss";
import { useNavigate } from "react-router-dom";

const NavServices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/services");
    window.scrollTo(0, 0);
  };

  return (
    <div className="container">
      <div className={scss.content_nav}>
        <div className={scss.nav_text}>
          <h2>{t("home.services.title")}</h2>
        </div>
        <div className={scss.content}>
          <div className={scss.first}>
            <div className={scss.cont}>
              <h3>{t("home.navService.card1.title")}</h3>
              <p>{t("home.navService.card1.text")}</p>
            </div>
          </div>
          <div className={scss.second}>
            <div className={scss.cont}>
              <h3>{t("home.navService.card2.title")}</h3>
              <p>{t("home.navService.card2.text")}</p>
            </div>
          </div>
          <div className={scss.three}>
            <div className={scss.cont}>
              <h3>{t("home.navService.card3.title")}</h3>
              <p>{t("home.navService.card3.text")}</p>
            </div>
          </div>
          <div className={scss.four}>
            <div className={scss.cont}>
              <h3>{t("home.navService.card4.title")}</h3>
              <p>{t("home.navService.card4.text")}</p>
            </div>
          </div>
          <div className={scss.five}>
            <div className={scss.cont}>
              <h3>{t("home.navService.card5.title")}</h3>
              <p>{t("home.navService.card5.text")}</p>
            </div>
          </div>
          <div className={scss.six}>
            <div className={scss.cont}>
              <h3>{t("home.navService.card6.title")}</h3>
              <p>{t("home.navService.card6.text")}</p>
            </div>
          </div>
        </div>
        <div className={scss.btn_nav}>
          <button onClick={handleNavigate}>
            {t("home.services.moreButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavServices;
