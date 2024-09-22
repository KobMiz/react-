const users = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// חיבור למונגו-DB
mongoose
  .connect("mongodb://localhost/my_rest_api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// שימוש ב-Morgan ו-CORS
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// ראוטים
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cards", cards);

// הגדרת הפורט והאזנה לשרת
const port = process.env.PORT || 3900;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
