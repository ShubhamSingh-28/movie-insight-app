const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

const getReviews = require("../services/reviewScraper");
const analyzeSentiment = require("../services/aiService");

const router = express.Router();
dotenv.config();

const OMDB_KEY = process.env.OMDB_KEY;

router.get("/:id", async (req, res) => {

  try {

    const imdbID = req.params.id;
    
    

    const movie = await axios.get(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_KEY}`
    );

    const reviews = await getReviews(imdbID);

    const sentiment = await analyzeSentiment(reviews);

    res.json({
      movie: movie.data,
      reviews,
      sentiment
    });

  } catch (err) {
    console.log(err,"dfghj");
    

    res.status(500).json({
      error: "Something went wrong"
    });

  }

});

module.exports = router;