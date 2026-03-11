import React, { createContext, useContext, useState, useEffect } from "react";

const ReviewContext = createContext();

export const useReviews = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const savedReviews = localStorage.getItem("clinic_reviews");
  //   if (savedReviews) {
  //     setReviews(JSON.parse(savedReviews));
  //   } else {
  //     // Добавляем тестовые отзывы если localStorage пуст
  //     const demoReviews = [
  //       {
  //         id: 1,
  //         patientName: "Анна Петрова",
  //         clinicName: "Dental Clinic - Главный",
  //         rating: 5,
  //         text: "Отличная клиника! Врачи профессионалы, всё чисто и современно.",
  //         date: "2024-02-15",
  //       },
  //       {
  //         id: 2,
  //         patientName: "Иван Сидоров",
  //         clinicName: "Dental Clinic - ЦУМ",
  //         rating: 4,
  //         text: "Хорошее обслуживание, вежливый персонал.",
  //         date: "2024-02-10",
  //       },
  //       {
  //         id: 3,
  //         patientName: "Мария Иванова",
  //         clinicName: "Dental Clinic - Юг",
  //         rating: 5,
  //         text: "Лечила зубы, очень понравилось. Врач всё подробно объяснил.",
  //         date: "2024-02-05",
  //       },
  //     ];
  //     setReviews(demoReviews);
  //     localStorage.setItem("clinic_reviews", JSON.stringify(demoReviews));
  //   }
  // }, []);
  useEffect(() => {
    const storedReviews = localStorage.getItem("clinic_reviews");
    setReviews(JSON.parse(storedReviews));
    setLoading(false);
  }, []);

  const addReview = (newReview) => {
    try {
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem("clinic_reviews", JSON.stringify(updatedReviews));
      return true;
    } catch (error) {
      console.error("Ошибка добавления отзыва:", error);
      return false;
    }
  };

  const deleteReview = (reviewId) => {
    try {
      const updatedReviews = reviews.filter((r) => r.id !== reviewId);
      setReviews(updatedReviews);
      localStorage.setItem("clinic_reviews", JSON.stringify(updatedReviews));
      return true;
    } catch (error) {
      console.error("Ошибка удаления отзыва:", error);
      return false;
    }
  };

  const getReviewsByClinic = (clinicName) => {
    return reviews.filter((r) => r.clinicName === clinicName);
  };

  const getAverageRating = (clinicName) => {
    const clinicReviews = reviews.filter((r) => r.clinicName === clinicName);
    if (clinicReviews.length === 0) return 0;
    const sum = clinicReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / clinicReviews.length).toFixed(1);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        loading,
        addReview,
        deleteReview,
        getReviewsByClinic,
        getAverageRating,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
