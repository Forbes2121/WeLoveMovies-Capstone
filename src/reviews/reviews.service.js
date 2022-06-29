//establish the knex
const knex = require("../db/connection")

//simple read query
function read(reviewId) {
    return knex("reviews")
    .select("*")
    .where({ "review_id":reviewId })
    .first()
}

//get the critic details for our updated review
function getCritic(criticId) {
    return knex("critics")
    .select("*")
    .where({ "critic_id":criticId })
}

//destroy/delete an existing review
function destroy(reviewId) {
    return knex("reviews")
    .where({ "review_id":reviewId })
    .del()
}

//update an existing review
function update(updatedReview, id) {
    return knex("reviews")
    .select("*")
    .where({ review_id: id })
    .update({ ...updatedReview })
    //not sure if I also need a .then((updatedRecords) => updatedRecords[0])
}

//export appropriate functions
module.exports = {
    read,
    delete: destroy,
    getCritic,
    update,
}