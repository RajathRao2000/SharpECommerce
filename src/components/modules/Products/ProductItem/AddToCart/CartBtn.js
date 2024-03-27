import "./CartBtn.css"
import React from 'react'


function CartBtn(props) {
  return (
    <span id="CartBtn" >
    <button type="button" className="button" onClick={props.onClick}>
          <span className="button__text">{props.label} </span>
          <span className="button__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              height="24"
              fill="none"
              className="svg"
            >
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg>
          </span>
        </button>
        </span>
  )
}

export default CartBtn