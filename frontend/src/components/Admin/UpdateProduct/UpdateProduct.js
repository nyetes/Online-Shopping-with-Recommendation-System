import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, updateProduct, getProductDetails } from '../../../redux/actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../../layout/Metadata'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import DescriptionIcon from '@material-ui/icons/Description'
import StorageIcon from '@material-ui/icons/Storage'
import SpellcheckIcon from '@material-ui/icons/Spellcheck'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import SideBar from '../Sidebar/Sidebar'
import * as productactionTypes from '../../../redux/constants/productactiontypes'



const UpdateProduct = ({ history, match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, product } = useSelector((state) => state.productDetail);
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const productID = match.params.id;

    useEffect(() => {

        if (product && product._id !== productID) {
            dispatch(getProductDetails(productID));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Product Updated Successfully");
            history.push('/admin/dashboard');
            dispatch({
                type: productactionTypes.UPDATE_PRODUCT_RESET,
            });
        }

    }, [dispatch, alert, error, updateError, history, isUpdated, product, productID]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });

        dispatch(updateProduct(productID, myForm));

    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files); //array.form creates a copy of an array
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <React.Fragment>
            <MetaData title="Update Product" />
            <div className='dashboard'>
                <SideBar />
                <div className='newProductContainer'>
                    <h1 className="createProductHeading">Update Product</h1>
                    <form className='createProductForm' encType='multipart/form-data' onSubmit={updateProductSubmitHandler}>


                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder='Product Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            >

                            </textarea>
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cateory) => (
                                    <option key={cateory} value={cateory}>
                                        {cateory}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder='Stock'
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            ></input>
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                multiple
                                onChange={updateProductImagesChange}
                            ></input>
                        </div>
                        <div className="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}
                        </div>

                        <div className="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="creatProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UpdateProduct



