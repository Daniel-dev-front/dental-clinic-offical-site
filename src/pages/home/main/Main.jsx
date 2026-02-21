import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import scss from "./Main.module.scss";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { useAuth } from "../../../context/AuthProvider";

const Main = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <section id="contentMain">
      <div className="container">
        <div className={scss.content}>
          <h1>{t("home.main.title")}</h1>
          <div className={scss.text}>
            <h2>
              <Typewriter
                options={{
                  strings: [
                    t("home.main.features.painless"),
                    t("home.main.features.modern"),
                    t("home.main.features.guarantee"),
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 80,
                }}
              />
            </h2>
          </div>
          {!user && (
            <button
              onClick={() => {
                setSnackbar({
                  open: true,
                  message: t("auth.loginPrompt"),
                  severity: "warning",
                });
              }}
            >
              {t("home.main.bookButton")}
            </button>
          )}
          {user && (
            <button onClick={() => navigate("/services")}>
              {t("home.main.bookButton")}
            </button>
          )}

          <div className={scss.dop_info}>
            <div className={scss.info}>
              <span className={scss.like}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10V20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V12C2 11.4696 2.21071 10.9609 2.58579 10.5858C2.96086 10.2107 3.46957 10 4 10H7Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M7 10L10.02 3.75C10.1 3.599 10.2108 3.46876 10.345 3.36747C10.4792 3.26618 10.6331 3.19752 10.7973 3.16675C10.9616 3.13598 11.1313 3.14392 11.2918 3.18983C11.4523 3.23574 11.5994 3.31828 11.722 3.43L12 3.707C12.3779 4.0849 12.596 4.59912 12.6 5.136L12.72 10H18.5C19.0304 10 19.5391 10.2107 19.9142 10.5858C20.2893 10.9609 20.5 11.4696 20.5 12L19.5 18C19.3366 18.8883 18.8918 19.6896 18.2324 20.2864C17.5729 20.8832 16.7382 21.242 15.85 21.3H10L7 18V10Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
              <p>{t("home.main.features.painless")}</p>
            </div>
            <div className={scss.info}>
              <span className={scss.new}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 11V14"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M16 11V14"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M7 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V15C19 15.5304 18.7893 16.0391 18.4142 16.4142C18.0391 16.7893 17.5304 17 17 17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15V7C5 6.46957 5.21071 5.96086 5.58579 5.58579C5.96086 5.21071 6.46957 5 7 5Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 17V20"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 3V5"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M9 20H15"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M8 8H9"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M15 8H16"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
              <p>{t("home.main.features.modern")}</p>
            </div>
            <div className={scss.info}>
              <span className={scss.check}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12L10 17L20 7"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
              <p>{t("home.main.features.guarantee")}</p>
            </div>
          </div>
        </div>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            style={{ borderRadius: "24px" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
};

export default Main;
