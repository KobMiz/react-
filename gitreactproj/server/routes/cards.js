const express = require("express");
const { Card, validateCard, generateBizNumber } = require("../models/card");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).send(cards);
  } catch (err) {
    console.error("Error fetching cards:", err);
    res.status(500).send("Server error");
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    const cards = await Card.find({ user_id: req.user._id });
    res.status(200).send(cards);
  } catch (err) {
    console.error("Error fetching user's cards:", err);
    res.status(500).send("Server error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).send("Card not found.");
    }
    res.status(200).send(card);
  } catch (err) {
    console.error("Error fetching card:", err);
    res.status(500).send("Server error");
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const card = new Card({
      ...req.body,
      bizImage:
        req.body.bizImage ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      bizNumber: await generateBizNumber(Card),
      user_id: req.user._id,
      isFavorite: false,
    });

    const savedCard = await card.save();
    res.status(201).send(savedCard);
  } catch (err) {
    console.error("Error creating card:", err);
    res.status(500).send("Server error");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedCard = await Card.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedCard) {
      return res.status(404).send("Card not found.");
    }
    res.status(200).send(updatedCard);
  } catch (err) {
    console.error("Error updating card:", err);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedCard = await Card.findOneAndRemove({
      _id: req.params.id,
      user_id: req.user._id,
    });
    if (!deletedCard) {
      return res.status(404).send("Card not found.");
    }
    res.status(200).send(deletedCard);
  } catch (err) {
    console.error("Error deleting card:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
