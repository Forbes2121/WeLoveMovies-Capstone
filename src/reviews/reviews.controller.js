//require the service.js and asyncErrorBoundary from errors
const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//middleware to check if a review exists, if it doesn't exist return a 404
async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);

    //utilize locals if a review exists
    if (review) {
        res.locals.review = review
        return next();
    }

    return next ({status: 404, message: `Review cannot be found`})
}

//check to see if the review is valid with a score and a body
function hasScoreAndBody(req, res, next) {
    const { data: { score = null, content = null } = {} } = req.body;
    let updatedObject = {};
    if (!score && !content) {
        return next({status: 400, message: "missing score and/or content"})
    }
    if (score) {
        updatedObject.score = score;
    }
    if (content) {
        updatedObject.content = content;
    }
    res.locals.update = updatedObject
    next()
}

//delete a review given an existing review_id
async function destroy(req, res) {
    const { review } = res.locals
    await service.delete(review.review_id)
    res.sendStatus(204)
}

//update an existing review, returning the updated review including the critic info
async function update(req, res) {
    const {review} = res.locals
    const {update} = res.locals
    await service.update(update, review.review_id)
    const updatedReview = await service.read(review.review_id)
    const critic = await service.getCritic(review.critic_id)

    res.status(200).json({ data: {...updatedReview, critic: critic[0]} })
}

//export the delete and update functions, with appropriate error handling checks
module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), hasScoreAndBody, asyncErrorBoundary(update)]
}