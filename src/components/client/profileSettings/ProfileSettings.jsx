import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/AuthProvider";
import { FiUser, FiMail, FiLock, FiSave } from "react-icons/fi";
import {
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import scss from "./ProfileSettings.module.scss";

const ProfileSettings = () => {
  const { t } = useTranslation();
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({
        displayName: formData.displayName,
      });
      setSnackbar({
        open: true,
        message: t("client.settings.profileUpdated"),
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: t("common.error"),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: t("auth.passwordTooShort"),
        severity: "error",
      });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setSnackbar({
        open: true,
        message: t("auth.passwordTooShort"),
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      setSnackbar({
        open: true,
        message: t("client.settings.passwordChanged"),
        severity: "success",
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: t("common.error"),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div className={scss.settings}>
      <h2>{t("client.settings.title")}</h2>

      <div className={scss.section}>
        <h3>{t("client.settings.basicInfo")}</h3>
        <form onSubmit={handleProfileSubmit} className={scss.form}>
          <TextField
            fullWidth
            label={t("client.settings.name")}
            name="displayName"
            value={formData.displayName}
            onChange={handleProfileChange}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiUser color="var(--primary)" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
                backgroundColor: "var(--input-bg)",
              },
            }}
          />

          <TextField
            fullWidth
            label={t("client.settings.email")}
            name="email"
            value={formData.email}
            disabled
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiMail color="var(--primary)" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
                backgroundColor: "var(--image-placeholder-bg)",
              },
            }}
          />
          <small className={scss.hint}>
            {t("client.settings.emailCannotBeChanged")}
          </small>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={<FiSave />}
            sx={{
              borderRadius: "40px",
              padding: "12px 28px",
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              backgroundColor: "var(--primary)",
              width: "fit-content",
            }}
          >
            {loading ? t("common.loading") : t("client.settings.save")}
          </Button>
        </form>
      </div>

      <div className={scss.section}>
        <h3>{t("client.settings.changePassword")}</h3>
        <form onSubmit={handlePasswordSubmit} className={scss.form}>
          <TextField
            fullWidth
            label={t("client.settings.currentPassword")}
            name="currentPassword"
            type={showPassword.current ? "text" : "password"}
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiLock color="var(--primary)" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("current")}
                    edge="end"
                  >
                    {showPassword.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
                backgroundColor: "var(--input-bg)",
              },
            }}
          />

          <TextField
            fullWidth
            label={t("client.settings.newPassword")}
            name="newPassword"
            type={showPassword.new ? "text" : "password"}
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiLock color="var(--primary)" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("new")}
                    edge="end"
                  >
                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
                backgroundColor: "var(--input-bg)",
              },
            }}
          />

          <TextField
            fullWidth
            label={t("client.settings.confirmPassword")}
            name="confirmPassword"
            type={showPassword.confirm ? "text" : "password"}
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiLock color="var(--primary)" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("confirm")}
                    edge="end"
                  >
                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
                backgroundColor: "var(--input-bg)",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={<FiLock />}
            sx={{
              borderRadius: "40px",
              padding: "12px 28px",
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              backgroundColor: "var(--primary)",
              width: "fit-content",
            }}
          >
            {loading ? t("common.loading") : t("client.settings.save")}
          </Button>
        </form>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProfileSettings;
