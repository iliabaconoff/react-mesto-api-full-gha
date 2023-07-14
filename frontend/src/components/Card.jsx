import React, { useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.cardData.owner._id === currentUser._id;
  const isLiked = props.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_pressed'}`);; 

  function handleClick() {
    props.onCardClick(props.cardData)
  }

  function handleLikeClick() {
    props.onCardLike(props.cardData);
  };

  function handleDeleteClick() {
    props.onCardDelete(props.cardData);
  };

  return (
    <div className="card">
      <img
        className="card__image"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      {isOwn && 
      <button
        className="card__delete"
        type="button"
        arial-label="Удалить место"
        name="card__delete"
        id="card__delete"
        onClick={handleDeleteClick}
      ></button>}
      <div className="card__description">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like-column">
          <button
            className={cardLikeButtonClassName}
            type="button"
            arial-label="Нравится"
            namde="card__like"
            id="card__like"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{props.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
