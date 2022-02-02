const providerListService = require("../../../services/providersListService");

const getProviderListByName = async (req, res) => {
  const provider = req.params.provider;
  const list = await providerListService.getListByProvider(provider, 1);

  res.json({
    body: list,
  });
};

module.exports = {
  getProviderListByName,
};
