import React, { useRef, useEffect} from 'react'
import PopupWithForm from '../PopupWithForm';

const EditAvatarPopup = (props) => {
  const inputAvatarLink = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateAvatar({
        avatar: inputAvatarLink.current.value,
    })
  };

  useEffect(() => {inputAvatarLink.current.value = ''}, [props.isOpen]);

    return (
    <PopupWithForm
      name="avatar"
      title="Изменить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_link"
        name="avatar"
        type="url"
        placeholder="Ссылка на Ваше фото"
        ref={inputAvatarLink}
        required
      ></input>
      <span className="popup__error avatarurl-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;