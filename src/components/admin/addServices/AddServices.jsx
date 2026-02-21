import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { useNavigate } from "react-router-dom";
import { FiSave, FiClock } from "react-icons/fi";
import { Snackbar, Alert } from "@mui/material";
import scss from "./AddServices.module.scss";

const AddServices = () => {
  const { t } = useTranslation();
  const { addService } = useProduct();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "Лечение",
    doctorName: "",
    img: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const categories = [
    "Лечение",
    "Хирургия",
    "Протезирование",
    "Ортодонтия",
    "Детская стоматология",
    "Гигиена",
    "Имплантация",
    "Другое",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newService = {
      ...formData,
      price: formData.price ? Number(formData.price) : null,
      id: Date.now(),
      data: new Date().toISOString(),
    };
    await addService(newService);
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "success",
    });
    setTimeout(() => navigate("/admin/allServices"), 1500);
  };

  return (
    <div className={scss.addService}>
      <div className={scss.header}>
        <h2>{t("admin.services.addButton")}</h2>
        <button
          className={scss.backBtn}
          onClick={() => navigate("/admin/allServices")}
        >
          {t("common.back")}
        </button>
      </div>

      <form onSubmit={handleSubmit} className={scss.form}>
        <div className={scss.formGroup}>
          <label>{t("common.name")} *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("common.name")}
            required
          />
        </div>

        <div className={scss.formRow}>
          <div className={scss.formGroup}>
            <label>{t("common.price")}</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>

          <div className={scss.formGroup}>
            <label>
              <FiClock /> {t("admin.services.duration")}
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder={t("admin.services.duration")}
            />
          </div>
        </div>

        <div className={scss.formGroup}>
          <label>{t("common.category")}</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className={scss.formGroup}>
          <label>{t("admin.services.doctor")}</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            placeholder={t("admin.services.doctor")}
          />
        </div>

        <div className={scss.formGroup}>
          <label>{t("common.description")}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={t("common.description")}
            rows="4"
          />
        </div>

        <div className={scss.formGroup}>
          <label>{t("common.image")}</label>
          <input
            type="url"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
          {formData.img && (
            <div className={scss.preview}>
              <img src={formData.img} alt={t("common.preview")} />
            </div>
          )}
        </div>

        <button type="submit" className={scss.submitBtn}>
          <FiSave /> {t("common.save")}
        </button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default AddServices;
