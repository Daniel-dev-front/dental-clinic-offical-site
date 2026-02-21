import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye, FiSearch, FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import scss from "./AllMaterials.module.scss";

const AllMaterials = () => {
  const { t } = useTranslation();
  const { product, readProduct, deleteProduct } = useProduct();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    readProduct();
  }, []);

  useEffect(() => {
    if (product) {
      setFilteredProducts(
        product.filter((item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }
  }, [searchTerm, product]);

  const handleDelete = async (item) => {
    await deleteProduct(item._id || item.id);
    setDeleteConfirm(null);
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
    <div className={scss.allMaterials}>
      <div className={scss.header}>
        <h2>{t("admin.products.title")}</h2>
        <button
          className={scss.addButton}
          onClick={() => navigate("/admin/addMaterial")}
        >
          <FiPlus /> {t("admin.products.addButton")}
        </button>
      </div>

      <div className={scss.searchBar}>
        <FiSearch className={scss.searchIcon} />
        <input
          type="text"
          placeholder={t("admin.products.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className={scss.noResults}>{t("admin.products.notFound")}</p>
      ) : (
        <div className={scss.productGrid}>
          {filteredProducts.map((item) => (
            <div key={item._id || item.id} className={scss.productCard}>
              <div className={scss.imageWrapper}>
                {item.img ? (
                  <img src={item.img} alt={item.name} />
                ) : (
                  <div className={scss.noImage}>
                    {t("admin.products.noImage")}
                  </div>
                )}
              </div>
              <div className={scss.cardContent}>
                <h3 title={item.name}>{item.name}</h3>
                <p className={scss.price}>
                  {item.price} {t("admin.products.price")}
                </p>
                <p className={scss.description} title={item.description}>
                  {item.description?.substring(0, 60)}...
                </p>
                <div className={scss.actions}>
                  <button
                    className={scss.viewBtn}
                    onClick={() =>
                      navigate(`/productDetails/${item._id || item.id}`)
                    }
                    title={t("common.view")}
                  >
                    <FiEye />
                  </button>
                  <button
                    className={scss.editBtn}
                    onClick={() =>
                      navigate(`/admin/editMaterial/${item._id || item.id}`)
                    }
                    title={t("common.edit")}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className={scss.deleteBtn}
                    onClick={() => setDeleteConfirm(item)}
                    title={t("common.delete")}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        className={scss.dialog}
      >
        <DialogTitle>{t("common.confirm")}</DialogTitle>
        <DialogContent>{t("admin.products.confirmDelete")}</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>
            {t("common.cancel")}
          </Button>
          <Button
            onClick={() => handleDelete(deleteConfirm)}
            color="error"
            variant="contained"
          >
            {t("common.delete")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar уведомление */}
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

export default AllMaterials;
