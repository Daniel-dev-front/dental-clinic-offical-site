import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import scss from "./WeStore.module.scss";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/MainContext";

const WeStore = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { product, readProduct } = useProduct();
  const handleNavigate = () => {
    navigate("/store");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    readProduct();
  }, []);

  const productsToShow = product.slice(1, 4);

  return (
    <section className="container">
      <div className={scss.content}>
        <div className={scss.header}>
          <h2 className={scss.title}>
            {t("home.store.title")}
            <span className={scss.highlight}> {t("home.store.highlight")}</span>
          </h2>
          <p className={scss.subtitle}>{t("home.store.subtitle")}</p>
        </div>

        <div className={scss.store}>
          {productsToShow.map((item, idx) => (
            <div
              key={idx}
              className={scss.product}
              onClick={() => navigate("/store")}
            >
              <div className={scss.imageWrapper}>
                <img src={item.img} alt={item.name} />
                <div className={scss.overlay}>
                  <span>{t("common.view")}</span>
                </div>
              </div>
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>

        <div className={scss.action}>
          <button className={scss.storeBtn} onClick={handleNavigate}>
            {t("home.store.button")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WeStore;
