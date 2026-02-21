import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { useNavigate, useParams } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiAward, FiSave } from "react-icons/fi";
import { FaStethoscope } from "react-icons/fa";
import { Snackbar, Alert } from "@mui/material";
import scss from "./EditDoctor.module.scss";

const EditDoctor = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors, readDoctors, updateDoctor } = useProduct();
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    phone: "",
    email: "",
    photo: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    readDoctors();
  }, []);

  useEffect(() => {
    if (!loading && doctors.length > 0 && id) {
      const doctor = doctors.find((d) => d._id === id || d.id === Number(id));
      if (doctor) {
        setFormData({
          name: doctor.name || "",
          specialty: doctor.specialty || "",
          experience: doctor.experience?.toString() || "",
          phone: doctor.phone || "",
          email: doctor.email || "",
          photo: doctor.photo || "",
          bio: doctor.bio || "",
        });
      }
      setLoading(false);
    }
  }, [loading, doctors, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const doctor = doctors.find((d) => d._id === id || d.id === Number(id));
      if (!doctor) throw new Error("Doctor not found");

      await updateDoctor(doctor._id, {
        ...formData,
        experience: formData.experience ? Number(formData.experience) : 0,
      });
      setSnackbar({
        open: true,
        message: t("common.success"),
        severity: "success",
      });
      setTimeout(() => navigate("/admin/doctors"), 1500);
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
    <div className={scss.editDoctor}>
      <h2>
        {t("common.edit")} {t("admin.doctors.title")}
      </h2>

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
          />
        </div>

        <div className={scss.formGroup}>
          <label>{t("common.photo")}</label>
          <input
            type="url"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
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

export default EditDoctor;
