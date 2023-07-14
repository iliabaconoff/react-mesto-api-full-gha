import React from "react";
import Popup from "./Popup";

function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, ...props }) {

  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
        <h2 className="popup__form-title">{title}</h2>
        <form
          className={`popup__form popup__form-${name}`}
          method="post"
          name={name}
          onSubmit={props.onSubmit}
          >
          {children}
          <button className="popup__save" type="submit">
            {buttonText}
          </button>
        </form>
    </Popup>
  );
}

export default PopupWithForm;
