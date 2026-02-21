import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  FiShoppingCart,
  FiArrowLeft,
  FiEye,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";
import { Snackbar, Alert, Button } from "@mui/material";
import scss from "./ProductDetail.module.scss";
import { useProduct } from "../../../context/MainContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { product, readProduct, deleteProduct } = useProduct();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Определяем, откуда пришли (из админки или из магазина)
  const fromAdmin =
    location.state?.from === "admin" || document.referrer.includes("/admin");

  useEffect(() => {
    const loadProduct = async () => {
      await readProduct();
      setLoading(false);
    };
    loadProduct();
  }, []);

  useEffect(() => {
    if (product.length > 0 && id) {
      const found = product.find(
        (p) => p._id === id || p.id === Number(id) || p.id === id,
      );
      setItem(found);
    }
  }, [id, product]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleBack = () => {
    if (fromAdmin) {
      navigate("/admin/allMaterials"); // или просто /admin
    } else {
      navigate("/store");
    }
  };

  if (loading) {
    return <div className={scss.loading}>Загрузка...</div>;
  }

  if (!item) {
    return (
      <div className={scss.notFound}>
        <h2>Товар не найден</h2>
        <Button variant="contained" onClick={() => navigate("/admin")}>
          Вернуться в магазин
        </Button>
      </div>
    );
  }

  return (
    <div className={scss.productDetail}>
      <div className="container">
        <button className={scss.backButton} onClick={handleBack}>
          <FiArrowLeft /> {fromAdmin ? "В админку" : "В магазин"}
        </button>

        <div className={scss.content}>
          <div className={scss.imageSection}>
            {item.img ? (
              <img src={item.img} alt={item.name} />
            ) : (
              <div className={scss.noImage}>Нет изображения</div>
            )}
          </div>

          <div className={scss.infoSection}>
            <h1>{item.name}</h1>
            <p className={scss.price}>{item.price} сом</p>
            <div className={scss.description}>
              <h3>Описание</h3>
              <p>{item.description || "Нет описания"}</p>
            </div>
            <div className={scss.actions}>
              <button
                className={scss.editBtn}
                onClick={() =>
                  navigate(`/admin/editMaterial/${item.id || item.id}`)
                }
                title="Редактировать"
              >
                <FiEdit />
              </button>
              <button
                className={scss.deleteBtn}
                onClick={() => deleteProduct(item._id || item.id)}
                title="Удалить"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      </div>

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

export default ProductDetail;
