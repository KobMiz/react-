import React, { useEffect, useState } from "react";
import Card from "./common/card";
import { getAll } from "../services/cardsService";

const CardsList = ({ searchQuery }) => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data: fetchedCards } = await getAll();
        setCards(fetchedCards);
      } catch (error) {
        console.error("Failed to fetch cards", error);
      }
    };

    fetchCards();
  }, []);

  const filterCards = (cards) => {
    const query = searchQuery.toLowerCase();
    return cards.filter((card) => {
      const {
        bizName,
        bizDescription,
        bizPhone,
        bizState,
        bizCountry,
        bizCity,
        bizStreet,
        bizEmail,
        bizWeb,
      } = card;

      return (
        (bizName && bizName.toLowerCase().includes(query)) ||
        (bizDescription && bizDescription.toLowerCase().includes(query)) ||
        (bizPhone && bizPhone.toLowerCase().includes(query)) ||
        (bizState && bizState.toLowerCase().includes(query)) ||
        (bizCountry && bizCountry.toLowerCase().includes(query)) ||
        (bizCity && bizCity.toLowerCase().includes(query)) ||
        (bizStreet && bizStreet.toLowerCase().includes(query)) ||
        (bizEmail && bizEmail.toLowerCase().includes(query)) || 
        (bizWeb && bizWeb.toLowerCase().includes(query))
      );
    });
  };

  const filteredCards = filterCards(cards);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCards.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <div className="row">
        {currentCards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CardsList;
