import React from 'react'
import './reviewcard.scss'
import { Rating } from '@material-ui/lab'
const ProductCard = ({ review }) => {
  const options = {

    size: "small",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className='reviewCard'>

      <div className="reviewCard__reviews">

        <div className='reviewCard__reviews__imgwrapper'>
          <img src={review.imgurl} alt='User' />
        </div>

        <div className='reviewCard__reviews__namewapper'>
          <h2>{review.name}</h2>
          <div className='reviewCard__reviews__namewapper__onediv'>
            <Rating {...options} />
            <span>({review.rating})</span>
            {/* <span>{review.CreatedAt}</span> */}
          </div>
        </div>

      </div>

      <p>{review.comment}</p>
    </div>
  )
}

export default ProductCard