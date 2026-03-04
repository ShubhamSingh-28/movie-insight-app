const axios = require("axios");

async function analyzeSentiment(reviews) {

  if (!reviews || reviews.length === 0) return null;

  // take only first 2 reviews
  let text = reviews.slice(0,2).join(" ");

  // limit characters (important)
  text = text.substring(0, 400);

  try {

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
      {
        inputs: text
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {

    console.log("HF ERROR:", error.response?.data || error.message);
    return null;

  }
}

module.exports = analyzeSentiment;