import httpService from "./httpService";
import { apiUrl } from "../config.json";

const cardsApiUrl = `${apiUrl}/cards`;

export function createCard(card) {
  const newCard = {
    bizName: card.bizName,
    bizDescription: card.bizDescription,
    bizPhone: card.bizPhone,
    bizImage: card.bizImage,
    bizState: card.bizState,
    bizCountry: card.bizCountry,
    bizCity: card.bizCity,
    bizStreet: card.bizStreet,
    bizEmail: card.bizEmail,
    bizWeb: card.bizWeb,
  };
  return httpService.post("/cards", newCard);
}

export function getAll() {
  return httpService.get("/cards").then((response) => {
    return response;
  });
}

export function getCard(id) {
  return httpService.get(`/cards/${id}`);
}

export function deleteCard(id) {
  return httpService.delete(`/cards/${id}`);
}

export function updateCard(id, card) {
  const updatedCard = {
    bizName: card.bizName,
    bizDescription: card.bizDescription,
    bizPhone: card.bizPhone,
    bizImage: card.bizImage,
    bizState: card.bizState,
    bizCountry: card.bizCountry,
    bizCity: card.bizCity,
    bizStreet: card.bizStreet,
    bizEmail: card.bizEmail,
    bizWeb: card.bizWeb,
  };
  return httpService.put(`/cards/${id}`, updatedCard);
}

export function getMyCards() {
  return httpService.get(`${apiUrl}/cards/my-cards`);
}

export function getFavoriteCards() {
  return httpService.get(`${apiUrl}/cards/favorites`);
}

export function addFavoriteCard(cardId) {
  return httpService.post(`${apiUrl}/favorites/add`, { cardId });
}

export function removeFavoriteCard(cardId) {
  return httpService.post(`${apiUrl}/favorites/remove`, { cardId });
}

const cardsService = {
  createCard,
  getAll,
  getCard,
  deleteCard,
  updateCard,
  getMyCards,
  getFavoriteCards,
  addFavoriteCard,
  removeFavoriteCard,
};

export default cardsService;
