import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiUser, FiPlus, FiSearch } from "react-icons/fi";
import { FaTooth, FaStethoscope } from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import scss from "./Doctors.module.scss";

const Doctors = () => {
  const { t } = useTranslation();
  const { doctors, readDoctors, deleteDoctors } = useProduct();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    readDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id) => {
    await deleteDoctors(id);
    setDeleteConfirm(null);
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "success",
    });
  };

  return (
    <div className={scss.doctors}>
      <div className={scss.header}>
        <h2>{t("admin.doctors.title")}</h2>
        <button
          className={scss.addBtn}
          onClick={() => navigate("/admin/addDoctor")}
        >
          <FiPlus /> {t("admin.doctors.addButton")}
        </button>
      </div>

      <div className={scss.searchBar}>
        <FiSearch className={scss.searchIcon} />
        <input
          type="text"
          placeholder={t("admin.doctors.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredDoctors.length === 0 ? (
        <div className={scss.empty}>
          <FaTooth size={48} />
          <h3>{t("admin.doctors.notFound")}</h3>
        </div>
      ) : (
        <div className={scss.grid}>
          {filteredDoctors.map((doctor) => (
            <div key={doctor._id} className={scss.card}>
              <div className={scss.avatar}>
                {doctor.photo ? (
                  <img src={doctor.photo} alt={doctor.name} />
                ) : (
                  <FiUser size={40} />
                )}
              </div>
              <div className={scss.info}>
                <h3>{doctor.name}</h3>
                <p className={scss.specialty}>
                  <FaStethoscope /> {doctor.specialty}
                </p>
                <p className={scss.experience}>
                  {t("admin.doctors.experience")}: {doctor.experience}{" "}
                  {t("admin.doctors.years")}
                </p>
                {doctor.phone && (
                  <p className={scss.phone}>📞 {doctor.phone}</p>
                )}
                {doctor.email && (
                  <p className={scss.email}>✉️ {doctor.email}</p>
                )}
              </div>
              <div className={scss.actions}>
                <button
                  className={scss.editBtn}
                  onClick={() => navigate(`/admin/editDoctor/${doctor._id}`)}
                  title={t("common.edit")}
                >
                  <FiEdit />
                </button>
                <button
                  className={scss.deleteBtn}
                  onClick={() => setDeleteConfirm(doctor)}
                  title={t("common.delete")}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog для подтверждения удаления */}
      <Dialog
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        className={scss.dialog}
      >
        <DialogTitle>{t("common.confirm")}</DialogTitle>
        <DialogContent>{t("admin.doctors.confirmDelete")}</DialogContent>
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

export default Doctors;
