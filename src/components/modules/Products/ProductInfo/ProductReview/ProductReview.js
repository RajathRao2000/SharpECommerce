import React from 'react'
import Rating from '../Rating/Rating'
import "./ProductReview.css"

function ProductReview(props) {
    const {name,date,rating,review} =props
  return (
    <div className="review-container">
        <h5>{name}</h5>
        <Rating /> 
        <div className="review-date">Reviewed in {date}</div>
        <p className='review'>{review}</p>
    </div>
  )
}

export default ProductReview