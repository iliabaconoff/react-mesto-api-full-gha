import React, { useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ( cardData, likes, name, link, onCardClick, onCardLike, onCardDelete ) => {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = cardData.owner === currentUser._id;
  const isLiked = likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_pressed'}`);

  function handleClick() {
    onCardClick(cardData)
  }

  function handleLikeClick() {
    onCardLike(cardData);
  };

  function handleDeleteClick() {
    onCardDelete(cardData);
  };

  return (
    <div className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      {isOwn &&
      <button
        className="card__delete"
        type="button"
        aria-label="Удалить место"
        name="card__delete"
        id="card__delete"
        onClick={handleDeleteClick}
      ></button>}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-column">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            name="card__like"
            id="card__like"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
