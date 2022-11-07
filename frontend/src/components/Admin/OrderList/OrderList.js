import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getAllOrders, updateOrder, deleteOrder } from '../../../redux/actions/orderAction'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from "@material-ui/core"
import MetaData from '../../layout/Metadata'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import SideBar from '../Sidebar/Sidebar'
import * as orderactionTypes from '../../../redux/constants/orderactiontype';

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

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
      alert.success("Order Deleted Successfully");
      history.push('/admin/orders');
      dispatch({
        type: orderactionTypes.DELETE_ORDER_RESET,
      })
    }
    dispatch(getAllOrders());
  }, [dispatch, alert, error, history, deleteError, isDeleted]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  const columns = [

    {
      field: "id",
      headerName: "Order ID",
      flex: 0.8
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered" ?
          "greenColor" : "redColor";
      }
    },
    {
      field: "itemQty",
      headerName: 'items Qty',
      type: "number",
      flex: 0.4

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
      type: 'number',
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`} >
              <EditIcon />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>

          </React.Fragment>
        )
      }
    }

  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,

      })
    });

  return (
    <React.Fragment>
      <MetaData title="ALL ORDERS -ADMIN" />
      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
          <h1 id="productListHeading">ALL ORDER LIST</h1>
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

export default OrderList