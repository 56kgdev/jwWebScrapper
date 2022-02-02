const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URI = "https://www.justwatch.com";
const COUNTRY = "mx";

async function scrapperByName(type, name) {
  let _response = {};
  let arrItemSearch = [BASE_URI, COUNTRY, type, name];
  //Variables de estructura JustWatch de búsqueda específica
  let cComparisonBlockClass = ".price-comparison--block";
  let cMonetizationsClass = ".monetizations";

  let cStreamClass = ".price-comparison__grid__row--stream";
  let cBuyClass = ".price-comparison__grid__row--buy";
  let cRentClass = ".price-comparison__grid__row--rent";

  let titleClass = ".title-block";
  var searchUrl = arrItemSearch.join("/");

  const response = await axios(searchUrl);
  let _title = "";
  if (response) {
    const html = response.data;
    const $ = cheerio.load(html);
    var title = $(`${titleClass} h3`).text();
    _title = title.split(": ");

    $(cComparisonBlockClass, html).each(function () {
      $(cMonetizationsClass, $(this)).each(function () {
        var hasStreamOptions =
          $(this).find(cStreamClass).html() !== null ? true : false;
        var hasBuyOptions =
          $(this).find(cBuyClass).html() !== null ? true : false;
        var hasRentOptions =
          $(this).find(cRentClass).html() !== null ? true : false;

        if (hasStreamOptions) {
          var cherioObjectStream = $(this).find(cStreamClass);
          _response.stream = showOptions("Stream", cherioObjectStream);
        }

        if (hasBuyOptions) {
          var cherioObjectBuy = $(this).find(cBuyClass);
          _response.buy = showOptions("Compra", cherioObjectBuy);
        }

        if (hasRentOptions) {
          var cherioObjectRent = $(this).find(cRentClass);
          _response.rent = showOptions("Renta", cherioObjectRent);
        }
      });
    });
  }

  return {
    title: _title[1],
    available: _response,
  };
}

function showOptions(cWatchMode, cheerioObject) {
  let itemArray = [];
  var cOptionHolderClass = ".price-comparison__grid__row__element";

  var $ = cheerio.load(cheerioObject.html());

  $(cOptionHolderClass, cheerioObject).each(function () {
    var cStreamOption = $(this).find("img").attr("title");
    itemArray.push(cStreamOption);
  });

  return itemArray;
}

module.exports = {
  scrapperByName,
};
