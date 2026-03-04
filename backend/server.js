const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const movieRoutes = require("./routes/movie");


const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/movie", movieRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Movie Insight API");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});