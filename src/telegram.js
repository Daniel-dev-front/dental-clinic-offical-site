import axios from "axios";

const TELEGRAM_TOKEN = "8211175619:AAEITSb1Z95fl4N1VEndbCaUikqFeyvwrac";
const CHAT_ID = "5946461741"; // можно массив, если хотите отправлять разным врачам

export const sendToTelegram = async (data) => {
  let message = "";

  if (data.statusUpdate) {
    message = `
🔄 *Статус записи изменён*
👤 *Клиент:* ${data.displayName}
🦷 *Врач:* ${data.doctorName}
📆 *Дата:* ${data.date}
⏰ *Время:* ${data.time}
📌 *Новый статус:* ${data.status === "confirmed" ? "✅ Подтверждено" : "❌ Отменено"}
    `;
  } else {
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
