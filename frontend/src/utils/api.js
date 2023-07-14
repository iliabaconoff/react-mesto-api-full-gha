class Api {
  constructor({ baseUrl }) {
    this._link = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибонька: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => this._checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => this._checkResponse(res))
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._link}/users/me `, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._checkResponse(res))
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._link}/users/me/avatar`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
    }).then((res) => this._checkResponse(res))
  }

  addNewCard({ name, link }) {
    return fetch(`${this._link}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._checkResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      method: 'DELETE',
    }).then((res) => this._checkResponse(res))
  }

  putCardLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      method: 'PUT',
    }).then((res) => this._checkResponse(res))
  }

  deleteCardLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      method: 'DELETE',
    }).then((res) => this._checkResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        method: 'DELETE',
      }).then((res) => this._checkResponse(res))
    } else {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        method: 'PUT',
      }).then((res) => this._checkResponse(res))
    }
  }
}

const api = new Api({
  baseUrl: 'https://api.baconoff.nomoredomains.work'
})

export default api;
