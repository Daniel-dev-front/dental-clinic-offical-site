import React from "react";
import { useTranslation } from "react-i18next";
import scss from "./Interior.module.scss";
import resepshn from "../../../assets/resepshn.png";
import wait_zone from "../../../assets/wait-zone.webp";
import cabinet from "../../../assets/cabinet.webp";
import operasia from "../../../assets/operasia.jpg";

const Interior = () => {
  const { t } = useTranslation();

  const interiors = [
    {
      id: 1,
      title: t("about.interior.items.waiting.title"),
      description: t("about.interior.items.waiting.desc"),
      image: wait_zone,
    },
    {
      id: 2,
      title: t("about.interior.items.cabinet.title"),
      description: t("about.interior.items.cabinet.desc"),
      image: cabinet,
    },
    {
      id: 3,
      title: t("about.interior.items.reception.title"),
      description: t("about.interior.items.reception.desc"),
      image: resepshn,
    },
    {
      id: 4,
      title: t("about.interior.items.operating.title"),
      description: t("about.interior.items.operating.desc"),
      image: operasia,
    },
  ];

  return (
    <div id="interior-bd">
      <div className="container">
        <section className={scss.interior}>
          <div className={scss.container}>
            <h2 className={scss.sectionTitle}>{t("about.interior.title")}</h2>
            <div className={scss.interiorGrid}>
              {interiors.map((item) => (
                <div key={item.id} className={scss.interiorCard}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={scss.imagePlaceholder}
                  />
                  <div className={scss.interiorContent}>
                    <h3 className={scss.interiorTitle}>{item.title}</h3>
                    <p className={scss.interiorDescription}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Interior;
