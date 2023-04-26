const ErrorHandler = require("../utils/errorHandler");
const Movie = require("../models/MovieModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createMovie = catchAsyncErrors(async (req, res, next) => {
  let image = [];

  if (typeof req.body.image === "string") {
    image.push(req.body.image);
  } else {
    image = req.body.image;
  }

  const imageLinks = [];

  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.v2.uploader.upload(image[i], {
      folder: "movies",
    });

    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.image = imageLinks;
  req.body.user = req.user.id;

  const movie = await Movie.create(req.body);

  res.status(201).json({
    success: true,
    movie,
  });
});

// Get All movies (Admin)
exports.getAdminMovies = catchAsyncErrors(async (req, res, next) => {
  const movies = await Movie.find();

  res.status(200).json({
    success: true,
    movies,
  });
});


// //create -- admin
// module.exports.createMovie = catchAsyncErrors(async (req, res, next) => {
//     const movie = await Movie.create(req.body);
//     res.status(201).json({
//         success: true,
//         movie
//     })

// });


// get all
module.exports.getAllMovies = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const movieCount = await Movie.countDocuments();
  const apiFeature = new ApiFeatures(Movie.find(), req.query).search().filter().pagination(resultPerPage);
  const movies = await apiFeature.query;
  res.status(200).json({
    success: true,
    movies,
    movieCount
  })

});

// Update -- admin

module.exports.updateMovie = catchAsyncErrors(async (req, res, next) => {
  let movie = Movie.findById(req.params.id);
  if (!movie) {
    return next(new ErrorHandler("Movie Not found", 404));
  }
  movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });
  res.status(200).json({
    success: true,
    movie
  })

});
//get movieDetails
module.exports.getMovieDetails = catchAsyncErrors(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(new ErrorHandler("Movie Not found", 404));
  }
  res.status(200).json({
    success: true,
    movie,
  })


});

//delete

module.exports.deleteMovie = catchAsyncErrors(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return next(new ErrorHandler("Movie Not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < movie.image.length; i++) {
    await cloudinary.v2.uploader.destroy(movie.image[i].public_id);
  }
  await movie.remove();

  res.status(200).json({
    success: true,
    message: "movie deleted"
  })
});
