const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  for (let theater of data) {
    const movies = await service.listMovies(theater.theater_id);
    theater["movies"] = movies;
  }
  res.status(200).json({
    data,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
