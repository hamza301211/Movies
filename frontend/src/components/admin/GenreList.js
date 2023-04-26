import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./movieList.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAdminGenre,
    deleteGenre,
} from "../../actions/genreAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_GENRE_RESET } from "../../constants/genreConstant";


const GenreList = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, genre } = useSelector((state) => state.genre);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.genress
    );

    const deleteGenreHandler = (id) => {
        dispatch(deleteGenre(id));
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
            alert.success("Genre Deleted Successfully");
            history.push("/admin/dashboard");
            dispatch({ type: DELETE_GENRE_RESET });
        }

        dispatch(getAdminGenre());
    }, [dispatch, alert, error, history]);

    const columns = [
        { field: "id", headerName: "GENRE ID", minWidth: 200, flex: 0.5 },
        {
            field: "genre",
            headerName: "Genre",
            type: "number",
            minWidth: 150,
            flex: 0.3,
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
                                deleteGenreHandler(params.getValue(params.id, "id"))
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

    genre &&
        genre.forEach((item) => {
            rows.push({
                id: item._id,
                genre: item.genre,

            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL Genres- Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL GENRES</h1>

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

export default GenreList;