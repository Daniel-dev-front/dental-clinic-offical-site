import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaCalendarAlt } from "react-icons/fa";
import scss from "./ClientDashboard.module.scss";
import { useAuth } from "../../../context/AuthProvider";
import { useProduct } from "../../../context/MainContext";

const ClientDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    wishlist,
    cart,
    appointments,
    readWishlist,
    readCart,
    readAppointments,
  } = useProduct();
  const navigate = useNavigate();

  const goWishlist = () => {
    navigate("/profile/wishlist");
    window.scrollTo(0, 0);
  };

  const goCart = () => {
    navigate("/profile/cart");
    window.scrollTo(0, 0);
  };

  const goAppointments = () => {
    navigate("/profile/appointments");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    readWishlist();
    readCart();
    readAppointments();
  }, []);

  return (
    <div className={scss.dashboard}>
      <h2>
        {t("client.dashboard.welcome")}, {user?.displayName || user?.email}!
      </h2>

      <div className={scss.stats}>
        <div onClick={goWishlist} className={scss.statCard}>
          <FaHeart className={scss.icon} style={{ color: "#ef4444" }} />
          <span className={scss.value}>{wishlist.length}</span>
          <span className={scss.label}>{t("client.dashboard.inWishlist")}</span>
        </div>
        <div onClick={goCart} className={scss.statCard}>
          <FaShoppingCart className={scss.icon} style={{ color: "#3b82f6" }} />
          <span className={scss.value}>{cart.length}</span>
          <span className={scss.label}>{t("client.dashboard.inCart")}</span>
        </div>
        <div onClick={goAppointments} className={scss.statCard}>
          <FaCalendarAlt className={scss.icon} style={{ color: "#8b5cf6" }} />
          <span className={scss.value}>{appointments.length}</span>
          <span className={scss.label}>
            {t("client.dashboard.appointments")}
          </span>
        </div>
      </div>

      <div className={scss.quickLinks}>
        <Link to="/profile/wishlist" className={scss.quickLinkCard}>
          <FaHeart className={scss.icon} />
          <span>{t("client.dashboard.wishlist")}</span>
        </Link>
        <Link to="/profile/cart" className={scss.quickLinkCard}>
          <FaShoppingCart className={scss.icon} />
          <span>{t("client.dashboard.cart")}</span>
        </Link>
        <Link to="/profile/appointments" className={scss.quickLinkCard}>
          <FaCalendarAlt className={scss.icon} />
          <span>{t("client.dashboard.myAppointments")}</span>
        </Link>
      </div>
    </div>
  );
};

export default ClientDashboard;
