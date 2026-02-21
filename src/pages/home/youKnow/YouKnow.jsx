import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import scss from "./YouKnow.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import sxema from "../../../assets/sxema.png";
import tooth from "../../../assets/tooth.png";
import smile from "../../../assets/smile.jpg";
import jemchug from "../../../assets/Serenity.webp";
import doctor_tooth from "../../../assets/doctor-tooth.webp";
import tooth2 from "../../../assets/tooth2.webp";
import cheese from "../../../assets/cheese.jpg";
import gold_tooth from "../../../assets/gold-tooth.webp";
import technolog from "../../../assets/technolog.jpg";
import smoking_effect from "../../../assets/smoking-effect.jpg";

const YouKnow = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const facts = [
    {
      id: 1,
      number: "01",
      imageAlt: "Схема челюсти с подсветкой сторон",
      imageColor: "#1a365d",
      imageUrl: sxema,
    },
    {
      id: 2,
      number: "02",
      imageAlt: "Срез зуба с годовыми кольцами",
      imageColor: "#2d3748",
      imageUrl: tooth,
    },
    {
      id: 3,
      number: "03",
      imageAlt: "Красивая улыбка",
      imageColor: "#4a5568",
      imageUrl: smile,
    },
    {
      id: 4,
      number: "04",
      imageAlt: "Жемчужина рядом с зубом",
      imageColor: "#2d3748",
      imageUrl: jemchug,
    },
    {
      id: 5,
      number: "05",
      imageAlt: "Зуб в руках врача",
      imageColor: "#1a365d",
      imageUrl: doctor_tooth,
    },
    {
      id: 6,
      number: "06",
      imageAlt: "Макросъемка капли слюны",
      imageColor: "#4a5568",
      imageUrl: tooth2,
    },
    {
      id: 7,
      number: "07",
      imageAlt: "Кусок твердого сыра",
      imageColor: "#2d3748",
      imageUrl: cheese,
    },
    {
      id: 8,
      number: "08",
      imageAlt: "Золотой слиток и зуб",
      imageColor: "#1a365d",
      imageUrl: gold_tooth,
    },
    {
      id: 9,
      number: "09",
      imageAlt: "древние технологии",
      imageColor: "#1a365d",
      imageUrl: technolog,
    },
    {
      id: 10,
      number: "10",
      imageAlt: "влияние курения на зубы",
      imageColor: "#2d3748",
      imageUrl: smoking_effect,
    },
  ];

  const nextFact = () => {
    setActiveIndex((prev) => (prev + 1) % facts.length);
  };

  const prevFact = () => {
    setActiveIndex((prev) => (prev - 1 + facts.length) % facts.length);
  };

  const factKey = (activeIndex + 1).toString();

  return (
    <section className="container">
      <div className={scss.dentalFactsHorizontal}>
        <div className={scss.sectionHeader}>
          <h2 className={scss.sectionTitle}>{t("youknow.title")}</h2>
          <p className={scss.sectionSubtitle}>{t("youknow.subtitle")}</p>
        </div>

        <div className={scss.factCard}>
          <div
            className={scss.imageSide}
            style={{ backgroundColor: facts[activeIndex].imageColor }}
          >
            <div className={scss.imagePlaceholder}>
              <div className={scss.placeholderNote}>
                <img
                  src={facts[activeIndex].imageUrl}
                  alt={facts[activeIndex].imageAlt}
                />
              </div>
            </div>
          </div>

          <div className={scss.textSide}>
            <div className={scss.factNumber}>{facts[activeIndex].number}</div>
            <div className={scss.content}>
              <h3 className={scss.factTitle}>
                {t(`youknow.facts.${factKey}.title`)}
              </h3>
              <p className={scss.factSubtitle}>
                {t(`youknow.facts.${factKey}.subtitle`)}
              </p>
              <div className={scss.divider}></div>
              <p className={scss.factDescription}>
                {t(`youknow.facts.${factKey}.description`)}
              </p>
            </div>

            <div className={scss.navigation}>
              <button
                className={`${scss.navBtn} ${scss.prev}`}
                onClick={prevFact}
              >
                <FaChevronLeft />
              </button>

              <div className={scss.counter}>
                <span className={scss.current}>{activeIndex + 1}</span>
                <span className={scss.separator}>/</span>
                <span className={scss.total}>{facts.length}</span>
              </div>

              <button
                className={`${scss.navBtn} ${scss.next}`}
                onClick={nextFact}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouKnow;
