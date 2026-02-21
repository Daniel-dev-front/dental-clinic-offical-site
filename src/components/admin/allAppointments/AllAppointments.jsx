import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiCheck,
  FiX,
  FiRefreshCw,
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
import scss from "./AllAppointments.module.scss";
import { useProduct } from "../../../context/MainContext";

const AllAppointments = () => {
  const { t } = useTranslation();
  const { appointments, readAppointments, updateAppointment } = useProduct();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    readAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateAppointment(id, { status: newStatus });
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "success",
    });
    setOpenDialog(false);
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

  return (
    <div className={scss.allAppointments}>
      <div className={scss.header}>
        <h2>
          <FiCalendar size={28} color="var(--primary, #2563eb)" />
          {t("admin.appointments.title")}
        </h2>
        <button className={scss.refreshBtn} onClick={() => readAppointments()}>
          <FiRefreshCw /> {t("admin.appointments.refresh")}
        </button>
      </div>

      {appointments.length === 0 ? (
        <div className={scss.empty}>
          <FiCalendar size={48} />
          <h3>{t("admin.appointments.noAppointments")}</h3>
        </div>
      ) : (
        <div className={scss.table}>
          <div className={scss.tableHeader}>
            <span>{t("admin.appointments.client")}</span>
            <span>{t("admin.appointments.phone")}</span>
            <span>{t("admin.appointments.doctor")}</span>
            <span>{t("admin.appointments.date")}</span>
            <span>{t("admin.appointments.time")}</span>
            <span>{t("admin.appointments.status")}</span>
            <span>{t("admin.appointments.actions")}</span>
          </div>
          <div className={scss.tableBody}>
            {appointments.map((item) => (
              <div key={item._id} className={scss.tableRow}>
                <span data-label={t("admin.appointments.client")}>
                  {item.displayName}
                </span>
                <span data-label={t("admin.appointments.phone")}>
                  {item.phone}
                </span>
                <span data-label={t("admin.appointments.doctor")}>
                  {item.doctorName}
                </span>
                <span data-label={t("admin.appointments.date")}>
                  {new Date(item.date).toLocaleDateString()}
                </span>
                <span data-label={t("admin.appointments.time")}>
                  {item.time}
                </span>
                <span data-label={t("admin.appointments.status")}>
                  <p
                    className={scss.statusBadge}
                    style={{ backgroundColor: getStatusColor(item.status) }}
                  >
                    {getStatusText(item.status)}
                  </p>
                </span>
                <div
                  className={scss.actions}
                  data-label={t("admin.appointments.actions")}
                >
                  <button
                    className={scss.editBtn}
                    onClick={() => {
                      setSelectedAppointment(item);
                      setOpenDialog(true);
                    }}
                  >
                    {t("admin.appointments.changeStatus")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className={scss.dialog}
      >
        <DialogTitle>{t("admin.appointments.changeStatus")}</DialogTitle>
        <DialogContent>
          <p>
            <strong>{t("admin.appointments.client")}:</strong>{" "}
            {selectedAppointment?.userName}
            <br />
            <strong>{t("admin.appointments.doctor")}:</strong>{" "}
            {selectedAppointment?.doctorName}
            <br />
            <strong>{t("admin.appointments.date")}:</strong>{" "}
            {selectedAppointment?.date}
          </p>
          <div className={scss.statusButtons}>
            <button
              className={`${scss.statusBtn} ${scss.confirm}`}
              onClick={() =>
                handleStatusChange(selectedAppointment?._id, "confirmed")
              }
            >
              <FiCheck /> {t("admin.appointments.confirm")}
            </button>
            <button
              className={`${scss.statusBtn} ${scss.cancel}`}
              onClick={() =>
                handleStatusChange(selectedAppointment?._id, "cancelled")
              }
            >
              <FiX /> {t("admin.appointments.cancel")}
            </button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            {t("admin.appointments.close")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default AllAppointments;
