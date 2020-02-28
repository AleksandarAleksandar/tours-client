import React from 'react'
import { Link } from 'react-router-dom'
import UniversalItem from './UniversalItem'
import SpinnerRow from './SpinnerRow'
import Slider from "react-slick";


const UniversalItems = (props) => {
  let jsxSpinner = null;
  if (props.spinner === true) {
    jsxSpinner = (
      <SpinnerRow />
    );
  }
  let items = props.items
  if (!Array.isArray(items)) {
    items = []
  }

  let max;
  let hasMax = false;
  if (props.limit) {
    if (props.limit > 0) {
      hasMax = true;
    }
  } else {
    if (props.limit === 0) {
      hasMax = true;
    }
  }

  let filtered = items; 
  if (hasMax) {
    max = props.limit;
    filtered = items.filter((item, index) => index < max);
  }

  let jsxArr = filtered.map((item) => (
    <UniversalItem key={item.id} item={item} itemType={'DETAILED'} />
  ))

  let title = props.title
  let jsxTitle = null;
  if (props.title && props.title !== '') {
    jsxTitle = (
      <h5 >{title}</h5>
    );
    if (props.titleLinkRoute) {
      jsxTitle = (
        <div className="title">
          <Link to={props.titleLinkRoute} className="active">
            <h5 >{title}</h5>
          </Link>
        </div>
      )
    }
  }

  let jsxItemsContainer = (
    <div className='items grid-items universal-items'>
      {jsxArr}
      {jsxSpinner}
    </div>
  );

  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: true,
    dots: false
  };

  if (props.slider === true) {
    jsxItemsContainer = (
      <div className='universal-items slider-style'>
        <Slider {...settings}>
          {jsxArr}
        </Slider>
        {jsxSpinner}
      </div>
    );
  }

  return (
    <div className='universal-items-group'>
      {jsxTitle}
      {jsxItemsContainer}

    </div>
  );
};
export default UniversalItems;





