import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel';
import './productDetails.scss';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../redux/actions/productAction';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Loader from '../layout/Loader/loader';
import { useAlert } from 'react-alert';
import ReviewCard from './ReviewCard';
import MetaData from '../layout/Metadata';
import { addItemsToCart } from '../../redux/actions/cartAction';
import { Rating } from '@material-ui/lab'
import * as productactionTypes from '../../redux/constants/productactiontypes';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core';

const ProductDetails = () => {
    //for accessing params //older way causing error
    const { id } = useParams();

    const alert = useAlert();
    const dispatch = useDispatch();

    const { product, error, loading } = useSelector((state) => state.productDetail);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const [quantity, setQuantity] = useState(1);
    //inc dec cart value  
    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };
    const increaseQuatity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item added to Cart");
    }

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({
                type: productactionTypes.NEW_REVIEW_RESET,
            })
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, reviewError, success]);

    const options = {

        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };


    return (
        <React.Fragment>
            {loading ? (<Loader />) : (
                <React.Fragment>
                    <MetaData title={`${product.name} -- EKINBECH`} />
                    <div className='productdetails'>
                        <div className="productdetails__container">
                            <div className="productdetails__imgCarousel">
                                <Carousel className="productdetails__Carousel">
                                    {product.images && product.images.map((item, index) => {
                                        return (
                                            <img className='CarouselImage'
                                                key={item.url}
                                                src={item.url}
                                                alt={`${index} Slide`}
                                            />
                                        );
                                    })}
                                </Carousel>
                            </div>
                            <div className='productdetails__desc'>
                                <div className='productdetails__desc__detailsblock-1'>
                                    <h2>{product.name}</h2>
                                    <p>Product #{product._id}</p>
                                </div>
                                <div className='productdetails__desc__detailsblock-2'>
                                    <Rating  {...options} />
                                    <span className="productdetails__desc__detailsblock-2--span">({product.numOfReviews} Reviews )</span>
                                </div>

                                <div className='productdetails__desc__detailsblock-3'>
                                    <h1>रू{product.price}</h1>
                                    <div className='productdetails__desc__detailsblock-3__1'>
                                        <div className='productdetails__desc__detailsblock-3__1-1'>
                                            <button className='signbutton' onClick={decreaseQuantity}>-</button>
                                            <input type='number' readOnly value={quantity}></input>
                                            <button className='signbutton' onClick={increaseQuatity}>+</button>
                                        </div>{" "}
                                        <button disabled={product.stock < 1 ? true : false} className="btn btn__cart " onClick={addToCartHandler}>Add to Cart</button>
                                    </div>
                                    <p> Status:{" "}
                                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                            {product.stock < 1 ? "OutOfStock" : "InStock"}
                                        </b>
                                    </p>
                                </div>
                                <div className='productdetails__desc__detailsblock-4'>
                                    Description:<p>{product.description}</p>
                                </div>
                                <button className=' btn btn__cart' onClick={submitReviewToggle} >Submit Review</button>
                            </div>
                        </div>
                    </div>

                    {/* dialog box for submitting review */}
                    <Dialog aria-labelledby='simple-dialog-title'
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className='submitDialogTextArea'
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            >
                            </textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color='secondary' >Cancel</Button>
                            <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                        </DialogActions>
                    </Dialog>


                    {/* tab to toggle product description and submitted user's reviews */}
                    <div className='descriptioreview__tab '>
                        <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
                            <TabList>
                                <Tab default="0">Description</Tab>
                                <Tab>Review</Tab>
                            </TabList>

                            <TabPanel>
                                <p className='tab_description_content'>{product.description}</p>
                            </TabPanel>
                            <TabPanel>
                                {product.reviews && product.reviews[0] ? (
                                    <div className='reviews'>
                                        {product.reviews && product.reviews.map(
                                            (review) => <ReviewCard review={review} />)}
                                    </div>
                                ) : (
                                    <p className='noreview'>No Reviews Yet</p>
                                )
                                }
                            </TabPanel>
                        </Tabs>
                    </div>
                </React.Fragment>
            )
            }
        </React.Fragment>

    )
}

export default ProductDetails