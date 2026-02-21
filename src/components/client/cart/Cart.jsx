import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { Snackbar, Alert, Button } from "@mui/material";
import scss from "./Cart.module.scss";

const Cart = () => {
  const { t } = useTranslation();
  const { cart, readCart, deleteCart, updateQuantity, totalPrice, clearAll } =
    useProduct();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    readCart();
  }, []);

  const handleRemove = async (id) => {
    await deleteCart(id);
    setSnackbar({
      open: true,
      message: t("common.success"),
      severity: "info",
    });
  };

  const handleUpdateQuantity = async (item, delta) => {
    await updateQuantity(item, delta);
  };

  const handleClearCart = async () => {
    if (window.confirm(t("client.cart.clearConfirm"))) {
      await clearAll();
      setSnackbar({
        open: true,
        message: t("common.success"),
        severity: "success",
      });
    }
  };

  const handleCheckout = () => {
    setSnackbar({
      open: true,
      message: t("client.cart.checkout"),
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  if (cart.length === 0) {
    return (
      <div className={scss.empty}>
        <FiShoppingBag size={48} />
        <h3>{t("client.cart.empty")}</h3>
        <p>{t("client.cart.emptyDesc")}</p>
        <Link to="/store" className={scss.link}>
          {t("client.cart.goToStore")}
        </Link>
      </div>
    );
  }

  return (
    <div className={scss.cart}>
      <div className={scss.header}>
        <h2>{t("client.cart.title")}</h2>
        {cart.length > 0 && (
          <button onClick={handleClearCart} className={scss.clearBtn}>
            <FiTrash2 /> {t("client.cart.clearAll")}
          </button>
        )}
      </div>

      <div className={scss.cartItems}>
        {cart.map((item) => (
          <div key={item._id} className={scss.cartItem}>
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
            <div className={scss.quantity}>
              <button
                onClick={() => handleUpdateQuantity(item, -1)}
                disabled={item.quantity <= 1}
              >
                <FiMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleUpdateQuantity(item, 1)}>
                <FiPlus />
              </button>
            </div>
            <div className={scss.itemTotal}>
              <p>
                {(item.price * item.quantity).toLocaleString()}{" "}
                {t("common.currency")}
              </p>
            </div>
            <button
              className={scss.removeBtn}
              onClick={() => handleRemove(item._id)}
              title={t("client.cart.remove")}
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      <div className={scss.summary}>
        <div className={scss.total}>
          <span>{t("client.cart.total")}:</span>
          <span className={scss.totalPrice}>
            {totalPrice.toLocaleString()} {t("common.currency")}
          </span>
        </div>
        <Button
          variant="contained"
          size="large"
          onClick={handleCheckout}
          className={scss.checkoutBtn}
        >
          {t("client.cart.checkout")}
        </Button>
      </div>

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

export default Cart;
