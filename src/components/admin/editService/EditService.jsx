import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiClock } from "react-icons/fi";
import { FaStethoscope } from "react-icons/fa";
import { Snackbar, Alert } from "@mui/material";
import scss from "./EditService.module.scss";

const EditService = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { service: serviceList, readServices, updateService } = useProduct();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    doctorName: "",
    img: "",
  });
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    readServices();
  }, []);

  useEffect(() => {
    if (serviceList && serviceList.length > 0 && id) {
      const found = serviceList.find(
        (s) => s._id === id || s.id === Number(id),
      );
      if (found) {
        setFormData({
          name: found.name || "",
          description: found.description || "",
          price: found.price?.toString() || "",
          duration: found.duration || "",
          category: found.category || "Другое",
          doctorName: found.doctorName || "",
          img: found.img || "",
        });
      }
      setLoading(false);
    }
  }, [serviceList, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const found = serviceList?.find(
        (s) => s._id === id || s.id === Number(id),
      );
      if (!found) throw new Error("Service not found");

      await updateService(found._id || found.id, {
        ...formData,
        price: formData.price ? Number(formData.price) : null,
      });
      setSnackbar({
        open: true,
        message: t("common.success"),
        severity: "success",
      });
      setTimeout(() => navigate("/admin/allServices"), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: t("common.error"),
        severity: "error",
      });
    }
  };

  if (loading) {
    return <div className={scss.loading}>{t("common.loading")}</div>;
  }

  return (
    <div className={scss.editService}>
      <h2>
        {t("common.edit")} {t("admin.services.service")}
      </h2>

      <form onSubmit={handleSubmit} className={scss.form}>
        <div className={scss.formGroup}>
          <label>{t("common.name")} *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
          <label>
            <FaStethoscope /> {t("admin.services.doctor")}
          </label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
          />
        </div>

        <div className={scss.formGroup}>
          <label>{t("common.description")}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
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
          />
          {formData.img && (
            <div className={scss.preview}>
              <img src={formData.img} alt={t("common.preview")} />
            </div>
          )}
        </div>

        <div className={scss.actions}>
          <button
            type="button"
            className={scss.cancelBtn}
            onClick={() => navigate("/admin/allServices")}
          >
            {t("common.cancel")}
          </button>
          <button type="submit" className={scss.submitBtn}>
            <FiSave /> {t("common.save")}
          </button>
        </div>
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

export default EditService;
