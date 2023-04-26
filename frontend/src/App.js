import React from "react";
import Header from "./components/layout/Header/Header.js"
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader"
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home"
import MovieDetails from "./components/Movie/MovieDetails"
import SingleMovie from "./components/ApiMovies/SingleMovie"

import "./App.css";
import ApiMovies from "./components/ApiMovies/ApiMovies.js";
import Genre from "./components/Genres/Genre.js";
import LoginSignUp from "./components/User/LoginSignUp";
// import Loader from "./components/layout/loader/Loader.js";
import store from "./store";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./components/layout/Header/UserOptions"
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js"
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import Dashboard from "./components/admin/Dashboard.js";
import NewMovie from "./components/admin/NewMovie"
import MovieList from "./components/admin/MovieList.js";
import UsersList from "./components/admin/UsersList.js";
import GenreList from "./components/admin/GenreList"


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);


  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser());

  }, []
  )
  return (
    <Router>

      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {/* <Routes> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/movie/:id" component={MovieDetails} />
      <Route exact path="/movies" component={ApiMovies} />
      <Route exact path="/movies/:id" component={SingleMovie} />
      <Route exact path="/genres" component={Genre} />
      <Route exact path="/login" component={LoginSignUp} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
      <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
      <ProtectedRoute isAdmin={true} exact path="/admin/movie" component={NewMovie} />
      <ProtectedRoute
        exact
        path="/admin/movies"
        isAdmin={true}
        component={MovieList}
      />
      <ProtectedRoute
        exact
        path="/admin/genres"
        isAdmin={true}
        component={GenreList}
      />
      <ProtectedRoute
        exact
        path="/admin/users"
        isAdmin={true}
        component={UsersList}
      />
      {/* </Routes> */}
      <Footer />


      {/* <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<Movies />} />
          <Route path="movie/:id" element={<SingleMovie />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes> */}

    </Router>
  );
}

export default App;
