import React, { useEffect, useState } from 'react'
import PopupWithForm from '../PopupWithForm';

const AddPlacePopup = (props) => {

    const [placeName, setPlaceName] = useState('');
    const [placeUrl, setPlaceUrl] = useState('');

    const handleSumbit = (evt) => {
        evt.preventDefault();

        props.onAddPlace({
            name: placeName,
            link: placeUrl,
        });
    };

    useEffect(() => {
        setPlaceName('');
        setPlaceUrl('');
    }, [props.isOpen])

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Добавить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSumbit}
    >
      <input
        className="popup__input popup__input_type_title"
        type="text"
        name="cardname"
        placeholder="Название места"
        minLength="2"
        maxLength="30"
        value={placeName ?? ''}
        onChange={(evt) => setPlaceName(evt.target.value)}
        required
      />
      <span className="popup__error cardname-error"></span>

      <input
        className="popup__input popup__input_type_link"
        type="cardurl"
        name="cardlink"
        placeholder="Ссылка на изображение"
        value={placeUrl ?? ''}
        onChange={(evt) => setPlaceUrl(evt.target.value)}
        required
      />
      <span className="popup__error cardurl-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
