// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import './products.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, clearErrors } from '../../redux/actions/productAction';
import Loader from '../../components/layout/Loader/loader';
import ProductCard from '../Home/productcard/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert';
import MetaData from '../layout/Metadata';
//import 'boxicons/dist/boxicons';
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { products, loading, error, productsCount, resultPerPage } = useSelector(state => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  };

  const priceHandler = (e, newPrice) => {
    e.preventDefault();
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);



  return (
    <React.Fragment>
      {
        loading ? (<Loader />) : (<React.Fragment>
          <MetaData title="PRODUCTS -- EKINBECH" />
          <div className='allproductsection container'>
            <h1 className='allproductsection__title'>Products</h1>
            <div className="allproductsection__container">
              {products && products.map((product, index) =>
                <ProductCard key={index} product={product} />
              )}
            </div>
          </div>

          <div className='filterbox'>
            <div className='filtertitle'>
              <h3 className='filtertitle__text'>FILTERS</h3>

              <box-icon name='filter' color='#ff2727' ></box-icon>

            </div>

            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              getAriaLabel={() => 'Temperature range'}
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>

            <ul className='categorybox'>
              {categories.map((category) => (
                <li className='category-link'
                  key={category}
                  onClick={() => setCategory(category.toLowerCase())}
                >{category}</li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-label="Temperature"
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={5}
              />
            </fieldset>
          </div>



          {resultPerPage < productsCount && (
            <div className='paginationbox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />
            </div>)
          }
        </React.Fragment>)
      }
    </React.Fragment >
  )
}

export default Products