import axios from "axios";

const TELEGRAM_TOKEN = "8211175619:AAEITSb1Z95fl4N1VEndbCaUikqFeyvwrac";
const CHAT_ID = "5946461741"; // можно массив, если хотите отправлять разным врачам

export const sendToTelegram = async (data) => {
  let message = "";

  if (data.type === "order") {
    // Новый заказ из магазина
    message = `
🛍️ *НОВЫЙ ЗАКАЗ*
👤 *Клиент:* ${data.displayName}
📞 *Телефон:* ${data.phone}
📍 *Адрес:* ${data.address || "Не указан"}

📦 *Товары:*
${data.items.map(item => `• ${item.name} - ${item.quantity} шт. - ${item.price} сом`).join('\n')}

💰 *Общая сумма:* ${data.total} сом
💳 *Способ оплаты:* ${data.paymentMethod || "Не указан"}
🚚 *Доставка:* ${data.deliveryMethod || "Самовывоз"}

📝 *Комментарий:* ${data.comment || "Нет"}
    `;
  } else if (data.statusUpdate) {
    // Обновление статуса записи
    message = `
🔄 *Статус записи изменён*
👤 *Клиент:* ${data.displayName}
🦷 *Врач:* ${data.doctorName}
📆 *Дата:* ${data.date}
⏰ *Время:* ${data.time}
📌 *Новый статус:* ${data.status === "confirmed" ? "✅ Подтверждено" : "❌ Отменено"}
    `;
  } else {
    // Новая запись к врачу
    message = `
📅 *Новая запись к врачу*
👤 *Клиент:* ${data.displayName}
📞 *Телефон:* ${data.phone}
🦷 *Врач:* ${data.doctorName}
📆 *Дата:* ${data.date}
⏰ *Время:* ${data.time}
📝 *Причина:* ${data.reason || "Не указана"}
    `;
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      },
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
    throw error;
  }
};