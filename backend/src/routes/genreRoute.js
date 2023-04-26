const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { GET_ALL_GENRES, ADD_GENRE, getAdminGenres, deleteGenre } = require("../controllers/genreController");



const router = express.Router();

router.route("/genres").get(GET_ALL_GENRES);
router.route("/genre/new").post(isAuthenticatedUser, authorizeRoles("admin"), ADD_GENRE);

router
    .route("/admin/genres")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminGenres);


router
    .route("/admin/genres/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteGenre);


module.exports = router;