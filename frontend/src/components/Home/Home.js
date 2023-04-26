import React, { Fragment, useState } from 'react'
// import {CgMouse} from "react-icons/all"
import "./Home.css"
import Movie from "./MovieCard.js"
import MetaData from '../layout/MetaData'
import { clearErrors, getMovie } from "../../actions/movieAction"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import Loader from '../layout/loader/Loader'
import { useAlert } from "react-alert"
import Typography from "@material-ui/core/Typography"



const Home = ({ match }) => {

    const categories = [
        "Action",
        "Comedy",
        "Thriller",
        "Horror",
        "Drama",
        "Fantasy",
        "Animation"

    ];

    const keyword = match.params.keyword;

    const [category, setCategory] = useState("");


    const alert = useAlert();

    const dispatch = useDispatch();
    const { loading, error, movies, movieCount } = useSelector((state) => state.movies)


    useEffect(() => {

        dispatch(getMovie(keyword, category))

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getMovie());

    }, [dispatch, error, alert, keyword, category])
    return (

        <Fragment>
            {loading ? (<Loader />) : <Fragment>
                <MetaData title="MOVIES" />
                <div className='banner'>
                    <p>Welcome to Movies Space</p>
                    <h1>Find latest Movies here</h1>
                    <a href='#container'>
                        <button>
                            Scroll
                        </button>
                    </a>
                </div>
                <h2 className='homeHeading'>Featured Movies</h2>

                <div className='container' id='container'>
                    {movies && movies.map((movie) =>
                        <Movie movie={movie} />
                    )}
                </div>
                <div style={{ "marginTop": "900px" }} className='filterBox'>


                    <h2 >
                        Categorires
                    </h2>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li className='category-link' key={category} onClick={() => setCategory(category)}>
                                {category}
                            </li>
                        ))}
                    </ul>

                </div>
            </Fragment>}



        </Fragment>
    )
}

export default Home