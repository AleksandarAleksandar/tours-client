import React from 'react'

export default function RatingStars(props) {
  let number = 0;
  if (props.rating > 0) {
    number = props.rating
  }
  let jsxStars = [];
  for (let i = 1; i <= number; i++) {
    jsxStars.push(
      <div key={i} className="star"></div>
    )
  }
  return (
    <div className="stars">
      {jsxStars}
    </div>
  )
}
