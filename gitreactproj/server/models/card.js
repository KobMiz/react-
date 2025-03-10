const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const cardSchema = new mongoose.Schema({
  bizName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  bizDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  bizState: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 400,
  },
  bizCountry: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 400,
  },
  bizCity: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  bizStreet: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  bizPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  bizImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  bizNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  bizEmail: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  bizWeb: {
    type: String,
    maxlength: 1024,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizState: Joi.string().min(3).max(400).required(),
    bizCountry: Joi.string().min(3).max(400).required(),
    bizCity: Joi.string().min(2).max(400).required(),
    bizStreet: Joi.string().min(2).max(400).required(),
    bizEmail: Joi.string().min(5).max(255).required().email(),
    bizWeb: Joi.string().max(1024).optional(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024),
  });

  return schema.validate(card);
}

async function generateBizNumber(Card) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let card = await Card.findOne({ bizNumber: randomNumber });
    if (!card) return String(randomNumber);
  }
}

exports.Card = Card;
exports.validateCard = validateCard;
exports.generateBizNumber = generateBizNumber;
