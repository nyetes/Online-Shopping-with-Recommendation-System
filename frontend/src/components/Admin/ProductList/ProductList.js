import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getAdminProduct, deleteProduct } from '../../../redux/actions/productAction'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from "@material-ui/core"
import MetaData from '../../layout/Metadata'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import SideBar from '../Sidebar/Sidebar'
import "./productlist.scss"
import * as productactionTypes from '../../../redux/constants/productactiontypes';

const ProductList = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

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
            alert.success("Product Deleted Successfully");
            history.push('/admin/products');
            dispatch({
                type: productactionTypes.DELETE_PRODUCT_RESET,
            })
        }
        dispatch(getAdminProduct());
    }, [dispatch, alert, error, history, deleteError, isDeleted]);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };
    const columns = [

        {
            field: 'id',
            headerName: "Product ID",
            flex: 0.5
        },
        {
            field: "name",
            headerName: 'Name',
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: 'number',
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            type: 'number',
            flex: 0.5,
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
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`} >
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>

                    </React.Fragment>
                )
            }
        }

    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name,
                stock: item.stock,
                price: item.price,

            })
        });

    return (
        <React.Fragment>
            <MetaData title="ALL PRODUCTS -ADMIN" />
            <div className='dashboard'>
                <SideBar />
                <div className='productListContainer'>
                    <h1 id="productListHeading">ALL PRODUCT LIST</h1>
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

export default ProductList