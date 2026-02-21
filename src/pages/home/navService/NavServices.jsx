import React from "react";
import { useTranslation } from "react-i18next";
import scss from "./NavServices.module.scss";
import { useNavigate } from "react-router-dom";

const NavServices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/services");
    window.scrollTo(0, 0);
  };

  return (
    <div className="container">
      <div className={scss.content_nav}>
        <div className={scss.nav_text}>
          <h2>{t("home.services.title")}</h2>
        </div>
        <div className={scss.content}>
          <div className={scss.first}>
            <div className={scss.cont}>
              <h3>Консультация с проработкой плана лечения</h3>
              <p>
                Подробный осмотр, точная диагностика и индивидуальный план
                действий — без навязывания и с полным пониманием, что и зачем
                нужно.
              </p>
            </div>
          </div>
          <div className={scss.second}>
            <div className={scss.cont}>
              <h3>Хирургия и имплантация</h3>
              <p>
                Устанавливаем импланты с использованием навигационной системы и
                индивидуальных 3D-шаблонов — безопасно, точно и прогнозируемо.
              </p>
            </div>
          </div>
          <div className={scss.three}>
            <div className={scss.cont}>
              <h3>Протезирование</h3>
              <p>
                Восстанавливаем эстетику и функцию зубов с помощью современных
                протезов — от единичных до полных. Удобно, надёжно и
                естественно.
              </p>
            </div>
          </div>
          <div className={scss.four}>
            <div className={scss.cont}>
              <h3>Художественная реставрация</h3>
              <p>
                Воссоздаём форму и цвет зубов так, чтобы результат выглядел
                натурально. Подходит тем, кто ценит детали и эстетику.
              </p>
            </div>
          </div>
          <div className={scss.five}>
            <div className={scss.cont}>
              <h3>Лечение и перелечивание каналов</h3>
              <p>
                Работаем даже со сложными и запущенными случаями. Используем
                микроскоп, чтобы спасти зуб там, где другие предлагают удаление.
              </p>
            </div>
          </div>
          <div className={scss.six}>
            <div className={scss.cont}>
              <h3>Профилактика и лечение кариеса молочных зубов</h3>
              <p>
                Бережно работаем с детьми: лечим кариес и закладываем основу для
                здоровья постоянных зубов — без страха и с доверием.
              </p>
            </div>
          </div>
        </div>
        <div className={scss.btn_nav}>
          <button onClick={handleNavigate}>
            {t("home.services.moreButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavServices;
