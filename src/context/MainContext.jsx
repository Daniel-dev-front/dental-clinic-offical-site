import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { sendToTelegram } from "../telegram";
const productContext = createContext();
export const useProduct = () => useContext(productContext);

const MainContext = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [service, setService] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  const [counts, setCounts] = useState(() => {
    const saved = localStorage.getItem("orderCounts");
    return saved ? JSON.parse(saved) : {};
  });
  const filterProducts = product.filter((data) =>
    data.name?.toLowerCase().includes((search || "").toLowerCase()),
  );
  const increase = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrease = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) > 1 ? prev[id] - 1 : +1,
    }));
  };
  useEffect(() => {
    localStorage.setItem("orderCounts", JSON.stringify(counts));
  }, [counts]);

  const API = "https://api-crud.elcho.dev/api/v1/f27f8-d3803-495c5/dentaStore"; // магазин товаров
  const WISHLIST =
    "https://api-crud.elcho.dev/api/v1/ef272-abc2a-6ce34/dentaWishlist"; // избранное услуг и товаров
  const CART = "https://api-crud.elcho.dev/api/v1/9e84a-1e80d-fc02f/dentaCart";
  const SERVICES =
    "https://api-crud.elcho.dev/api/v1/0fee7-150df-21ce2/dentaService"; // сами услуги
  const DOCTORS =
    "https://api-crud.elcho.dev/api/v1/aa371-80981-9b459/dentaDoctors"; // Доктора
  const APPOINTMENTS_API =
    "https://api-crud.elcho.dev/api/v1/f68a8-b3fc9-4b0e5/appointments";
  async function addProduct(newProduct) {
    // добавление товара в магазин
    await axios.post(API, newProduct);
    readProduct();
  }
  async function readProduct() {
    // чтение этого товара
    const { data } = await axios.get(`${API}?per_page=100`);
    setProduct(data.data);
  }

  async function deleteProduct(_id) {
    await axios.delete(`${API}/${_id}`);
    readProduct();
  }
  async function addService(newService) {
    // добавление услуги
    await axios.post(SERVICES, newService);
    readServices();
  }
  async function readServices() {
    // чтение услуг
    const { data } = await axios.get(`${SERVICES}?per_page=100`);
    setService(data.data);
  }

  async function deleteService(id) {
    // удаление услуги
    await axios.delete(`${SERVICES}/${id}`);
    readServices();
  }

  async function addAppointment(newAppointment) {
    try {
      const response = await axios.post(APPOINTMENTS_API, newAppointment);

      sendToTelegram(newAppointment).catch((err) =>
        console.error("Telegram send error:", err),
      );

      await readAppointments();

      return response.data;
    } catch (error) {
      console.error("Ошибка при создании записи:", error);
      throw error;
    }
  }
  async function readAppointments() {
    try {
      const { data } = await axios.get(`${APPOINTMENTS_API}?per_page=100`);
      setAppointments(data.data || []);
    } catch (error) {
      console.error("Ошибка при загрузке записей:", error);
    }
  }

  async function deleteAppointment(id) {
    try {
      await axios.delete(`${APPOINTMENTS_API}/${id}`);
      await readAppointments(); // обновляем список
    } catch (error) {
      console.error("Ошибка при удалении записи:", error);
      throw error;
    }
  }

  async function updateAppointment(id, updatedData) {
    // Обновляем в базе
    const response = await axios.patch(
      `${APPOINTMENTS_API}/${id}`,
      updatedData,
    );

    // Если статус изменился, отправляем уведомление
    if (updatedData.status) {
      const appointment = appointments.find((a) => a._id === id);
      try {
        await sendToTelegram({
          ...appointment,
          ...updatedData,
          statusUpdate: true,
        });
      } catch (error) {
        console.error("❌ Ошибка отправки статуса в Telegram:", error);
      }
    }

    readAppointments();
    return response.data;
  }
  async function updateProduct(id, updatedProduct) {
    try {
      await axios.patch(`${API}/${id}`, updatedProduct);
      await readProduct();
      console.log("Товар успешно обновлён");
    } catch (error) {
      console.error("Ошибка при обновлении товара:", error.message);
      throw error.message;
    }
  }
  async function updateDoctor(id, updatedData) {
    try {
      await axios.patch(`${DOCTORS}/${id}`, updatedData);
      await readDoctors();
      console.log("✅ Данные врача обновлены");
    } catch (error) {
      console.error("❌ Ошибка обновления врача:", error);
      throw error;
    }
  }
  async function updateService(id, updatedData) {
    try {
      await axios.patch(`${SERVICES}/${id}`, updatedData);
      await readServices();
      console.log("✅ Данные услуги обновлены");
    } catch (error) {
      console.error("Ошибка при обновлении услуги:", error);
      throw error;
    }
  }

  async function addDoctors(newDoctors) {
    // добавление товара в магазин
    await axios.post(DOCTORS, newDoctors);
    readDoctors();
  }
  async function readDoctors() {
    // чтение этого товара
    const { data } = await axios.get(`${DOCTORS}?per_page=100`);
    setDoctors(data.data);
  }

  async function deleteDoctors(id) {
    // удаление товара
    await axios.delete(`${DOCTORS}/${id}`);
    readDoctors();
  }
  const clearAll = async () => {
    // стереть корзину
    try {
      await axios.delete(CART);
      setCart([]);
      console.log("Корзина успешно очищена в БД");
    } catch (error) {
      console.error("Ошибка при очистке корзины:", error);
    }
  };

  async function addWishlist(newWishlist) {
    // добавление избранное
    await axios.post(WISHLIST, newWishlist);
    readWishlist();
  }
  async function readWishlist() {
    // публикация избранное
    const { data } = await axios.get(`${WISHLIST}?per_page=100`);
    setWishlist(data.data);
  }
  async function deleteWishlist(id) {
    // удаленние избронное
    await axios.delete(`${WISHLIST}/${id}`);
    readWishlist();
  }
  // async function addCart(newCart) {
  //   await axios.post(CART_API, newCart);
  //   readCart();
  // }
  async function addCart(newCart) {
    // добавление в корзину
    try {
      const response = await axios.get(CART);
      const cartArray = response.data.data || [];
      const incomingId = newCart._id || newCart.id;
      const existingItem = cartArray.find(
        (item) => item.originalId === newCart._id,
      );

      if (existingItem) {
        await axios.patch(`${CART}/${existingItem._id}`, {
          quantity: Number(existingItem.quantity || 1) + 1,
        });
        console.log("Количество обновлено");
      } else {
        const itemToAdd = {
          ...newCart,
          originalId: incomingId,
          quantity: 1,
        };

        delete itemToAdd._id;
        delete itemToAdd.id;

        await axios.post(CART, itemToAdd);
        console.log("Товар добавлен");
      }

      readCart();
    } catch (error) {
      console.error(
        "Детальная ошибка API:",
        error.response?.data || error.message,
      );
    }
  }
  const updateQuantity = async (cartItem, delta) => {
    const newQty = (cartItem.quantity || 1) + delta;
    if (newQty < 1) return;

    try {
      await axios.patch(`${CART}/${cartItem._id}`, { quantity: newQty });
      readCart();
    } catch (error) {
      console.error("Ошибка обновления:", error);
    }
  };
  async function readCart() {
    // публикация корзины(данные)
    const { data } = await axios.get(`${CART}?per_page=100`);
    setCart(data.data);
  }
  async function deleteCart(id) {
    // удаленние корзины (1х)
    await axios.delete(`${CART}/${id}`);
    readCart();
  }
  const totalPrice = cart.reduce((sum, item) => {
    // общяя цена
    const itemTotal = item.price * item.quantity;
    return sum + itemTotal;
  }, 0);

  const values = {
    filterProducts,
    addProduct,
    readProduct,
    deleteProduct,
    addDoctors,
    readDoctors,
    doctors,
    deleteDoctors,
    product,
    addCart,
    readCart,
    deleteCart,
    updateQuantity,
    clearAll,
    cart,
    updateProduct,
    addWishlist,
    readWishlist,
    deleteWishlist,
    wishlist,
    totalPrice,
    increase,
    decrease,
    counts,
    appointments,
    addAppointment,
    readAppointments,
    deleteAppointment,
    updateAppointment,
    addService,
    readServices,
    deleteService,
    service,
    updateDoctor,
    updateService,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default MainContext;
