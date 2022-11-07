import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getAllUsers, deleteUser } from '../../../redux/actions/userAction'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from "@material-ui/core"
import MetaData from '../../layout/Metadata'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import SideBar from '../Sidebar/Sidebar'
import * as useractionTypes from '../../../redux/constants/userActionTypes';

const UserList = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, users } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

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
            alert.success(message);
            history.push('/admin/users');
            dispatch({
                type: useractionTypes.DELETE_USER_RESET,
            })
        }
        dispatch(getAllUsers());
    }, [dispatch, alert, error, history, deleteError, message, isDeleted]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };
    const columns = [

        {
            field: 'id',
            headerName: "User ID",
            flex: 0.6
        },
        {
            field: "email",
            headerName: 'Email',
            flex: 0.6,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin" ?
                    "greenColor" : "redColor";
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            type: 'number',
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <React.Fragment>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`} >
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>

                    </React.Fragment>
                )
            }
        }

    ];

    const rows = [];

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                email: item.email,
                name: item.name,
                role: item.role,

            })
        });

    return (
        <React.Fragment>
            <MetaData title="ALL USERS -ADMIN" />
            <div className='dashboard'>
                <SideBar />

                <div className='productListContainer'>
                    <h1 id="productListHeading">ALL USERS LIST</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                </div>
            </div>
        </React.Fragment>
    )
}



export default UserList