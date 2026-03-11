import React from "react";
import { useTranslation } from "react-i18next";
import scss from "./Principles.module.scss";
import { TbShieldHeart } from "react-icons/tb";
import { FaSyringe } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";

const Principles = () => {
  const { t } = useTranslation();

  const principles = [
    {
      id: 1,
      title: t("about.principles.item1.title"),
      text: t("about.principles.item1.text"),
      icon: <TbShieldHeart size={48} color="#4CAF50" />,
    },
    {
      id: 2,
      title: t("about.principles.item2.title"),
      text: t("about.principles.item2.text"),
      icon: <FaSyringe size={48} color="#2196F3" />,
    },
    {
      id: 3,
      title: t("about.principles.item3.title"),
      text: t("about.principles.item3.text"),
      icon: <FaUserDoctor size={48} color="#FF9800" />,
    },
  ];

  return (
    <div className="container">
      <section className={scss.principles}>
        <div className={scss.container}>
          <h2 className={scss.sectionTitle}>{t("about.principles.title")}</h2>
          <div className={scss.principlesGrid}>
            {principles.map((principle) => (
              <div key={principle.id} className={scss.principleCard}>
                <div className={scss.iconWrapper}>{principle.icon}</div>
                <h3 className={scss.principleTitle}>{principle.title}</h3>
                <p className={scss.principleText}>{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Principles;
