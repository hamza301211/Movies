import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createMovie } from "../../actions/movieAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import StarIcon from '@mui/icons-material/Star';
import SideBar from "./Sidebar";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import StraightenIcon from '@mui/icons-material/Straighten';
import { NEW_MOVIE_RESET } from "../../constants/movieConstant";

const NewMovie = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector((state) => state.newMovie);

    const [title, settitle] = useState("");
    const [genre, setGenre] = useState("");
    const [trailerLink, settrailerLink] = useState("");
    const [movieLength, setmovieLength] = useState("");
    const [numberInStock, setnumberInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [rate, setrate] = useState(0);
    const [image, setImage] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Action",
        "Comedy",
        "Thriller",
        "Horror",
        "Drama",
        "Fantasy",
        "Animation"
    ];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Movie Created Successfully");
            history.push("/admin/dashboard");
            dispatch({ type: NEW_MOVIE_RESET });
        }
    }, [dispatch, alert, error, history, success]);

    const createMovieSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("title", title);
        myForm.set("genre", genre);
        myForm.set("trailerLink", trailerLink);
        myForm.set("movieLength", movieLength);
        myForm.set("rate", rate);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("numberInStock", numberInStock);


        image.forEach((image) => {
            myForm.append("image", image);
        });
        dispatch(createMovie(myForm));
    };

    const createMovieImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImage([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImage((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Create Movie" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createMovieSubmitHandler}
                    >
                        <h1>Create Movie</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Movie Name"
                                required
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <MovieFilterIcon />
                            <input
                                type="text"
                                placeholder="Genre Name"
                                required
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </div>
                        <div>
                            <SlideshowIcon />
                            <input
                                type="url"
                                placeholder="Trailer Link"
                                required
                                value={trailerLink}
                                onChange={(e) => settrailerLink(e.target.value)}
                            />
                        </div>
                        <div>
                            <StraightenIcon />
                            <input
                                type="text"
                                placeholder="Movie Length"
                                required
                                value={movieLength}
                                onChange={(e) => setmovieLength(e.target.value)}
                            />
                        </div>
                        <div>
                            <StarIcon />
                            <input
                                type="number"
                                placeholder="Rate"
                                required
                                onChange={(e) => setrate(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Movie Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="numberInStock"
                                required
                                onChange={(e) => setnumberInStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createMovieImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewMovie;