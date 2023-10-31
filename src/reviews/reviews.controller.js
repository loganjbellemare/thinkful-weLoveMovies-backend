const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  } else {
    next({ status: 404, message: `Review cannot be found.` });
  }
}

function hasContentAndScore(req, res, next) {
  const { score, content } = req.body.data;
  if (score && content) {
    res.locals.data = {};
    res.locals.data.score = score;
    res.locals.data.content = content;
    return next();
  } else {
    next({
      status: 400,
      message: `Request body must have a 'content' and 'score' property.`,
    });
  }
}

function scoreIsValid(req, res, next) {
  const { score } = req.body.data;
  if (typeof score === "number") {
    res.locals.data.score = score;
    return next();
  } else {
    next({
      status: 400,
      message: `Invalid input, 'score' property must be an integer. Received: ${score}`,
    });
  }
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await service.update(updatedReview);
  const review = await service.read(res.locals.review.review_id);
  const critic = await service.getCritic(res.locals.review.critic_id);
  res.status(200).json({ data: { ...review, critic: critic[0] } });
}

async function destroy(req, res) {
  const { review: data } = res.locals;
  const { review_id } = data;
  await service.delete(review_id);
  res.sendStatus(204);
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(hasContentAndScore),
    asyncErrorBoundary(scoreIsValid),
    asyncErrorBoundary(update),
  ],
};
