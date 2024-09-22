import React, { useState, useEffect } from "react";
import PageHeader from "../components/common/pageHeader";
import Logo from "../components/logo";
import CardsList from "../components/CardsList";
import cardsService from "../services/cardsService";

function Home({ searchQuery }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const searchTerm = searchQuery ? searchQuery.toLowerCase() : "";

  useEffect(() => {
    async function fetchCards() {
      const { data } = await cardsService.getAll();
      setCards(data);
      setFilteredCards(data);
    }
    fetchCards();
  }, []);

  useEffect(() => {
    async function fetchCards() {
      try {
        const { data } = await cardsService.getAll();
        setCards(data);
        setFilteredCards(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, []);

  useEffect(() => {
    const results = cards.filter(
      (card) =>
        card.bizName?.toLowerCase().includes(searchTerm) ||
        card.bizDescription?.toLowerCase().includes(searchTerm) ||
        card.bizPhone?.toLowerCase().includes(searchTerm) ||
        card.bizState?.toLowerCase().includes(searchTerm) ||
        card.bizCountry?.toLowerCase().includes(searchTerm) ||
        card.bizCity?.toLowerCase().includes(searchTerm) ||
        card.bizStreet?.toLowerCase().includes(searchTerm)
    );

    setFilteredCards(results);
  }, [searchQuery, cards]);

  return (
    <div className="container">
      <PageHeader title={<Logo />} />
      <CardsList cards={filteredCards} searchQuery={searchQuery} />
    </div>
  );
}

export default Home;
