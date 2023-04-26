import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/movieAction"
import { getGenres } from "../../actions/genreAction"
import { useEffect } from 'react'
import { useAlert } from "react-alert"
import "./Genre.css"

const Genre = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { genres, loading, error } = useSelector((state) => state.genres)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getGenres(match.params.id))

    }, [dispatch, match.params.id, error, alert]);



    return (
        // console.log(genres[0].genre)

        <section style={{ "margin-top": "80px" }} className='movie-page' >
            <div className='container1 grid1 grid-4-col1'>
                {genres.map((e) => {
                    return (
                        //<NavLink to={`movies/${imdbID}`} key={imdbID}>
                        <div className='card1'>
                            <div className='card-info'>
                                <h2 className='h2'>{e.genre}</h2>
                                <img className='img' src={e.image[0].url} alt="genre" />

                            </div>

                        </div>

                        //</NavLink>
                    )


                })}
            </div>
        </section>



    )
}

export default Genre