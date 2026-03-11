import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar, FaUserCircle, FaTrash } from "react-icons/fa";
import scss from "./Review.module.scss";
import { useReviews } from "../../../context/ReviewContext";
import { useAuth } from "../../../context/AuthProvider";

const Reviews = ({ clinicName }) => {
  const { t } = useTranslation();
  const { reviews, addReview, deleteReview, getAverageRating } = useReviews();
  const { user, isAdmin } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: "" });

  const clinicReviews = reviews.filter((r) => r.clinicName === clinicName);
  const averageRating = getAverageRating(clinicName);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      patientName: user?.displayName || user?.email || t("common.anonymous"),
      clinicName,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split("T")[0],
      avatar: user?.photoURL,
      userId: user?.uid,
    };
    addReview(review);
    setNewReview({ rating: 5, text: "" });
    setShowForm(false);
  };

  return (
    <section className="container">
      <div className={scss.reviewsSection}>
        <h1>{t("about.reviews.title", { name: clinicName })}</h1>
        {!user ? (
          <p className={scss.loginPrompt}>{t("about.reviews.loginPrompt")}</p>
        ) : (
          <div>
            <div className={scss.header}>
              <h2>{t("about.reviews.alreadyVisited")}</h2>
              <p>{t("about.reviews.share")}</p>
              {clinicReviews.length > 0 && (
                <div className={scss.ratingSummary}>
                  <div className={scss.stars}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={
                          i < Math.round(averageRating) ? "#ffb800" : "#e0e0e0"
                        }
                      />
                    ))}
                  </div>
                  <span className={scss.average}>{averageRating}</span>
                  <span className={scss.total}>
                    ({clinicReviews.length} {t("common.reviews")})
                  </span>
                </div>
              )}
            </div>

            {user && !showForm && (
              <button className={scss.addBtn} onClick={() => setShowForm(true)}>
                {t("about.reviews.leaveReview")}
              </button>
            )}

            {showForm && (
              <form onSubmit={handleSubmit} className={scss.reviewForm}>
                <h4>{t("about.reviews.yourReview")}</h4>
                <div className={scss.ratingInput}>
                  <label>{t("about.reviews.rating")}:</label>
                  <div className={scss.starsInput}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        color={star <= newReview.rating ? "#ffb800" : "#e0e0e0"}
                        onClick={() =>
                          setNewReview({ ...newReview, rating: star })
                        }
                        className={scss.star}
                      />
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder={t("about.reviews.yourReview")}
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                  required
                  rows="4"
                />
                <div className={scss.formButtons}>
                  <button type="submit" className={scss.submitBtn}>
                    {t("about.reviews.submit")}
                  </button>
                  <button
                    type="button"
                    className={scss.cancelBtn}
                    onClick={() => setShowForm(false)}
                  >
                    {t("about.reviews.cancel")}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
        <div className={scss.reviewsList}>
          {clinicReviews.length === 0 ? (
            <p className={scss.noReviews}>{t("about.reviews.noReviews")}</p>
          ) : (
            clinicReviews.map((review) => (
              <div key={review.id} className={scss.reviewCard}>
                <div className={scss.reviewHeader}>
                  <div className={scss.userInfo}>
                    <FaUserCircle className={scss.avatarIcon} />
                    <div>
                      <h4>{review.patientName}</h4>
                      <span className={scss.date}>{review.date}</span>
                    </div>
                  </div>
                  <div className={scss.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < review.rating ? "#ffb800" : "#e0e0e0"}
                      />
                    ))}
                  </div>
                  {(isAdmin || review.userId === user?.uid) && (
                    <button
                      className={scss.deleteBtn}
                      onClick={() => deleteReview(review.id)}
                      title={t("common.delete")}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <p className={scss.reviewText}>{review.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
