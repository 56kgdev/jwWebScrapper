const scrapper = require("../../services/scrapper-by-name");
const movieServices = require("../../services/movies-service");

const scrapByMovie = async (req, res) => {
  console.log(req.params);
  const movie = req.params.movie;

  const response = await scrapper.scrapperByName("pelicula", movie);

  res.json({
    body: response,
  });
};

const scrapByMovieByPath = async (req, res) => {
  console.log(req.body);
  const movie = req.body.path;

  const response = await scrapper.scrapperByPath(movie);

  res.json({
    body: response,
  });
};

const getMovieTitles = async (req, res) => {
  console.log(req.params);
  const movie = req.params.title;

  const response = await movieServices.getTitlesMatchWithSimpleLang(movie);

  res.json({
    body: response,
  });
};

module.exports = {
  scrapByMovie,
  getMovieTitles,
  scrapByMovieByPath,
};
