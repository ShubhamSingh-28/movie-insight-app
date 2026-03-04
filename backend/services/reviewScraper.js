const axios = require("axios");
const cheerio = require("cheerio");

async function getReviews(imdbID) {

  const url = `https://www.imdb.com/title/${imdbID}/reviews`;

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
  });

  const $ = cheerio.load(data);

  let reviews = [];

  $(".ipc-html-content-inner-div").each((i, el) => {
    if (i < 10) {
      reviews.push($(el).text().trim());
    }
  });

  return reviews;
}

module.exports = getReviews;