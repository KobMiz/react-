import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCard } from "../services/cardsService";
import PageHeader from "../components/common/pageHeader";

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const { data } = await getCard(id);
        setCard(data);
      } catch (error) {
        setError("Failed to fetch card details");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!card) {
    return <div className="error">Card not found</div>;
  }

  return (
    <div className="container">
      <PageHeader title={card.bizName} />
      <div className="card-detail d-flex flex-column align-items-center">
        <img
          src={card.bizImage}
          alt={card.imageAlt || card.bizName}
          className="card-image mb-3"
        />
        <div className="card-info text-center">
          <h2 className="card-title">{card.bizName}</h2>
          <p className="description">{card.bizDescription}</p>
          <p className="contact-info">
            <strong>Phone:</strong> {card.bizPhone || "N/A"}
          </p>
          <p className="contact-info">
            <strong>Business Number:</strong> {card.bizNumber || "N/A"}
          </p>
          <p className="contact-info">
            <strong>Address:</strong>{" "}
            {card.bizState ? `${card.bizState}, ` : ""}
            {card.bizCountry || "N/A"}, {card.bizCity || "N/A"},{" "}
            {card.bizStreet || "N/A"}
          </p>
          <p className="contact-info">
            <strong>Email:</strong> {card.bizEmail || "N/A"}
          </p>
          <p className="contact-info">
            <strong>Website:</strong>{" "}
            <a
              href={card.bizWeb || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {card.bizWeb ? "Visit Website" : "N/A"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
