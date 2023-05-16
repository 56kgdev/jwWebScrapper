const moviesController = require("./controller");

const getMovieByScrapper = (router) => {
  router.get("/movies/scrap/:movie", async (req, res) => {
    moviesController.scrapByMovie(req, res);
  });

  router.get("/movies/search/:title", async (req, res) => {
    moviesController.getMovieTitles(req, res);
  });
};

const GetRoutes = (router) => {
  getMovieByScrapper(router);
};

module.exports = {
  GetRoutes,
};
