const scrapper = require("../../services/scrapper-by-name");

const scrapByMovie = async (req, res) => {
  console.log(req.params);
  const movie = req.params.movie;

  const response = await scrapper.scrapperByName("pelicula", movie);

  res.json({
    body: response,
  });
};

module.exports = {
  scrapByMovie,
};
