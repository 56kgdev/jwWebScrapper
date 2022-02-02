const seriesController = require("../controllers/index");

const GetSerieByScrapper = (router) => {
  router.get("/series/scrap/:serie", async (req, res) => {
    seriesController.scrapBySerie(req, res);
  });
};

const GetRoutes = (router) => {
  GetSerieByScrapper(router);
};

module.exports = {
  GetRoutes,
};
