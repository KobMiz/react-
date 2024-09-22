import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteCards")) || [];
    setIsFavorited(favorites.includes(card._id));
  }, [card._id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favoriteCards")) || [];
    let updatedFavorites;

    if (isFavorited) {
      updatedFavorites = favorites.filter((id) => id !== card._id);
    } else {
      updatedFavorites = [...favorites, card._id];
    }

    localStorage.setItem("favoriteCards", JSON.stringify(updatedFavorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="col-md-12 col-lg-4 mt-3">
      <div className="card h-100 shadow-sm">
        <Link to={`/cards/${card._id}`}>
          <img
            className="card-img-top"
            src={card.bizImage}
            alt={card.bizName}
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <Link to={`/cards/${card._id}`}>
            <h4 className="card-title fw-bold">{card.bizName}</h4>
          </Link>
          <p className="card-text">{card.bizDescription}</p>
          <hr />
          <p className="card-text">
            <b>Tel: </b>
            {card.bizPhone}
            <br />
            <span className="card-text">
              {card.bizState}, {card.bizCountry}, {card.bizCity},{" "}
              {card.bizStreet}
            </span>
          </p>
          <p className="card-text">
            <b>Email: </b>
            {card.bizEmail}
            <br />
          </p>
        </div>
        <button
          onClick={toggleFavorite}
          className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
        >
          <i
            className={`bi bi-hand-thumbs-up ${
              isFavorited ? "text-danger" : ""
            }`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Card;
