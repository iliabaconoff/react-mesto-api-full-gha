const cardRouter = require('express').Router();
const {
  createNewCard,
  deleteCard,
  dislikeCard,
  likeCard,
  getAllCards,
} = require('../controllers/cards');
const {
  validateCardId,
  validateNewCard,
} = require('../utils/validationConfig');

cardRouter.post('/', validateNewCard, createNewCard);
cardRouter.get('/', getAllCards);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.put('/:cardId/likes', validateCardId, likeCard);
cardRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouter;
