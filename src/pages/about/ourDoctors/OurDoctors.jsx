import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import scss from "./OurDoctors.module.scss";

const OurDoctors = () => {
  const { t } = useTranslation();
  const { doctors, readDoctors } = useProduct();

  useEffect(() => {
    readDoctors();
  }, []);

  const displayedDoctors = doctors.slice(0, 3);

  return (
    <div id="bg-team">
      <div className="container">
        <section className={scss.team}>
          <div className={scss.container}>
            <h2 className={scss.sectionTitle}>{t("about.doctors.title")}</h2>
            <div className={scss.teamGrid}>
              {displayedDoctors.map((doctor) => (
                <div key={doctor.id} className={scss.teamCard}>
                  <img
                    className={scss.photoPlaceholder}
                    src={doctor.photo}
                    alt={doctor.name}
                  />
                  <h3 className={scss.doctorName}>{doctor.name}</h3>
                  <p className={scss.doctorPosition}>{doctor.specialty}</p>
                  <p className={scss.doctorExperience}>
                    {t("about.doctors.experience")}: {doctor.experience}
                  </p>
                  <p className={scss.doctorQuote}>"{doctor.bio}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurDoctors;
