//require the service.js and the asyncErrorBoundary from errors
const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//list of theaters, and include the 'movies' that each theater is showing
async function list(req, res) {
    const theaters = await service.list()

    //loop through and get the movies at each theater via listMovies function in service
    for (let theater of theaters) {
        const movies = await service.listMovies(theater.theater_id)
        theater["movies"] = movies
    }
    res.json({data: theaters});
}

//export the list, wrapped in an asyncErrorBoundary
module.exports = {
    list: [asyncErrorBoundary(list)],
}