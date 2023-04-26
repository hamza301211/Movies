import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 20 : 25,
    activeColor: "tomato",
    value: 2.5,
    isHalf: true,
}

const MovieCard = ({ movie }) => {
    return (
        <Link className='productCard' to={`/movie/${movie._id}`}>
            <img src={movie.image[0].url} alt={"movie"} />
            <p>{movie.title}</p>
            <div>
                <ReactStars {...options} />
            </div>
            <span>{movie.category}</span>

        </Link>
    )
}

export default MovieCard