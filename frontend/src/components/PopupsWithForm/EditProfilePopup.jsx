import React, { useContext, useEffect, useState } from 'react'
import PopupWithForm from '../PopupWithForm'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_title"
        type="text"
        name="username"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="30"
        value={name ?? ''}
        onChange={(evt) => setName(evt.target.value)}
        required
      />
      <span className="popup__error name-error"></span>
      <input
        className="popup__input popup__input_type_bio"
        type="text"
        name="userbio"
        minLength="1"
        maxLength="30"
        placeholder="Кем вы работаете?"
        value={description ?? ''}
        onChange={(evt) => setDescription(evt.target.value)}
        required
      />
      <span className="popup__error link-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
