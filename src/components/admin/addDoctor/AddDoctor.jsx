import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiAward, FiSave } from "react-icons/fi";
import { FaStethoscope } from "react-icons/fa";
import { Snackbar, Alert } from "@mui/material";
import scss from "./AddDoctor.module.scss";

const AddDoctor = () => {
  const { t } = useTranslation();
  const { addDoctors } = useProduct();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    phone: "",
    email: "",
    photo: "",
    bio: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoctors({
      ...formData,
      experience: formData.experience ? Number(formData.experience) : 0,
      id: Date.now(),
    });
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "success",
    });
    setTimeout(() => navigate("/admin/doctors"), 1500);
  };

  return (
    <div className={scss.addDoctor}>
      <h2>{t("admin.doctors.addButton")}</h2>

      <form onSubmit={handleSubmit} className={scss.form}>
        <div className={scss.formGroup}>
          <label>
            <FiUser /> {t("common.name")} *
          </label>
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
          <label>
            <FaStethoscope /> {t("admin.doctors.specialty")} *
          </label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            placeholder={t("admin.doctors.specialty")}
            required
          />
        </div>

        <div className={scss.formRow}>
          <div className={scss.formGroup}>
            <label>
              <FiAward /> {t("admin.doctors.experience")}
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="5"
              min="0"
            />
          </div>

          <div className={scss.formGroup}>
            <label>
              <FiPhone /> {t("common.phone")}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+996 XXX XXX XXX"
            />
          </div>
        </div>

        <div className={scss.formGroup}>
          <label>
            <FiMail /> Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="doctor@clinic.com"
          />
        </div>

        <div className={scss.formGroup}>
          <label>{t("common.photo")}</label>
          <input
            type="url"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
          />
          {formData.photo && (
            <div className={scss.preview}>
              <img src={formData.photo} alt={t("common.preview")} />
            </div>
          )}
        </div>

        <div className={scss.formGroup}>
          <label>{t("common.bio")}</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder={t("common.bio")}
            rows="4"
          />
        </div>

        <div className={scss.actions}>
          <button
            type="button"
            className={scss.cancelBtn}
            onClick={() => navigate("/admin/doctors")}
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

export default AddDoctor;
