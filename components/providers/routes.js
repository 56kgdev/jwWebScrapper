const providerController = require("./controller");

const getProviderList = (router) => {
  router.get("/provider/list/:provider", async (req, res) => {
    providerController.getProviderListByName(req, res);
  });
};

const GetRoutes = (router) => {
  getProviderList(router);
};

module.exports = {
  GetRoutes,
};
