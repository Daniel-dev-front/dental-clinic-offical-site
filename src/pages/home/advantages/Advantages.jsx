import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaTooth,
  FaUserMd,
  FaClock,
  FaShieldAlt,
  FaSmile,
  FaHeartbeat,
} from "react-icons/fa";
import scss from "./Advantages.module.scss";

const Advantages = () => {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: <FaUserMd />,
      title: t("home.advantages.items.experienced"),
      desc: "Более 10 лет практики у каждого специалиста",
      color: "#4299e1",
    },
    {
      icon: <FaTooth />,
      title: t("home.advantages.items.painless"),
      desc: "Современная анестезия и щадящие методики",
      color: "#48bb78",
    },
    {
      icon: <FaClock />,
      title: t("home.advantages.items.noQueue"),
      desc: "Точное время приёма, никакого ожидания",
      color: "#ed8936",
    },
    {
      icon: <FaShieldAlt />,
      title: t("home.advantages.items.warranty"),
      desc: "На все виды работ до 5 лет",
      color: "#9f7aea",
    },
    {
      icon: <FaSmile />,
      title: t("home.advantages.items.dreamSmile"),
      desc: "Индивидуальный подход к каждому пациенту",
      color: "#f687b3",
    },
    {
      icon: <FaHeartbeat />,
      title: t("home.advantages.items.modern"),
      desc: "Новейшее оборудование и материалы",
      color: "#4fd1c5",
    },
  ];

  return (
    <section id="advantages-bg">
      <div className="container">
        <div className={scss.advantages}>
          <div className={scss.header}>
            <h2 className={scss.title}>
              {t("home.advantages.title")}{" "}
              <span className={scss.highlight}>
                {t("home.advantages.highlight")}
              </span>
            </h2>
            <p className={scss.subtitle}>{t("home.advantages.subtitle")}</p>
          </div>

          <div className={scss.grid}>
            {advantages.map((item, index) => (
              <div key={index} className={scss.card}>
                <div
                  className={scss.iconWrapper}
                  style={{ background: `${item.color}20` }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
