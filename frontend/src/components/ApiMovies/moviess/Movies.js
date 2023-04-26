import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context'
import "./cards.css";
import { useEffect } from 'react';
import { getMovie } from '../../../actions/movieAction';
import { useDispatch } from 'react-redux';




const Movies = ({ match }) => {

    const dispatch = useDispatch();


    const { movie, isLoading } = useGlobalContext();
    if (isLoading) {
        return (
            <section className="">
                <div className="loading">Loading....</div>;
            </section>
        );
    }
    return (
        <>


            <section className='movie-page' >
                <div className='container1 grid1 grid-4-col1'>

                    {movie.map((currMovie) => {
                        const { imdbID, Title, Poster } = currMovie;
                        const movieName = Title.substring(0, 15);
                        return (
                            <>

                                <NavLink to={`movies/${imdbID}`} key={imdbID}>
                                    <div className='card1'>
                                        <div className='card-info'>
                                            <h2 className='h2'>{movieName.length >= 15 ? `${movieName}...` : movieName}</h2>
                                            <img className='img' src={Poster} alt={imdbID} />

                                        </div>

                                    </div>

                                </NavLink>

                            </>
                        )



                    })}
                </div>
            </section>
        </>

    )
}

export default Movies