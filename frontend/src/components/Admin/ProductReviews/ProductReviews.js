import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getAllReview, deleteReviews } from '../../../redux/actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from "@material-ui/core"
import MetaData from '../../layout/Metadata'
import DeleteIcon from '@material-ui/icons/Delete'
import SideBar from '../Sidebar/Sidebar'
import * as productactionTypes from '../../../redux/constants/productactiontypes';
import './productReviews.scss'
import Star from '@material-ui/icons/Star'

const ProductReviews = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, reviews, loading } = useSelector((state) => state.productReviews);

    const { error: deleteError, isDeleted } = useSelector((state) => state.review);
    //yo chai get all reivews ko lagi chainxa send thru form
    const [productId, setProductId] = useState("");

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReview(productId));
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            history.push('/admin/reviews');
            dispatch({
                type: productactionTypes.DELETE_REVIEW_RESET,
            })
        }

    }, [dispatch, alert, error, history, deleteError, isDeleted, productId]);

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReview(productId));
    }

    const columns = [

        {
            field: 'id',
            headerName: "REVIEW ID",
            flex: 0.5
        },

        {
            field: "user",
            headerName: "User",

            flex: 0.5,
        },
        {
            field: "comment",
            headerName: 'Comment',
            flex: 0.9,
        },
        {
            field: "rating",
            headerName: "Rating",
            type: 'number',
            flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3 ?
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
                        <Button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>

                    </React.Fragment>
                )
            }
        }

    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                user: item.name,
                comment: item.comment,
                rating: item.rating,

            })
        });

    return (
        <React.Fragment>
            <MetaData title="ALL REVIEWS -ADMIN" />
            <div className='dashboard'>
                <SideBar />
                <div className='productReviewContainer'>

                    <form className='ProductReviewForm' onSubmit={productReviewSubmitHandler}>
                        <h1>ALL REVIEWS</h1>
                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="creatProductBtn"
                            type="submit"
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>

                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className='productListTable'
                            autoHeight
                        />) : (<h1 className='productReviewsFormHeading'> No Reviews Found</h1>)}
                </div>
            </div>
        </React.Fragment>
    )
}


export default ProductReviews