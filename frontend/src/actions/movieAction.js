import axios from "axios";

import {
    ALL_MOVIE_REQUEST, ALL_MOVIE_SUCCESS, ALL_MOVIE_FAIL, MOVIE_DETAILS_REQUEST, MOVIE_DETAILS_SUCCESS, MOVIE_DETAILS_FAIL, CLEAR_ERRORS, NEW_MOVIE_REQUEST,
    NEW_MOVIE_SUCCESS,
    NEW_MOVIE_FAIL,
    DELETE_MOVIE_REQUEST, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_FAIL, DELETE_MOVIE_RESET, ADMIN_MOVIE_REQUEST, ADMIN_MOVIE_SUCCESS, ADMIN_MOVIE_FAIL
} from "../constants/movieConstant";


export const getMovie = (keyword = "", category) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_MOVIE_REQUEST
        });
        let link = `/api/movies/movies?keyword=${keyword}&category=${category}`;

        if (category) {
            link = `/api/movies/movies?keyword=${keyword}&category=${category}`;
        }

        const { data } = await axios.get(link);
        dispatch({
            type: ALL_MOVIE_SUCCESS,
            payload: data,
        })

    }
    catch (error) {
        dispatch({
            type: ALL_MOVIE_FAIL,
            payload: error.response.data.message,
        })

    }


}

export const getMovies = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_MOVIE_REQUEST
        });

        const { data } = await axios.get("/api/movies/movies");
        dispatch({
            type: ALL_MOVIE_SUCCESS,
            payload: data,
        })

    }
    catch (error) {
        dispatch({
            type: ALL_MOVIE_FAIL,
            payload: error.response.data.message,
        })

    }


}


export const getMovieDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: MOVIE_DETAILS_REQUEST,
        });
        const { data } = await axios.get(`/api/movies/movie/${id}`);
        dispatch({
            type: MOVIE_DETAILS_SUCCESS,
            payload: data.movie,
        })

    }
    catch (error) {
        dispatch({
            type: MOVIE_DETAILS_FAIL,
            payload: error.response.data.message,
        })

    }

}


// Create Product
export const createMovie = (movieData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_MOVIE_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/movies/movie/new`,
            movieData,
            config
        );

        dispatch({
            type: NEW_MOVIE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All movies For Admin
export const getAdminMovie = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_MOVIE_REQUEST });

        const { data } = await axios.get("/api/movies/admin/movies");

        dispatch({
            type: ADMIN_MOVIE_SUCCESS,
            payload: data.movies,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Delete MOVIE
export const deleteMovie = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_MOVIE_REQUEST });

        const { data } = await axios.delete(`/api/movies/admin/movie/${id}`);

        dispatch({
            type: DELETE_MOVIE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_MOVIE_FAIL,
            payload: error.response.data.message,
        });
    }
};

//error clear
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })



}