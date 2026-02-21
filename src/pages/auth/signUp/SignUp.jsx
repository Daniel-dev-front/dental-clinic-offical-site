import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import scss from "./SignUp.module.scss";
import { useAuth } from "../../../context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { IoIosCloseCircleOutline } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Login from "../login/Login";

const SignUp = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const { register, loginWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState("signup");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length > 0 && password.length < 6) {
      setError(t("auth.passwordTooShort"));
      return;
    }
    try {
      const isAdmin = adminCode === "ADMIN123";
      await register(name, email, password, isAdmin);
      setName("");
      setEmail("");
      setPassword("");
      setAdminCode("");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    await loginWithGoogle();
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <div>
      {isOpen && (
        <div id={scss.register} onClick={() => setIsOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className={scss.content}>
            <span>
              <button className={scss.close} onClick={() => setIsOpen(false)}>
                <IoIosCloseCircleOutline color="#fff" size={28} />
              </button>
            </span>

            {authMode === "signup" ? (
              <div className={scss.sign_up}>
                <div className={scss.sign_text}>
                  <span>
                    <h2>{t("auth.createAccount")}</h2>
                    <h5>{t("auth.enterDetails")}</h5>
                  </span>
                  <form onSubmit={handleSubmit}>
                    <input
                      className={scss.input}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      placeholder={t("auth.name")}
                      required
                    />
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
                        fontFamily: "inter",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "300px",
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "20px",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
                      }}
                      variant="standard"
                    >
                      <Input
                        disableUnderline
                        type={showPassword ? "text" : "password"}
                        placeholder={t("auth.password")}
                        required
                        minLength="6"
                        sx={{
                          paddingLeft: "10px",
                          fontWeight: "500",
                          fontSize: "14px",
                          width: "100%",
                          height: "100%",
                          borderRadius: "20px",
                          color: "#00000099",
                        }}
                        endAdornment={
                          <InputAdornment position="start">
                            <IconButton
                              aria-label={
                                showPassword
                                  ? "hide the password"
                                  : "display the password"
                              }
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff sx={{ fontSize: "20px" }} />
                              ) : (
                                <Visibility sx={{ fontSize: "20px" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "inter",
                        marginLeft: "5px",
                      }}
                    >
                      {error}
                    </p>
                    <div className={scss.sign_inGoogle}>
                      <div className={scss.google}>
                        <button className={scss.create} type="submit">
                          {t("auth.createAccount")}
                        </button>
                        <button onClick={handleGoogleSignUp}>
                          <FcGoogle size={20} />
                          {t("auth.loginWithGoogle")}
                        </button>
                      </div>
                      <div className={scss.login}>
                        <p>{t("auth.alreadyHaveAccount")}</p>
                        <button onClick={() => setAuthMode("login")}>
                          {t("auth.login")}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <Login
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onSwitchToSignUp={() => setAuthMode("signup")}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
