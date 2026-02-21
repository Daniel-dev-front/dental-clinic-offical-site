import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt, FaPhone, FaClock, FaStar } from "react-icons/fa";
import scss from "./ClinicsMap.module.scss";
import { useTheme } from "../../../context/ThemeContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ClinicsMap = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const mapRef = React.useRef(null);
  const mapInstance = React.useRef(null);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const clinics = [
    {
      id: 1,
      coords: [42.8746, 74.6122],
      name: "Dental Clinic - Главный",
      address: "ул. М. Фрунзе 4б",
      phone: "+996 502 078 338",
      workTime: "Круглосуточно",
      rating: 4.9,
      services: ["Консультация", "Лечение", "Имплантация"],
    },
    {
      id: 2,
      coords: [42.8812, 74.5837],
      name: "Dental Clinic - ЦУМ",
      address: "ул. Шевченко 125",
      phone: "+996 502 078 339",
      workTime: "09:00 - 21:00",
      rating: 4.8,
      services: ["Консультация", "Гигиена", "Отбеливание"],
    },
    {
      id: 3,
      coords: [42.8524, 74.5562],
      name: "Dental Clinic - Юг",
      address: "ул. Гагарина 139в",
      phone: "+996 502 078 340",
      workTime: "09:00 - 20:00",
      rating: 4.7,
      services: ["Терапия", "Хирургия", "Детская стоматология"],
    },
    {
      id: 4,
      coords: [42.8439, 74.5441],
      name: "Dental Clinic - Запад",
      address: "ул. Чортекова 228/3",
      phone: "+996 502 078 341",
      workTime: "10:00 - 22:00",
      rating: 4.9,
      services: ["Ортодонтия", "Протезирование", "Имплантация"],
    },
    {
      id: 5,
      coords: [42.8241, 74.6239],
      name: "Dental Clinic - Восток",
      address: "ул. Черёмушки 6а",
      phone: "+996 502 078 342",
      workTime: "09:00 - 20:00",
      rating: 4.6,
      services: ["Консультация", "Лечение", "Рентген"],
    },
    {
      id: 6,
      coords: [42.7714, 74.6467],
      name: "Dental Clinic - Беш-Кюнгёй",
      address: "ул. Туйдона Моллобаева 41",
      phone: "+996 502 078 343",
      workTime: "09:00 - 18:00",
      rating: 4.8,
      services: ["Консультация", "Лечение", "Профилактика"],
    },
  ];

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView([42.8746, 74.6122], 12);
    mapInstance.current = map;

    const tileUrl =
      theme === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    L.tileLayer(tileUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `
        <div style="
          background: var(--primary, #2563eb);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer;
        ">
          🦷
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });

    clinics.forEach((clinic) => {
      const marker = L.marker(clinic.coords, { icon: customIcon }).addTo(map);
      marker.on("click", () => setSelectedClinic(clinic));
      marker.bindPopup(`
        <div style="padding: 12px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 16px;">${clinic.name}</h3>
          <p style="margin: 5px 0; color: #64748b;">📍 ${clinic.address}</p>
          <p style="margin: 5px 0; color: #64748b;">📞 ${clinic.phone}</p>
          <p style="margin: 5px 0; color: #64748b;">🕒 ${clinic.workTime}</p>
          <button 
            onclick="window.location.href='tel:${clinic.phone}'"
            style="
              background: #2563eb;
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 20px;
              width: 100%;
              cursor: pointer;
              margin-top: 10px;
            "
          >
            ${t("about.map.call")}
          </button>
        </div>
      `);
    });

    return () => {
      if (mapInstance.current) mapInstance.current.remove();
    };
  }, [theme]);

  return (
    <div id="map-bg">
      <section className="container">
        <div className={scss.mapSection}>
          <div className={scss.header}>
            <h2 className={scss.title}>{t("about.map.title")}</h2>
            <p className={scss.subtitle}>{t("about.map.subtitle")}</p>
          </div>

          <div className={scss.content}>
            <div className={scss.clinicsList}>
              <h3>{t("about.map.clinics")}</h3>
              <div className={scss.list}>
                {clinics.map((clinic) => (
                  <div
                    key={clinic.id}
                    className={`${scss.clinicCard} ${selectedClinic?.id === clinic.id ? scss.selected : ""}`}
                    onClick={() => {
                      setSelectedClinic(clinic);
                      if (mapInstance.current) {
                        mapInstance.current.setView(clinic.coords, 15);
                      }
                    }}
                  >
                    <div className={scss.clinicNumber}>{clinic.id}</div>
                    <div className={scss.clinicInfo}>
                      <h4>{clinic.name}</h4>
                      <p className={scss.address}>
                        <FaMapMarkerAlt /> {clinic.address}
                      </p>
                      <div className={scss.rating}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            color={
                              i < Math.floor(clinic.rating)
                                ? "#ffb800"
                                : "#e0e0e0"
                            }
                            size={14}
                          />
                        ))}
                        <span>{clinic.rating}</span>
                      </div>
                      <p className={scss.phone}>
                        <FaPhone /> {clinic.phone}
                      </p>
                      <p className={scss.workTime}>
                        <FaClock /> {clinic.workTime}
                      </p>
                      <div className={scss.services}>
                        {clinic.services.map((service, idx) => (
                          <span key={idx} className={scss.serviceTag}>
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={scss.mapContainer}>
              <div
                ref={mapRef}
                className={scss.map}
                style={{
                  height: "750px",
                  width: "100%",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "var(--card-shadow, 0 4px 12px rgba(0,0,0,0.1))",
                  border: "1px solid var(--border-color, #e9eef2)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClinicsMap;
