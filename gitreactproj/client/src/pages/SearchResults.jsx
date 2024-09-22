import React, { useState, useEffect } from "react";
import cardsService from "../services/cardsService"; // ייבוא שירות הכרטיסים

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // מצב עבור מילת החיפוש
  const [results, setResults] = useState([]); // מצב עבור תוצאות החיפוש
  const [allCards, setAllCards] = useState([]); // כל הכרטיסים
  const [loading, setLoading] = useState(true); // אינדיקציה לטעינה

  // טעינת כל הכרטיסים בעת טעינת הקומפוננטה
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data } = await cardsService.getAll();
        setAllCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // חיפוש דינמי בזמן אמת
  useEffect(() => {
    const filteredResults = allCards.filter(
      (card) =>
        card.bizName.toLowerCase().includes(query.toLowerCase()) ||
        card.bizDescription.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
    onSearch(filteredResults); // קריאה לפונקציה שמתקבלת מה-Navbar להעברת תוצאות
  }, [query, allCards, onSearch]);

  return (
    <form className="d-flex mx-auto">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search cards"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // חיפוש בזמן אמת
        aria-label="Search"
      />
    </form>
  );
};

export default Search;
