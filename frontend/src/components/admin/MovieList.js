import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./movieList.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAdminMovie,
    deleteMovie,
} from "../../actions/movieAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_MOVIE_RESET } from "../../constants/movieConstant";

const MovieList = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, movies } = useSelector((state) => state.movies);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.movie
    );

    const deleteMovieHandler = (id) => {
        dispatch(deleteMovie(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Movie Deleted Successfully");
            history.push("/admin/dashboard");
            dispatch({ type: DELETE_MOVIE_RESET });
        }

        dispatch(getAdminMovie());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const columns = [
        { field: "id", headerName: "MOVIE ID", minWidth: 200, flex: 0.5 },

        {
            field: "title",
            headerName: "Title",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "genre",
            headerName: "Genre",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "rate",
            headerName: "Ratings",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>


                        <Button
                            onClick={() =>
                                deleteMovieHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    movies &&
        movies.forEach((item) => {
            rows.push({
                id: item._id,
                genre: item.genre,
                rate: item.rate,
                title: item.title,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL Movies- Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL MOVIES</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default MovieList;