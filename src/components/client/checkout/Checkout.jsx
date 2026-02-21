import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaComment,
  FaTruck,
  FaMoneyBill,
} from "react-icons/fa";
import { Snackbar, Alert } from "@mui/material";
import scss from "./Checkout.module.scss";
import { useProduct } from "../../../context/MainContext";
import { useAuth } from "../../../context/AuthProvider";
import { sendToTelegram } from "../../../telegram";

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, totalPrice, clearAll } = useProduct();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    phone: user?.phoneNumber || "",
    address: "",
    paymentMethod: "cash",
    deliveryMethod: "pickup",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      type: "order",
      displayName: formData.displayName,
      phone: formData.phone,
      address: formData.address,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: totalPrice,
      paymentMethod: formData.paymentMethod === "cash" ? "Наличные" : "Карта",
      deliveryMethod: formData.deliveryMethod === "pickup" ? "Самовывоз" : "Доставка",
      comment: formData.comment,
    };

    try {
      // Отправляем уведомление в Telegram
      await sendToTelegram(orderData);
      
      // Очищаем корзину
      await clearAll();
      
      setSnackbar({
        open: true,
        message: t('checkout.success'),
        severity: "success",
      });
      
      setTimeout(() => navigate("/profile/cart"), 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: t('checkout.error'),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className={scss.empty}>
        <h2>{t('cart.empty')}</h2>
        <button onClick={() => navigate("/store")}>
          {t('cart.goToStore')}
        </button>
      </div>
    );
  }

  return (
    <div className={scss.checkout}>
      <h2>{t('checkout.title')}</h2>
      
      <div className={scss.content}>
        <div className={scss.orderSummary}>
          <h3>{t('checkout.orderSummary')}</h3>
          <div className={scss.itemsList}>
            {cart.map((item) => (
              <div key={item._id} className={scss.item}>
                <span className={scss.itemName}>{item.name}</span>
                <span className={scss.itemQuantity}>{item.quantity} x</span>
                <span className={scss.itemPrice}>{item.price} сом</span>
              </div>
            ))}
          </div>
          <div className={scss.total}>
            <span>{t('cart.total')}:</span>
            <span className={scss.totalPrice}>{totalPrice} сом</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={scss.form}>
          <div className={scss.formGroup}>
            <label>
              <FaUser /> {t('checkout.name')} *
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={scss.formGroup}>
            <label>
              <FaPhone /> {t('checkout.phone')} *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={scss.formGroup}>
            <label>
              <FaMapMarkerAlt /> {t('checkout.address')}
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className={scss.formRow}>
            <div className={scss.formGroup}>
              <label>{t('checkout.paymentMethod')}</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="cash">{t('checkout.cash')}</option>
                <option value="card">{t('checkout.card')}</option>
              </select>
            </div>

            <div className={scss.formGroup}>
              <label>{t('checkout.deliveryMethod')}</label>
              <select
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleChange}
              >
                <option value="pickup">{t('checkout.pickup')}</option>
                <option value="delivery">{t('checkout.delivery')}</option>
              </select>
            </div>
          </div>

          <div className={scss.formGroup}>
            <label>
              <FaComment /> {t('checkout.comment')}
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button 
            type="submit" 
            className={scss.submitBtn}
            disabled={loading}
          >
            {loading ? t('common.loading') : t('checkout.submit')}
          </button>
        </form>
      </div>

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

export default Checkout;