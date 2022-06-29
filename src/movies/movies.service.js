const knex = require("../db/connection")

//list of all the movies
function list() {
    return knex("movies").select("*");
}

//list of movies that are showing
function listIsShowing() {
    return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url")
    .where({ is_showing: true })
}

//specific movieId listing
function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({movie_id})
        .first();
}

//use a double join to get theaters showing a specific movieId
function getTheaters(movieId) {
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .where({ "mt.movie_id":movieId })
}

//get critic details for the reviews part of a specific movie_id
function getCritic(criticId) {
    return knex("critics")
    .select("*")
    .where({ "critic_id": criticId})
}

//review details from a specific movieId
function getMovieReviews(movieId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*")
    .where({ "r.movie_id":movieId })
}

//export the appropriate functions
module.exports = {
    list,
    listIsShowing,
    read,
    getTheaters,
    getCritic,
    getMovieReviews,
}