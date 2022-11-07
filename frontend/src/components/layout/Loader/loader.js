import React from 'react'
import './loader.scss'
import loadergif from '../../../assets/images/giphy.gif';
const loader = () => {
    return (
        <div className='loader-container'>
            <div className='loader'>
                <img src={loadergif} alt='gifimg' />
            </div>
        </div>
    )
}

export default loader