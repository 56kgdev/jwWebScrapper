const scrapper = require("../../../services/scrapper-by-name");

const scrapBySerie = async (req, res) => {
  console.log(req.params);
  const serie = req.params.serie;

  const response = await scrapper.scrapperByName("serie", serie);

  res.json({
    body: response,
  });
};

module.exports = {
  scrapBySerie,
};
