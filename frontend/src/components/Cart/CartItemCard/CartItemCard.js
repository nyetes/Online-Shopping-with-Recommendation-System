import React from 'react'
import { Link } from 'react-router-dom';
import './cartitemcard.scss'
const CartItemCard = ({ item, deleteCartItem }) => {
    return (
        <div className='cartitemcard'>
            <img src={item.image} alt="ssa" />
            <div className="cartitemcard__desc">
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: रू${item.price}`}</span>
                <p onClick={() => deleteCartItem(item.product)}>Remove</p>
            </div>
        </div>
    )
}

export default CartItemCard