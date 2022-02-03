const providerListService = require("../../services/providersListService");
const moviesDAO = require("../movies/DAO");

const getProviderListByName = async (req, res) => {
  const provider = req.params.provider;
  const list = await providerListService.getListByProvider(provider, 1);

  const successList = await Promise.all(
    list.map(async (item) => {
      console.log(item);
      return await moviesDAO.createMovie(item);      
    })
  );

  res.json({
    body: successList,
  });
};

module.exports = {
  getProviderListByName,
};
