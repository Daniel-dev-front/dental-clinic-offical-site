import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { Snackbar, Alert } from "@mui/material";
import scss from "./EditMaterial.module.scss";

const EditMaterial = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, readProduct, updateProduct } = useProduct();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    img: "",
    category: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    readProduct();
  }, []);

  useEffect(() => {
    if (product.length > 0 && id) {
      const item = product.find((p) => p._id === id || p.id === Number(id));
      if (item) {
        setFormData({
          name: item.name || "",
          price: item.price?.toString() || "",
          description: item.description || "",
          img: item.img || "",
          category: item.category || "Гигиена",
          quantity: item.quantity || 1,
        });
      }
      setLoading(false);
    }
  }, [id, product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const item = product.find((p) => p._id === id || p.id === Number(id));
      if (!item) throw new Error("Product not found");

      await updateProduct(item._id, {
        ...formData,
        price: Number(formData.price),
      });
      setSnackbar({
        open: true,
        message: t("common.success"),
        severity: "success",
      });
      setTimeout(() => navigate("/admin/allMaterials"), 1500);
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
    <div className={scss.editMaterial}>
      <h2>
        {t("common.edit")} {t("admin.products.title")}
      </h2>

      <form onSubmit={handleSubmit}>
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

        <div className={scss.formGroup}>
          <label>{t("common.price")} *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
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
          <label>{t("common.description")}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
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
          />
          {formData.img && (
            <div className={scss.preview}>
              <img src={formData.img} alt={t("common.preview")} />
            </div>
          )}
        </div>

        <div className={scss.formGroup}>
          <label>{t("client.cart.quantity")}</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div className={scss.actions}>
          <button
            type="button"
            className={scss.cancelBtn}
            onClick={() => navigate("/admin/allMaterials")}
          >
            {t("common.cancel")}
          </button>
          <button type="submit" className={scss.saveBtn}>
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

export default EditMaterial;
