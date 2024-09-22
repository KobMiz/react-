/* import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCard } from "../services/cardsService";

const FavoriteCards = ({ searchQuery }) => {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchFavoriteCards = async () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favoriteCards")) || [];
      const cards = await Promise.all(
        favorites.map((id) => getCard(id).then((res) => res.data))
      );
      setFavoriteCards(cards);
      setFilteredCards(cards);
    } catch (error) {
      console.error("Error fetching favorite cards:", error);
    } finally {
      setLoading(false);
    }
  };

  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const results = favoriteCards.filter(
        (card) =>
          card.bizName.toLowerCase().includes(lowerCaseQuery) ||
          card.bizDescription.toLowerCase().includes(lowerCaseQuery) ||
          card.bizPhone.toLowerCase().includes(lowerCaseQuery) 
          
      );
      setFilteredCards(results);
    } else {
      setFilteredCards(favoriteCards);
    }
  }, [searchQuery, favoriteCards]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (filteredCards.length === 0) {
    return <div>No favorite cards found.</div>;
  }

  return (
    <div className="container">
      <h1>Favorite Cards</h1>
      <div className="row">
        {filteredCards.map((card) => (
          <div key={card._id} className="col-md-12 col-lg-4 mt-3">
            <div className="card h-100 shadow-sm">
              <Link to={`/cards/${card._id}`}>
                <img
                  src={card.bizImage}
                  alt={card.bizName}
                  className="card-img-top"
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
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCards;
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCard } from "../services/cardsService";

const FavoriteCards = ({ searchQuery }) => {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteCards = async () => {
      try {
        const favorites =
          JSON.parse(localStorage.getItem("favoriteCards")) || [];
        const cards = await Promise.all(
          favorites.map((id) =>
            getCard(id)
              .then((res) => res.data)
              .catch((err) => {
                console.error(`Error fetching card with ID ${id}:`, err);
                return null; // אם הבקשה נכשלת, מחזירים null
              })
          )
        );

        // מסננים כרטיסים שהצליחו להיטען
        const validCards = cards.filter((card) => card !== null);
        setFavoriteCards(validCards);
        setFilteredCards(validCards);
      } catch (error) {
        console.error("Error fetching favorite cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteCards();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const results = favoriteCards.filter(
        (card) =>
          card.bizName.toLowerCase().includes(lowerCaseQuery) ||
          card.bizDescription.toLowerCase().includes(lowerCaseQuery) ||
          card.bizPhone.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredCards(results);
    } else {
      setFilteredCards(favoriteCards);
    }
  }, [searchQuery, favoriteCards]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (filteredCards.length === 0) {
    return <div>No favorite cards found.</div>;
  }

  return (
    <div className="container">
      <h1>Favorite Cards</h1>
      <div className="row">
        {filteredCards.map((card) => (
          <div key={card._id} className="col-md-12 col-lg-4 mt-3">
            <div className="card h-100 shadow-sm">
              <Link to={`/cards/${card._id}`}>
                <img
                  src={card.bizImage}
                  alt={card.bizName}
                  className="card-img-top"
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
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCards;
