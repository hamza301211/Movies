import { createStore, combineReducers, applyMiddleware } from "redux"

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { movieDetailsReducer, movieReducer, moviesReducer } from "./reducers/movieReducer";
import { genreReducer } from "./reducers/genreReducer";
import { userDetailsReducer, userReducer } from "./reducers/userReducer";
import { profileReducer } from "./reducers/userReducer";
import { allUsersReducer } from "./reducers/userReducer";
import { newMovieReducer } from "./reducers/movieReducer";
import { genresReducer } from "./reducers/genreReducer";
import { genressReducer } from "./reducers/genreReducer";


const reducer = combineReducers({
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    genres: genreReducer,
    user: userReducer,
    profile: profileReducer,
    allUsers: allUsersReducer,
    newMovie: newMovieReducer,
    movie: movieReducer,
    userDetails: userDetailsReducer,
    genre: genresReducer,
    genress: genressReducer

});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;