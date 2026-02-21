import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { Snackbar, Alert } from "@mui/material";
import scss from "./Wishlist.module.scss";

const Wishlist = () => {
  const { t } = useTranslation();
  const { wishlist, readWishlist, deleteWishlist, addCart } = useProduct();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    readWishlist();
  }, []);

  const handleRemove = async (id) => {
    await deleteWishlist(id);
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "info",
    });
  };

  const handleAddToCart = async (item) => {
    await addCart(item);
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  if (wishlist.length === 0) {
    return (
      <div className={scss.empty}>
        <FiHeart size={48} />
        <h3>{t("client.wishlist.empty")}</h3>
        <p>{t("client.wishlist.emptyDesc")}</p>
        <Link to="/store" className={scss.link}>
          {t("client.wishlist.goToStore")}
        </Link>
      </div>
    );
  }

  return (
    <div className={scss.wishlist}>
      <h2>{t("client.wishlist.title")}</h2>
      <div className={scss.grid}>
        {wishlist.map((item) => (
          <div key={item._id || item.id} className={scss.card}>
            <div className={scss.image}>
              {item.img ? (
                <img src={item.img} alt={item.name} />
              ) : (
                <div className={scss.noImage}>{t("common.noImage")}</div>
              )}
            </div>
            <div className={scss.info}>
              <h3>{item.name}</h3>
              <p className={scss.price}>
                {item.price} {t("common.currency")}
              </p>
            </div>
            <div className={scss.actions}>
              <button
                onClick={() => handleAddToCart(item)}
                title={t("client.wishlist.addToCart")}
              >
                <FiShoppingCart />
              </button>
              <button
                onClick={() => handleRemove(item._id || item.id)}
                title={t("client.wishlist.remove")}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Wishlist;
