const axios = require("axios");

async function getTitlesMatchWithSimpleLang(querySearch) {
  const bodyStructure = {
    operationName: "GetSuggestedTitles",
    variables: {
      country: "MX",
      language: "es",
      first: 4,
      filter: {
        searchQuery: querySearch,
      },
    },
    query:
      "query GetSuggestedTitles($country: Country!, $language: Language!, $first: Int!, $filter: TitleFilter) {\n  popularTitles(country: $country, first: $first, filter: $filter) {\n    edges {\n      node {\n        ...SuggestedTitle\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment SuggestedTitle on MovieOrShow {\n  id\n  objectType\n  objectId\n  content(country: $country, language: $language) {\n    fullPath\n    title\n    originalReleaseYear\n    posterUrl\n    fullPath\n    __typename\n  }\n  __typename\n}\n",
  };

  const data = await axios.post(
    "https://apis.justwatch.com/graphql",
    bodyStructure,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const dataResult = data.data.data.popularTitles.edges.map((movie) => {
    const _pathNodes = movie.node.content.fullPath.split("/");
    return {
      type: movie.node.objectType,
      path: _pathNodes[_pathNodes.length - 1],
      title: movie.node.content.title,
      year: movie.node.content.originalReleaseYear,
      posterUrl: movie.node.content.posterUrl,
    };
  });
  return dataResult;
}

module.exports = {
  getTitlesMatchWithSimpleLang,
};
