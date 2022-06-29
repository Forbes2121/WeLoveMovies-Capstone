//initialize the service from service.js and require the asyncErrorBoundary from errors
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//list function, and determine whether or not is_showing is true or false
async function list(req, res) {
    const { is_showing } = req.query;

    if (is_showing) {
        res.status(200).json({data: await service.listIsShowing()})
    } else {
        res.status(200).json({data: await service.list()})
    }
}

//middleware to make sure a movieId exists, otherwise return a 404 
async function movieIdExist(req, res, next) {
    const {movieId} = req.params;
    const movie = await service.read(movieId);

    if (movie) {
        res.locals.movie = movie;
    return next();
    }
        next({
            status: 404,
            message: `Movie cannot be found.`,
        });
}

//get movie data via locals
async function read(req, res, next) {
    const { movie } = res.locals;
    res.json({ data: movie });
}

//get a list of theaters that are showing specific movieId
async function getTheaters(req, res) {
    const { movieId } = req.params

    const result = await service.getTheaters(movieId)

    res.json({ data:result})
}

//get reviews, including critic properties for a specific movie_id
async function getReviews(req, res) {
    const { movieId } = req.params
    const reviews = await service.getMovieReviews(movieId);
    const allReviews = [];
    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];
        const critic = await service.getCritic(review.critic_id);
        review.critic = critic[0]
        allReviews.push(review)
    }
    res.status(200).json({data: allReviews})
}

//export appropriate functions, and wrap necessary functions in asyncErrorBoundary
module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieIdExist), asyncErrorBoundary(read)],
    getTheaters: [asyncErrorBoundary(movieIdExist), asyncErrorBoundary(getTheaters)],
    getReviews: [asyncErrorBoundary(movieIdExist), asyncErrorBoundary(getReviews)]
};