import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import scss from "./Services.module.scss";
import { Alert, Snackbar } from "@mui/material";
import { useProduct } from "../../context/MainContext";
import { FiClock, FiDollarSign, FiSearch } from "react-icons/fi";

const Services = () => {
  const { t } = useTranslation();
  const { service, readServices } = useProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const categories = [
    t("services.all"),
    ...new Set(service.map((s) => s.category).filter(Boolean)),
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Лечение: "#3b82f6",
      Хирургия: "#ef4444",
      Протезирование: "#8b5cf6",
      Ортодонтия: "#10b981",
      "Детская стоматология": "#f59e0b",
      Гигиена: "#06b6d4",
      Имплантация: "#ec4899",
      Другое: "#6b7280",
    };
    return colors[category] || "#6b7280";
  };

  useEffect(() => {
    readServices();
  }, []);

  const filteredServices = service.filter((service) => {
    const matchesSearch =
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.doctorName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === t("services.all") || selectedCategory === "all"
        ? true
        : service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className={scss.services}>
      <div className="container">
        <div className={scss.content_all}>
          <div className={scss.content_header}>
            <h1>{t("services.title")}</h1>
            <div className={scss.searchBar}>
              <FiSearch className={scss.searchIcon} />
              <input
                type="text"
                placeholder={t("services.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={scss.categories}>
            {categories.map((category, idx) => (
              <button
                key={idx}
                className={`${scss.categoryBtn} ${
                  selectedCategory === category ||
                  (selectedCategory === "all" && category === t("services.all"))
                    ? scss.active
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(
                    category === t("services.all") ? "all" : category,
                  )
                }
                style={
                  category !== t("services.all") && category !== "all"
                    ? { backgroundColor: getCategoryColor(category) + "20" }
                    : {}
                }
              >
                {category}
              </button>
            ))}
          </div>

          {filteredServices.length === 0 ? (
            <div className={scss.empty}>
              <h3>{t("services.notFound")}</h3>
            </div>
          ) : (
            <div className={scss.grid}>
              {filteredServices.map((service) => (
                <div key={service._id} className={scss.card}>
                  <div
                    className={scss.categoryBadge}
                    style={{
                      backgroundColor: getCategoryColor(service.category),
                    }}
                  >
                    {service.category || t("common.other")}
                  </div>

                  {service.img && (
                    <div className={scss.image}>
                      <img src={service.img} alt={service.name} />
                    </div>
                  )}

                  <div className={scss.content}>
                    <h3>{service.name}</h3>
                    <div className={scss.details}>
                      {service.price && (
                        <div className={scss.detail}>
                          <FiDollarSign /> {service.price}{" "}
                          {t("common.currency")}
                        </div>
                      )}
                      {service.duration && (
                        <div className={scss.detail}>
                          <FiClock /> {service.duration} {t("common.min")}
                        </div>
                      )}
                    </div>
                    {service.description && (
                      <p className={scss.description}>{service.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </section>
  );
};

export default Services;
