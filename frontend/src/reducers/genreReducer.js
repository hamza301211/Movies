import { GET_GENRES_ERROR, GET_GENRES_SUCCESS, ADMIN_GENRE_REQUEST, ADMIN_GENRE_SUCCESS, ADMIN_GENRE_FAIL, GET_GENRES_REQUEST, CLEAR_ERRORS,DELETE_GENRE_REQUEST,DELETE_GENRE_SUCCESS,DELETE_GENRE_FAIL,DELETE_GENRE_RESET } from "../constants/genreConstant";

const initialState = {
    genres: [],
    newGenre: {},
    error: null,
};

export const genreReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GENRES_SUCCESS:
            return {
                ...state,
                genres: action.payload,
            };

        case GET_GENRES_ERROR:
            return {
                ...state,
                error: action.error,
            };

        default:
            return state;
    }
}

export const genresReducer = (state = { genre: [] }, action) => {

    switch (action.type) {
        case GET_GENRES_REQUEST:
        case ADMIN_GENRE_REQUEST:
            return {
                loading: true,
                genre: []
            }
        case GET_GENRES_SUCCESS:
            return {
                loading: false,
                genre: action.payload.genre,
                // genreCount: action.payload.genreCount,
            }
        case ADMIN_GENRE_SUCCESS:
            return {
                loading: false,
                genre: action.payload,
            };
        case GET_GENRES_ERROR:
        case ADMIN_GENRE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }

};

export const genressReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_GENRE_REQUEST:
            //   case UPDATE_MOVIE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_GENRE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

            //   case UPDATE_MOVIE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_GENRE_FAIL:
            //   case UPDATE_MOVIE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_GENRE_RESET:
            return {
                ...state,
                isDeleted: false,
            };
            //   case UPDATE_MOVIE_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

