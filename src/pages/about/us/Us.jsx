import React, { useEffect } from "react";
import styles from "./Us.module.scss";
import { useProduct } from "../../../context/MainContext";
import { useTranslation } from "react-i18next";

const Us = () => {
  const { t } = useTranslation();
  const interiors = [
    {
      id: 1,
      title: "Светлая зона ожидания",
      description:
        "Мягкие диваны, свежая пресса, вода и кофе. Здесь приятно находиться.",
      image: "/images/interior-1.jpg",
    },
    {
      id: 2,
      title: "Современный кабинет",
      description:
        "Удобное кресло, стерильная обстановка, монитор, на котором виден ваш снимок.",
      image: "/images/interior-2.jpg",
    },
    {
      id: 3,
      title: "Ресепшн",
      description:
        "Администраторы всегда приветливы и помогут с любым вопросом.",
      image: "/images/interior-3.jpg",
    },
    {
      id: 4,
      title: "Операционная",
      description: "Идеальный порядок и новейшее оборудование для имплантации.",
      image: "/images/interior-4.jpg",
    },
  ];

  return (
    <div id="about-bg">
      <div className="container">
        <section className={styles.hero}>
          <div className={styles.container}>
            <span className={styles.badge}>{t("about.badge")}</span>
            <h1 className={styles.title}>{t("about.title")}</h1>
            <p className={styles.subtitle}>
              {t("about.description", { years: 12 })}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Us;
