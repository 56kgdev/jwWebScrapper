const axios = require("axios");
const BASE_URI =
  "https://apis.justwatch.com/content/titles/es_MX/popular?body=";

const getListByProvider = async (provider, page) => {
  const result = await axios.get(
    `${BASE_URI}${getRequestBody(provider, page)}`
  );
  const data = result.data;
  let actual_page = 1;
  const total_pages = data.total_pages;
  const listItems = [];

  for (let i = actual_page; i <= total_pages; i++) {
    const _result = await axios.get(
      `${BASE_URI}${getRequestBody(provider, page)}`
    );
    const _data = _result.data;

    _data.items.map((item) => {
      console.log(item);
      listItems.push({
        title: item.title,
        jw_entity_id: item.jw_entity_id,
        full_path: item.full_path,
        year: item.original_release_year,
        type: item.object_type,
        platform: provider,
        offers: item.offers,
      });
    });
  }

  return listItems;
};

const getRequestBody = (provider, page) => {
  return `%7B%22fields%22:[%22full_path%22,%22full_paths%22,%22id%22,%22localized_release_date%22,%22object_type%22,%22poster%22,%22scoring%22,%22title%22,%22tmdb_popularity%22,%22backdrops%22,%22production_countries%22,%22offers%22,%22original_release_year%22,%22backdrops%22],%22providers%22:[%22${provider}%22],%22enable_provider_filter%22:false,%22is_upcoming%22:false,%22package_intersection%22:false,%22monetization_types%22:[],%22page%22:${page},%22page_size%22:100,%22matching_offers_only%22:true%7D`;
};

module.exports = {
  getListByProvider,
};
