import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { Snackbar, Alert } from "@mui/material";
import scss from "./AddMaterial.module.scss";

const AddMaterial = () => {
  const { t } = useTranslation();
  const { addProduct } = useProduct();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    img: "",
    category: "Гигиена",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const categories = [
    "Гигиена",
    "Инструменты",
    "Аксессуары",
    "Средства по уходу",
    "Оборудование",
    "Другое",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      price: Number(formData.price),
      id: Date.now(),
      data: new Date().toISOString(),
    };
    await addProduct(newProduct);
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "success",
    });
    setTimeout(() => navigate("/admin/allMaterials"), 1500);
  };

  return (
    <div className={scss.addMaterial}>
      <div className={scss.tittle}>
        <h2>{t("admin.products.addButton")}</h2>
        <button
          className={scss.backBtn}
          onClick={() => navigate("/admin/allMaterials")}
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

        <div className={scss.formGroup}>
          <label>{t("common.price")} *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="1"
            required
          />
        </div>

        <div className={scss.formGroup}>
          <label>{t("category")}</label>
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
          <label>{t("common.description")}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={t("common.description")}
            rows="3"
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

export default AddMaterial;
