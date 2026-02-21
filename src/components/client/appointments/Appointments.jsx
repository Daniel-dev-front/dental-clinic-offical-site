import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import scss from "./Appointments.module.scss";
import { useProduct } from "../../../context/MainContext";
import { useAuth } from "../../../context/AuthProvider";

const Appointments = () => {
  const { t } = useTranslation();
  const { appointments, readAppointments, addAppointment, deleteAppointment } =
    useProduct();
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    doctorName: "",
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

  useEffect(() => {
    readAppointments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAppointment = {
      ...formData,
      userId: user?.uid,
      userName: user?.displayName || user?.email || t("common.client"),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await addAppointment(newAppointment);
    setOpenDialog(false);
    setFormData({ doctorName: "", date: "", time: "", reason: "", phone: "" });
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "success",
    });
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    setDeleteConfirm(null);
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "info",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f59e0b";
      case "confirmed":
        return "#10b981";
      case "cancelled":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return t("client.appointments.status.pending");
      case "confirmed":
        return t("client.appointments.status.confirmed");
      case "cancelled":
        return t("client.appointments.status.cancelled");
      default:
        return status;
    }
  };

  const userAppointments = appointments.filter(
    (app) => app.userId === user?.uid,
  );

  return (
    <div className={scss.appointments}>
      <div className={scss.header}>
        <h2>{t("client.appointments.title")}</h2>
        <button className={scss.addBtn} onClick={() => setOpenDialog(true)}>
          <FiPlus /> {t("client.appointments.book")}
        </button>
      </div>

      {userAppointments.length === 0 ? (
        <div className={scss.empty}>
          <FiCalendar size={48} />
          <h3>{t("client.appointments.empty")}</h3>
          <p>{t("client.appointments.emptyDesc")}</p>
          <button className={scss.emptyBtn} onClick={() => setOpenDialog(true)}>
            {t("client.appointments.book")}
          </button>
        </div>
      ) : (
        <div className={scss.list}>
          {userAppointments.map((item) => (
            <div key={item._id} className={scss.card}>
              <div
                className={scss.status}
                style={{ backgroundColor: getStatusColor(item.status) }}
              >
                {getStatusText(item.status)}
              </div>
              <div className={scss.content}>
                <h3>{item.doctorName}</h3>
                <div className={scss.details}>
                  <div>
                    <FiCalendar /> {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div>
                    <FiClock /> {item.time}
                  </div>
                  <div>
                    <FiUser /> {item.userName}
                  </div>
                  {item.phone && (
                    <div>
                      <FiPhone /> {item.phone}
                    </div>
                  )}
                </div>
                {item.reason && (
                  <div className={scss.reason}>
                    <strong>{t("client.appointments.reason")}:</strong>{" "}
                    {item.reason}
                  </div>
                )}
              </div>
              {item.status === "pending" && (
                <button
                  className={scss.deleteBtn}
                  onClick={() => setDeleteConfirm(item)}
                  title={t("client.appointments.cancel")}
                >
                  <FiTrash2 />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Диалог подтверждения удаления */}
      <Dialog
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        className={scss.dialog}
      >
        <DialogTitle>{t("common.confirm")}</DialogTitle>
        <DialogContent>
          {t("client.appointments.confirmDelete")} {deleteConfirm?.doctorName}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>
            {t("common.cancel")}
          </Button>
          <Button
            onClick={() => handleDelete(deleteConfirm?._id)}
            color="error"
            variant="contained"
          >
            {t("common.delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог записи */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className={scss.dialog}
      >
        <DialogTitle>{t("client.appointments.bookDialog")}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            className={scss.form}
            id="appointment-form"
          >
            <div className={scss.formGroup}>
              <label>{t("client.appointments.doctor")}</label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                placeholder={t("client.appointments.doctor")}
                required
              />
            </div>
            <div className={scss.formRow}>
              <div className={scss.formGroup}>
                <label>{t("client.appointments.date")}</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={scss.formGroup}>
                <label>{t("client.appointments.time")}</label>
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
              <label>{t("client.appointments.phone")}</label>
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
              <label>{t("client.appointments.reason")}</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder={t("client.appointments.reason")}
                rows="3"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            form="appointment-form"
            variant="contained"
            color="primary"
          >
            {t("client.appointments.book")}
          </Button>
          <Button onClick={() => setOpenDialog(false)}>
            {t("common.cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default Appointments;
