const express = require("express");
const { getAllMovies, createMovie, updateMovie, deleteMovie, getMovieDetails, getAdminMovies } = require("../controllers/MovieController");
const { deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/movies").get(getAllMovies);
router.route("/movie/new").post(isAuthenticatedUser, authorizeRoles("admin"), createMovie);
router.route("/movie/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateMovie).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteMovie)
router.route("/movie/:id").get(getMovieDetails);

router
    .route("/admin/movies")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminMovies);

router
    .route("/admin/movie/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateMovie)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteMovie);

router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);



module.exports = router;