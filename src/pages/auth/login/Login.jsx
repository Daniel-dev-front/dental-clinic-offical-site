import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import scss from "./Login.module.scss";
import { useAuth } from "../../../context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ onSwitchToSignUp }) => {
  const { t } = useTranslation();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(t("auth.error"));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={scss.sign_up}>
      <div className={scss.sign_text}>
        <span>
          <h2>{t("auth.login")}</h2>
          <h5>{t("auth.welcomeBack")}</h5>
        </span>

        <form onSubmit={handleSubmit}>
          <div className={scss.inputs}>
            <input
              className={scss.input}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder={t("auth.email")}
              required
            />

            <FormControl
              sx={{
                fontWeight: "500",
                height: "40px",
                width: "300px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "20px",
              }}
              variant="standard"
            >
              <Input
                disableUnderline
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.password")}
                required
                sx={{
                  paddingLeft: "10px",
                  fontWeight: "500",
                  fontSize: "14px",
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                }}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </div>
          {error && <p className={scss.error}>{error}</p>}

          <div className={scss.sign_inGoogle}>
            <div className={scss.google}>
              <button className={scss.create} type="submit">
                {t("auth.login")}
              </button>
              <button type="button" onClick={handleGoogleLogin}>
                <FcGoogle size={20} />
                {t("auth.loginWithGoogle")}
              </button>
            </div>

            <div className={scss.login}>
              <p>{t("auth.alreadyHaveAccount")}</p>
              <button className={scss.linkBtn} onClick={onSwitchToSignUp}>
                {t("auth.register")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
