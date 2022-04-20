const express = require("express");
const mongoose = require("mongoose");
// const router = express.Router();
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-media",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(PORT, () => {
  console.log(`Now running on ${PORT}, at http://localhost:3001`);
});
