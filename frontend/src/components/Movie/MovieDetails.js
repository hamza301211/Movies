import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel";
import "./MovieDetails.css"
import { clearErrors, getMovieDetails } from '../../actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import Loader from '../layout/loader/Loader';
import { useAlert } from "react-alert"



const MovieDetails = ({ match }) => {



    const dispatch = useDispatch();
    const alert = useAlert();

    const { movie, loading, error } = useSelector((state) => state.movieDetails)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getMovieDetails(match.params.id))

    }, [dispatch, match.params.id, error, alert]);


    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        size: window.innerWidth < 600 ? 20 : 25,
        activeColor: "tomato",
        value: 2.5,
        isHalf: true,
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <div className='MovieDetails'>
                    <div>
                        {/* <Carousel> */}
                        {movie.image && movie.image.map((item, i) => (
                            <img
                                className='CarouselImage'
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        ))}


                        {/* </Carousel> */}


                    </div>

                    <div>
                        <div className="detailsBlock-1">
                            <h2>{movie.title}</h2>
                            <p>Movie # {movie._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <ReactStars {...options} />

                        </div>
                        <div className="detailsBlock-3">
                            <h1>{movie.genre}</h1>
                            <div className="detailsBlock-3-1">
                            </div>

                        </div>

                        <div className="detailsBlock-4">
                            Description : <p>{movie.description}</p>
                        </div>

                    </div>

                </div>


            </Fragment>)}
        </Fragment>
    )
}

export default MovieDetails