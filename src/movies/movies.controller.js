const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  } else {
    next({ status: 404, message: `Movie cannot be found.` });
  }
}

async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing === "true") {
    const data = await service.listIsShowing();
    res.status(200).json({ data });
  } else {
    const data = await service.list();
    res.status(200).json({ data });
  }
}

async function listTheaters(req, res) {
  const { movie: data } = res.locals;
  const { movie_id } = data;
  const theaters = await service.readTheaters(movie_id);
  res.status(200).json({ data: theaters });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function readReviews(req, res) {
  const { movie: data } = res.locals;
  const { movie_id } = data;
  const reviews = await service.readReviews(movie_id);
  res.status(200).json({ data: reviews });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
};
