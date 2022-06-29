//require the router from express, controller from file, and methodNotAllowed from errors
const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//two routes for /reviews/:reviewId, a PUT and a DELETE with a 404 in case ID given doesn't match any ID in database
router  
    .route("/:reviewId")
    .delete(controller.delete)
    .put(controller.update)
    .all(methodNotAllowed)

//export the router
module.exports = router;
