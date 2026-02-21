import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaFilePdf,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap,
  FaCertificate,
} from "react-icons/fa";
import scss from "./Documents.module.scss";
import licenses1 from "../../../assets/lisence1.jpg";
import registerUdost from "../../../assets/Registratsionnoe-udostoverenie.jpg";
import registerFromtechno from "../../../assets/register.jpg";
import { useProduct } from "../../../context/MainContext";

const Documents = () => {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState(null);
  const { doctors } = useProduct();

  const licenses = [
    {
      id: 1,
      title: "Лицензия на осуществление медицинской деятельности",
      number: "ЛО-77-01-012345",
      date: "15.03.2023",
      issuer: "Министерство здравоохранения",
      file: licenses1,
    },
    {
      id: 2,
      title: "Сертификат соответствия стандартам качества",
      number: "СЕР-2023-9876",
      date: "10.01.2024",
      issuer: "Росздравнадзор",
      file: registerUdost,
    },
    {
      id: 3,
      title: "Разрешение на использование медицинского оборудования",
      number: "РМО-2022-5432",
      date: "20.05.2022",
      issuer: "Департамент здравоохранения",
      file: registerFromtechno,
    },
  ];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div id="documents-bg">
      <div className="container">
        <div className={scss.documents}>
          <h2>{t("about.documents.title")}</h2>
          <p>{t("about.documents.description")}</p>

          <div className={scss.buttons}>
            <button
              className={`${scss.button} ${openSection === "licenses" ? scss.active : ""}`}
              onClick={() => toggleSection("licenses")}
            >
              <FaCertificate />
              {t("about.documents.licenses")}
              {openSection === "licenses" ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            <button
              className={`${scss.button} ${openSection === "diplomas" ? scss.active : ""}`}
              onClick={() => toggleSection("diplomas")}
            >
              <FaGraduationCap />
              {t("about.documents.diplomas")}
              {openSection === "diplomas" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>

          {openSection === "licenses" && (
            <div className={scss.content}>
              <h3>{t("about.documents.licenseTitle")}</h3>
              <div className={scss.grid}>
                {licenses.map((item) => (
                  <div key={item.id} className={scss.card}>
                    <div className={scss.cardHeader}>
                      <FaFilePdf color="#ef4444" size="28px" />
                      <h4>{item.title}</h4>
                    </div>
                    <div className={scss.cardBody}>
                      <p>
                        <strong>{t("about.documents.number")}:</strong>{" "}
                        {item.number}
                      </p>
                      <p>
                        <strong>{t("about.documents.date")}:</strong>{" "}
                        {item.date}
                      </p>
                      <p>
                        <strong>{t("about.documents.issuer")}:</strong>{" "}
                        {item.issuer}
                      </p>
                    </div>
                    <div className={scss.cardFooter}>
                      <img src={item.file} alt="" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {openSection === "diplomas" && (
            <div className={scss.content}>
              <h3>{t("about.documents.diplomaTitle")}</h3>
              <div className={scss.diplomasList}>
                {doctors.map((item) => (
                  <div key={item.id} className={scss.diplomaCard}>
                    <div className={scss.diplomaHeader}>
                      <FaGraduationCap className={scss.diplomaIcon} />
                      <div>
                        <h4>{item.name}</h4>
                        <p className={scss.specialty}>{item.specialty}</p>
                      </div>
                    </div>
                    <div className={scss.cardFooter}>
                      <img
                        src={item.diploma}
                        alt={t("about.documents.diplomaTitle")}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
