import React, { useEffect, useState } from "react";
import PageHeader from "../components/common/pageHeader";
import cardsService from "../services/cardsService";
import { useAuth } from "../contexts/auth.context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../components/common/card";

const MyCards = ({ searchQuery }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const getCards = async () => {
      try {
        if (user && user.biz) {
          const { data } = await cardsService.getMyCards();
          setCards(data);
        } else {
          toast.info("Please log in as a business user to view your cards.");
        }
      } catch (error) {
        toast.error("Failed to load cards");
      } finally {
        setLoading(false);
      }
    };

    getCards();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await cardsService.deleteCard(id);
      setCards((prevCards) => prevCards.filter((card) => card._id !== id));
    } catch (error) {
      toast.error("Failed to delete card");
    }
  };

  const filteredCards = cards.filter((card) =>
    [
      card.bizName,
      card.bizDescription,
      card.bizPhone,
      card.bizState,
      card.bizCountry,
      card.bizCity,
      card.bizStreet,
    ].some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <PageHeader titleText="My Cards Page" />
      <div className="row mb-3 text-center">
        <div className="col-12">
          <Link to="/create-card" className="btn btn-dark">
            Create a New Card
          </Link>
        </div>
      </div>
      <div className="row">
        {filteredCards.length === 0 ? (
          <div className="col-12">
            <p>No cards to display.</p>
          </div>
        ) : (
          filteredCards.map((card) => (
            <div key={card._id} className="col-12 col-md-4 mb-4">
              <Card card={card} />
              <div className="card-body d-flex">
                <Link to={`/edit-card/${card._id}`} className="btn btn-dark">
                  Edit <i className="bi bi-pencil"></i>
                </Link>
                <button
                  onClick={() => handleDelete(card._id)}
                  className="btn btn-danger"
                >
                  Delete <i className="bi bi-trash3-fill"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCards;
