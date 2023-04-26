import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../../actions/movieAction";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { movies } = useSelector((state) => state.movies);

    const { users } = useSelector((state) => state.allUsers);


    useEffect(() => {
        dispatch(getMovies());
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">

                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/movies">
                            <p>Movies</p>
                            <p>{movies && movies.length}</p>
                        </Link>

                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Dashboard;