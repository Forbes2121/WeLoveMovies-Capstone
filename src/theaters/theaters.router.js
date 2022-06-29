//require the appropriate files/functions
const router = require("express").Router({mergeParams: true});
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//singular get request for theaters, which should return a list of theaters, including the movies at each theater
router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

//export the router
module.exports = router;