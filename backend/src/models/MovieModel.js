const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, trim: true },
    numberInStock: { type: Number, required: true },
    genre: { type: String, required: true },
    image: [{ public_id: { type: String, required: true }, url: { type: String, required: true } },],
    rate: { type: Number, required: true },
    description: { type: String, require: true },
    trailerLink: { type: String, require: true },
    movieLength: { type: String, require: true },
    category: { type: String, required: [true, "Please enter Movie category"] }
});

module.exports = mongoose.model("Movie", movieSchema);
