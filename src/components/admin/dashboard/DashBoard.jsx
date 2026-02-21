import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProduct } from "../../../context/MainContext";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiPlusCircle, FiEye, FiEdit } from "react-icons/fi";
import { FaTooth, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import scss from "./DashBoard.module.scss";

const DashBoard = () => {
  const { t } = useTranslation();
  const {
    product,
    doctors,
    readProduct,
    readDoctors,
    readAppointments,
    readServices,
    deleteProduct,
    service,
    appointments,
  } = useProduct();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    readProduct();
    readDoctors();
    readAppointments();
    readServices();
  }, []);

  const latestProducts = product.slice(-3).reverse();

  const stats = [
    {
      link: "/admin/allMaterials",
      label: t("admin.dashboard.products"),
      value: product.length,
      icon: <FiPackage />,
      color: "#4d7cff",
    },
    {
      link: "/admin/doctors",
      label: t("admin.dashboard.doctors"),
      value: doctors.length,
      icon: <FaTooth />,
      color: "#9b59b6",
    },
    {
      link: "/admin/allServices",
      label: t("admin.dashboard.services"),
      value: service.length,
      icon: <FaBoxOpen />,
      color: "#3498db",
    },
    {
      link: "/admin/appointments",
      label: t("admin.dashboard.appointments"),
      value: appointments.length,
      icon: <FaClipboardList />,
      color: "#e67e22",
    },
  ];

  return (
    <div className={scss.dashboard}>
      <div className={scss.welcome}>
        <h2>
          {t("admin.dashboard.welcome")},{" "}
          {isAdmin ? t("admin.dashboard.admin") : user?.displayName}!
        </h2>
      </div>

      <div className={scss.stats}>
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={scss.statCard}
            style={{ "--stat-color": stat.color, cursor: "pointer" }}
            onClick={() => navigate(stat.link)}
          >
            <div className={scss.statIcon}>{stat.icon}</div>
            <div className={scss.statContent}>
              <span className={scss.statValue}>{stat.value}</span>
              <span className={scss.statLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {latestProducts.length > 0 && (
        <div className={scss.section}>
          <h3>{t("admin.dashboard.latestProducts")}</h3>
          <div className={scss.productGrid}>
            {latestProducts.map((item) => (
              <div key={item.id} className={scss.productCard}>
                <div className={scss.productImage}>
                  {item.img ? (
                    <img src={item.img} alt={item.name} />
                  ) : (
                    <div className={scss.placeholder}>
                      {t("admin.dashboard.noPhoto")}
                    </div>
                  )}
                </div>
                <div className={scss.productInfo}>
                  <h4>{item.name}</h4>
                  <p className={scss.price}>
                    {item.price} {t("common.currency")}
                  </p>
                  <div className={scss.cardActions}>
                    <button
                      onClick={() => navigate(`/admin/editMaterial/${item.id}`)}
                      title={t("common.edit")}
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/productDetail/${item.id}`)
                      }
                      title={t("common.view")}
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => deleteProduct(item._id)}
                      title={t("common.delete")}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={scss.quickActions}>
        <button onClick={() => navigate("/admin/addMaterial")}>
          <FiPlusCircle /> {t("admin.dashboard.addProduct")}
        </button>
        <button onClick={() => navigate("/admin/addServices")}>
          <FiPlusCircle /> {t("admin.dashboard.addService")}
        </button>
        <button onClick={() => navigate("/admin/allServices")}>
          <FaClipboardList /> {t("admin.dashboard.allAppointments")}
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
