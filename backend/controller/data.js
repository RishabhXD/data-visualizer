const model = require("../model/data");
const Data = model.Data;

exports.getAllData = async (req, res) => {
  const data = await Data.find({});
  res.json(data);
};

exports.postData = (req, res) => {
  const data = new Data(req.body);
  data.save();
  res.json(data);
};

exports.endYearFilter = async (req, res) => {
  const end_year = +req.query.end_year;
  console.log(end_year);
  const data = await Data.find({ end_year });
  res.json(data);
};

exports.topicFilter = async (req, res) => {
  const { topic } = req.query;
  const data = await Data.find({ topic });
  res.json(data);
};

exports.sectorFilter = async (req, res) => {
  const { sector } = req.query;
  const data = await Data.find({ sector });
  res.json(data);
};

exports.regionFilter = async (req, res) => {
  const { region } = req.query;
  const data = await Data.find({ region });
  res.json(data);
};

exports.pestFilter = async (req, res) => {
  const { pestle } = req.query;
  const data = await Data.find({ pestle });
  res.json(data);
};

exports.sourceFilter = async (req, res) => {
  const { source } = req.query;
  const data = await Data.find({ source });
  res.json(data);
};

exports.swotFilter = async (req, res) => {
  const { swot } = req.query;
  const data = await Data.find({ swot });
  res.json(data);
};

exports.countryFilter = async (req, res) => {
  const { country } = req.query;
  const data = await Data.find({ country });
  res.json(data);
};

exports.cityFilter = async (req, res) => {
  const { city } = req.query;
  const data = await Data.find({ city });
  res.json(data);
};
