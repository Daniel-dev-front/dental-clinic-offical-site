import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import scss from "./Store.module.scss";
import { Alert, Snackbar } from "@mui/material";
import { useProduct } from "../../context/MainContext";
import {
  FiClock,
  FiDollarSign,
  FiSearch,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";

const Store = () => {
  const { t } = useTranslation();
  const { product, readProduct, addWishlist, addCart } = useProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const categories = [
    t("store.all"),
    ...new Set(product.map((p) => p.category).filter(Boolean)),
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Гигиена: "#10b981",
      Инструменты: "#3b82f6",
      Аксессуары: "#8b5cf6",
      "Средства по уходу": "#f59e0b",
      Оборудование: "#ec4899",
      Другое: "#6b7280",
    };
    return colors[category] || "#6b7280";
  };

  useEffect(() => {
    readProduct();
  }, []);

  const filteredProducts = product.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === t("store.all") || selectedCategory === "all"
        ? true
        : item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = async (item) => {
    await addCart(item);
    setSnackbar({
      open: true,
      message: `${t("store.addToCart")}: ${item.name}`,
      severity: "success",
    });
  };

  const handleAddToWishlist = async (item) => {
    await addWishlist(item);
    setSnackbar({
      open: true,
      message: `${t("store.addToWishlist")}: ${item.name}`,
      severity: "success",
    });
  };

  return (
    <section className="container">
      <div className={scss.content_all}>
        <div className={scss.content_header}>
          <h1>{t("store.title")}</h1>
          <div className={scss.searchBar}>
            <FiSearch className={scss.searchIcon} />
            <input
              type="text"
              placeholder={t("store.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={scss.categories}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${scss.categoryBtn} ${
                selectedCategory === category ||
                (selectedCategory === "all" && category === t("store.all"))
                  ? scss.active
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  category === t("store.all") ? "all" : category,
                )
              }
              style={
                category !== t("store.all") && category !== "all"
                  ? { backgroundColor: getCategoryColor(category) + "20" }
                  : {}
              }
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className={scss.empty}>
            <h3>{t("store.notFound")}</h3>
          </div>
        ) : (
          <div className={scss.grid}>
            {filteredProducts.map((item) => (
              <div key={item._id} className={scss.card}>
                {item.category && (
                  <div
                    className={scss.categoryBadge}
                    style={{ backgroundColor: getCategoryColor(item.category) }}
                  >
                    {item.category}
                  </div>
                )}

                {item.img && (
                  <div className={scss.image}>
                    <img src={item.img} alt={item.name} />
                  </div>
                )}

                <div className={scss.content}>
                  <h3>{item.name}</h3>

                  <div className={scss.details}>
                    {item.price && (
                      <div className={scss.detail}>
                        <FiDollarSign /> {item.price} {t("common.currency")}
                      </div>
                    )}
                  </div>

                  {item.description && (
                    <p className={scss.description}>{item.description}</p>
                  )}

                  <div className={scss.actions}>
                    <button
                      className={scss.cartBtn}
                      onClick={() => handleAddToCart(item)}
                      title={t("store.addToCart")}
                    >
                      <FiShoppingCart />
                    </button>
                    <button
                      className={scss.wishlistBtn}
                      onClick={() => handleAddToWishlist(item)}
                      title={t("store.addToWishlist")}
                    >
                      <FiHeart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </section>
  );
};

export default Store;
