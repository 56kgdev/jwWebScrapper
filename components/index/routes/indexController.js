
const GetIndexRoute = (router) => {
  router.get("/", async (req, res) => {    
    res.json({
      message: "Scraper API",
    });
  });
};

const IndexRoutes = (router) => {
  GetIndexRoute(router);
};

module.exports = {
  IndexRoutes,
};
