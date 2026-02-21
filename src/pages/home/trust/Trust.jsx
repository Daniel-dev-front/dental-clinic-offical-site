import React from "react";
import { useTranslation } from "react-i18next";
import scss from "./Trust.module.scss";
import { useNavigate } from "react-router-dom";

const Trust = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/about");
    window.scrollTo(0, 0);
  };

  return (
    <div className="container">
      <div className={scss.trust_we}>
        <div className={scss.left}>
          <h2>{t("home.trust.title")}</h2>
          <h4>{t("home.trust.description")}</h4>
          <div className={scss.btn}>
            <button onClick={handleNavigate}>{t("home.trust.button")}</button>
          </div>
        </div>
        <img
          src="https://static.tildacdn.com/tild3032-6633-4366-a532-643335356139/6fgnff.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Trust;
