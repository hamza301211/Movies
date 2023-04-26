const mongoose = require("mongoose");
const Genre = require("../models/genreModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

module.exports.GET_ALL_GENRES = (req, res) => {
    Genre.find()
        .then((docs) => {
            return res.status(200).json(docs);
        })
        .catch((err) => res.status(500).json(err));
};

module.exports.ADD_GENRE = catchAsyncErrors(async (req, res, next) => {
    const genre = await Genre.create(req.body);
    res.status(201).json({
        success: true,
        genre
    })
});

exports.getAdminGenres = catchAsyncErrors(async (req, res, next) => {
    const genre = await Genre.find();

    res.status(200).json({
        success: true,
        genre,
    });
});


//delete

module.exports.deleteGenre = catchAsyncErrors(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        return next(new ErrorHandler("genre Not found", 404));
    }

    await genre.remove();

    res.status(200).json({
        success: true,
        message: "genre deleted"
    })
});
