var express = require("express");
var router = express.Router();
var indexRoutes = require("../components/index/routes/indexController");
var moviesRoutes = require("../components/movies/routes/index");
var seriesRoutes = require("../components/series/routes/index");
var providerRoutes = require("../components/providers/routes/index");

indexRoutes.IndexRoutes(router);
moviesRoutes.GetRoutes(router);
seriesRoutes.GetRoutes(router);
providerRoutes.GetRoutes(router);

module.exports = router;
