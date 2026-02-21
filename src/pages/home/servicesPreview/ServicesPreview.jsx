import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaTooth, FaTeeth, FaArrowRight } from "react-icons/fa";
import { TbDental } from "react-icons/tb";
import scss from "./ServicesPreview.module.scss";

const ServicesPreview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/services");
    window.scrollTo(0, 0);
  };

  const services = [
    {
      icon: <FaTooth />,
      title: "Лечение зубов",
      desc: "Кариес, пульпит, периодонтит",
      price: "от 2000 сом",
    },
    {
      icon: <FaTeeth />,
      title: "Имплантация",
      desc: "Восстановление утраченных зубов",
      price: "от 15000 сом",
    },
    {
      icon: <TbDental />,
      title: "Протезирование",
      desc: "Коронки, мосты, съёмные протезы",
      price: "от 5500 сом",
    },
  ];

  return (
    <section id="services-bd">
      <div className="container">
        <div className={scss.services}>
          <div className={scss.header}>
            <h2 className={scss.title}>
              {t("about.principles.title")}{" "}
              <span className={scss.highlight}>{t("home.services.title")}</span>
            </h2>
            <p className={scss.subtitle}>{t("services.title")}</p>
          </div>

          <div className={scss.grid}>
            {services.map((service, index) => (
              <div key={index} className={scss.card}>
                <div className={scss.iconWrapper}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p className={scss.desc}>{service.desc}</p>
                <div className={scss.price}>{service.price}</div>
              </div>
            ))}
          </div>

          <div className={scss.action}>
            <button className={scss.button} onClick={handleNavigate}>
              {t("common.view")} <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
