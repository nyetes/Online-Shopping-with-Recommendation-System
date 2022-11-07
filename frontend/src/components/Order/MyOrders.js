import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, myOrders } from '../../redux/actions/orderAction'
import Loader from '../layout/Loader/loader'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import Metadata from '../layout/Metadata'
import LaunchIcon from '@material-ui/icons/Launch'
import './myorders.scss'
import { useAlert } from 'react-alert'
const MyOrders = () => {

    const dispatch = useDispatch()
    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            flex: 0.8
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ?
                    "greenColor" : "redColor";
            }
        },
        {
            field: "itemQty",
            headerName: 'items Qty',
            type: "number",
            flex: 0.3

        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            flex: 0.3
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    //yo id mathi field is ko id which is orderid
                    <Link to={`/order/${params.getValue(params.id, "id")}`} >
                        <LaunchIcon />
                    </Link>
                );
            }

        }


    ];
    const rows = [];

    //each column ko realted value in row jun hamile Myorders ko order bata linxau
    orders &&
        orders.forEach((item, index) => {
            rows.push({
                id: item._id,
                status: item.orderStatus,
                itemQty: item.orderItems.length,
                amount: item.totalPrice,

            });
        })


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, alert, error])

    return (
        <React.Fragment>
            <Metadata title={`${user.name} - Orders `} />

            {loading ? (<Loader />) : (
                <div className='myOrdersPage container'>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableSelectionOnClick
                        className='myOrdersTable'
                        autoHeight

                    />
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

                </div>
            )}

        </React.Fragment>
    )
}

export default MyOrders