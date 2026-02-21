import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaLanguage } from "react-icons/fa";
import scss from "./LanguageSwitcher.module.scss";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const languages = [
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "kg", name: "Кыргызча", flag: "🇰🇬" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className={scss.languageSwitcher}>
      <button
        className={scss.currentLanguage}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Выбрать язык"
      >
        <span className={scss.langCode}>
          {currentLanguage.code.toUpperCase()}
        </span>
        <span className={`${scss.arrow} ${isOpen ? scss.open : ""}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div className={scss.dropdown}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`${scss.langOption} ${lang.code === i18n.language ? scss.active : ""}`}
                onClick={() => changeLanguage(lang.code)}
              >
                <span className={scss.flag}>{lang.flag}</span>
                <span className={scss.langName}>{lang.name}</span>
              </button>
            ))}
          </div>
          <div className={scss.overlay} onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
