//initialize the router, controller, and methodNotAllowed
const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//get method on /movies/:movieId/reviews to return the reviews, with critic property, for a specify movie_id
router
    .route("/:movieId/reviews")
    .get(controller.getReviews)
    .all(methodNotAllowed);

//get method to return the theaters for the specified movie_id
router
    .route("/:movieId/theaters")
    .get(controller.getTheaters)
    .all(methodNotAllowed);

//should return a list of all movies by default, if is_showing = true, then return active movies
router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

//return a 404 if the ID doesn't match any ID in the database, should return movie details on an existing ID
router 
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

module.exports = router;