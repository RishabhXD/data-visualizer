const express = require("express");
const controllers = require("../controller/data");

const router = express.Router();
router
  .get("/", controllers.getAllData)
  .post("/", controllers.postData)
  .get("/filter/end_year", controllers.endYearFilter)
  .get("/filter/topic", controllers.topicFilter)
  .get("/filter/sector", controllers.sectorFilter)
  .get("/filter/region", controllers.regionFilter)
  .get("/filter/pest", controllers.pestFilter)
  .get("/filter/source", controllers.sourceFilter)
  .get("/filter/swot", controllers.swotFilter)
  .get("/filter/country", controllers.countryFilter)
  .get("/filter/city", controllers.cityFilter);

exports.routes = router;
