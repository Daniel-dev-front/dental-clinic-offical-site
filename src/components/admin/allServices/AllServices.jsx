import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { useNavigate } from "react-router-dom";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiClock,
  FiDollarSign,
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
import scss from "./AllServices.module.scss";

const AllServices = () => {
  const { t } = useTranslation();
  const { service, readServices, deleteService } = useProduct();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    readServices();
  }, []);

  const filteredServices = service.filter(
    (services) =>
      services.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      services.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      services.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getCategoryColor = (category) => {
    const colors = {
      Лечение: "#3b82f6",
      Хирургия: "#ef4444",
      Протезирование: "#8b5cf6",
      Ортодонтия: "#10b981",
      "Детская стоматология": "#f59e0b",
      Гигиена: "#06b6d4",
      Имплантация: "#ec4899",
      Другое: "#6b7280",
    };
    return colors[category] || "#6b7280";
  };

  const handleDelete = async (id) => {
    await deleteService(id);
    setDeleteConfirm(null);
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div className={scss.allServices}>
      <div className={scss.header}>
        <h2>{t("admin.services.title")}</h2>
        <button
          className={scss.addBtn}
          onClick={() => navigate("/admin/addServices")}
        >
          <FiPlus /> {t("admin.services.addButton")}
        </button>
      </div>

      <div className={scss.searchBar}>
        <FiSearch className={scss.searchIcon} />
        <input
          type="text"
          placeholder={t("admin.services.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className={scss.empty}>
          <h3>{t("admin.services.notFound")}</h3>
        </div>
      ) : (
        <div className={scss.grid}>
          {filteredServices.map((service) => (
            <div key={service._id} className={scss.card}>
              <div
                className={scss.categoryBadge}
                style={{ backgroundColor: getCategoryColor(service.category) }}
              >
                {service.category || t("common.other")}
              </div>

              {service.img && (
                <div className={scss.image}>
                  <img src={service.img} alt={service.name} />
                </div>
              )}

              <div className={scss.content}>
                <h3>{service.name}</h3>

                <div className={scss.details}>
                  {service.price && (
                    <div className={scss.detail}>
                      <FiDollarSign /> {service.price}{" "}
                      {t("admin.services.price")}
                    </div>
                  )}
                  {service.duration && (
                    <div className={scss.detail}>
                      <FiClock /> {service.duration}{" "}
                      {t("admin.services.duration")}
                    </div>
                  )}
                </div>

                {service.doctorName && (
                  <p className={scss.doctor}>👨‍⚕️ {service.doctorName}</p>
                )}

                {service.description && (
                  <p className={scss.description}>{service.description}</p>
                )}
              </div>

              <div className={scss.actions}>
                <button
                  className={scss.editBtn}
                  onClick={() => navigate(`/admin/editService/${service.id}`)}
                  title={t("common.edit")}
                >
                  <FiEdit />
                </button>
                <button
                  className={scss.deleteBtn}
                  onClick={() => setDeleteConfirm(service)}
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
        <DialogContent>{t("admin.services.confirmDelete")}</DialogContent>
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
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AllServices;
