import React, { useState, useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import AddPlacePopup from './PopupsWithForm/AddPlacePopup'
import EditAvatarPopup from './PopupsWithForm/EditAvatarPopup'
import EditProfilePopup from './PopupsWithForm/EditProfilePopup'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'
import * as apiAuth from '../utils/apiAuth'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false)
  const [isError, setError] = useState(false)
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [selecetedCard, setSelecetCard] = useState({})
  const [cards, setCards] = useState([])
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, card]) => {
          setCurrentUser(user)
          setCards(card)
        })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn])

  function handleCardClick(card) {
    setSelecetCard(card)
    setIsImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsInfoToolTipOpen(false)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id)

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        ),
      )
      .catch((err) => console.log(err))
  }

  function handleDeleteClick(card) {
    api
      .deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err))
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleLogin({ email, password }) {
    apiAuth
      .login({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setEmail(email)
        setLoggedIn(true)
        navigate('/', { replace: true })
      })
      .catch((err) => {
        console.error(err)
        setError(true)
        setIsInfoToolTipOpen(true)
      })
  }

  function handleLogout() {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/sign-in', { replace: true })
  }

  function handleRegister({ email, password }) {
    apiAuth
      .register({ email, password })
      .then(() => {
        setError(false)
        navigate('/sign-in')
      })
      .catch((err) => {
        console.error(err)
        setError(true)
      })
      .finally(() => {
        setIsInfoToolTipOpen(true)
      })
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt')

    if (jwt) {
      apiAuth
        .checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true)
            setEmail(res.data.email)
            navigate('/', { replace: true })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={isLoggedIn} email={email} onSignOut={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              cards={cards}
            />
          }
        />
        <Route
          path="/sign-in"
          element={<Login btnName="Войти" onSignIn={handleLogin} />}
        />
        <Route
          path="/sign-up"
          element={
            <Register btnName="Зарегистрироваться" onSignUp={handleRegister} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />

      {/* edit avatar popup */}
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      {/* edit profile popup */}
      <EditProfilePopup
        isOpen={isEditProfileOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      {/* add place popup */}
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      {/* fullsize image popup */}
      <ImagePopup
        card={selecetedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      {/* registration status popup */}
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        isError={isError}
      />
    </CurrentUserContext.Provider>
  )
}

export default App
