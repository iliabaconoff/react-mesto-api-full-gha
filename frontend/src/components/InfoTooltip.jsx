import React from "react";
import iconPositive from "../images/icon-positive.png";
import iconNegative from "../images/icon-negative.png";
import Popup from "./Popup";

export default function InfoTooltip({ onClose, isOpen, isError }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="status">
      <img
        className="popup__status-icon"
        src={isError ? iconNegative : iconPositive}
        alt="Статус регистрации"
      />
      <h2 className={`popup__status-title`}>
        {isError
          ? "Что-то пошло не так! Попробуйте ещё раз."
          : "Вы успешно зарегистрировались!"}
      </h2>
    </Popup>
  );
}
