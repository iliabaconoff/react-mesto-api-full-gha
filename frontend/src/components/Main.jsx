import React, { useContext } from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = (props) => {
  const userData = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-group">
            <img src={userData.avatar} alt="аватар" className="profile__image" />
            <button
              className="profile__edit-avatar"
              type="button"
              aria-label="Редактировать аватар"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__column">
            <div className="profile__name-button">
              <h1 className="profile__name">{userData.name}</h1>
              <button
                className="profile__button-edit"
                type="button"
                aria-label="Редактировать профиль"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__bio">{userData.about}</p>
          </div>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="Добавить место"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {props.cards.reverse().map((card) => {
          return(
          <Card 
          key={card._id}
          cardData={card}
          name={card.name}
          link={card.link}
          likes={card.likes}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
          />
        )})}
      </section>
    </main>
  );
}

export default Main;
