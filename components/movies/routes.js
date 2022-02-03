const moviesController = require("./controller");

const getMovieByScrapper = (router) => {
  router.get("/movies/scrap/:movie", async (req, res) => {
    moviesController.scrapByMovie(req, res);
  });
};

const GetRoutes = (router) => {
  getMovieByScrapper(router);
};

module.exports = {
  GetRoutes,
};
