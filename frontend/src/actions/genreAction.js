import { GET_GENRES_ERROR, GET_GENRES_SUCCESS, ADMIN_GENRE_REQUEST, ADMIN_GENRE_SUCCESS, ADMIN_GENRE_FAIL, CLEAR_ERRORS, DELETE_GENRE_REQUEST, DELETE_GENRE_SUCCESS, DELETE_GENRE_FAIL } from "../constants/genreConstant";
import Axios from "axios";

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const result = await Axios.get("/api/genres/genres");
      dispatch({ type: GET_GENRES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: GET_GENRES_ERROR, error });
    }
  };
};

// Get All genres For Admin
export const getAdminGenre = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GENRE_REQUEST });

    const { data } = await Axios.get("/api/genres/admin/genres");

    dispatch({
      type: ADMIN_GENRE_SUCCESS,
      payload: data.genre,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GENRE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete GENre
export const deleteGenre = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_GENRE_REQUEST });

    const { data } = await Axios.delete(`/api/genres/admin/genre/${id}`);

    dispatch({
      type: DELETE_GENRE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_GENRE_FAIL,
      payload: error.response.data.message,
    });
  }
};



//error clear
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })



}