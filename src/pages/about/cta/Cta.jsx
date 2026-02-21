import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import scss from "./Cta.module.scss";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useProduct } from "../../../context/MainContext";
import { useAuth } from "../../../context/AuthProvider";

const Cta = () => {
  const { t } = useTranslation();
  const { addAppointment } = useProduct();
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    reason: "",
    phone: "",
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
    const newFreeAppointment = {
      doctorName: t("about.cta.button"),
      name: formData.name,
      date: formData.date,
      time: formData.time,
      phone: formData.phone,
      reason: formData.reason || t("about.cta.button"),
      userId: user?.uid || "guest",
      displayName:
        formData.name || user?.displayName || user?.email || t("common.client"),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    await addAppointment(newFreeAppointment);
    setOpenDialog(false);
    setFormData({ name: "", date: "", time: "", reason: "", phone: "" });
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div id="cta-bg">
      <section className="container">
        <div className={scss.cta}>
          <div className={scss.container}>
            <h2 className={scss.ctaTitle}>{t("about.cta.title")}</h2>
            <p className={scss.ctaText}>{t("about.cta.text")}</p>
            <button
              onClick={() => setOpenDialog(true)}
              className={scss.ctaButton}
            >
              {t("about.cta.button")}
            </button>
            <p className={scss.ctaPhone}>
              {t("footer.callUs")}: +996 502 078 338
            </p>
          </div>
        </div>
      </section>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className={scss.dialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t("about.cta.dialogTitle")}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            className={scss.form}
            id="consultation-form"
          >
            <div className={scss.formGroup}>
              <label>{t("about.cta.name")} *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("about.cta.name")}
                required
              />
            </div>
            <div className={scss.formRow}>
              <div className={scss.formGroup}>
                <label>{t("about.cta.date")} *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={scss.formGroup}>
                <label>{t("about.cta.time")} *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={scss.formGroup}>
              <label>{t("about.cta.phone")} *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+996 XXX XXX XXX"
                required
              />
            </div>
            <div className={scss.formGroup}>
              <label>{t("about.cta.reason")}</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder={t("about.cta.reason")}
                rows="3"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            form="consultation-form"
            variant="contained"
            color="primary"
          >
            {t("about.cta.book")}
          </Button>
          <Button onClick={() => setOpenDialog(false)}>
            {t("common.cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cta;
