import React from 'react'
import { Link } from 'react-router-dom'
// import PreviewItem from './PreviewItem'
import UniversalItem from './UniversalItem'
import SpinnerRow from './SpinnerRow'
import Slider from "react-slick";



/// TODO: https://github.com/akiran/react-slick


/*
ZADATAK:
- ova komponenta treba da primi jedan prop filter_criteria na bazi kojeg isfiltriramo podatke za prikaz

- TODO: sada trebamo pripremiti MODEL tj. izvor podataka u kojem ce svaki item imati podatak prema kojem ga je lako filterovati.

a)
na primer: ako hocem oda ih filtriramo po kategorji,
najjednostavnije sto moze je da imemo jedna array i u njemu svaki item da ima category property.

b)
drugi nacin je da obavljamo fetchovanje iz posebnog servisa kojem bi zadali kriterijum i on bi sam obavio filterovanje...

c)
najbolji nacin bi bio da imamo frontend servis koji bi nam dao privremene podatke , zatim obavio fetchovanje pa opet izazavo novi action kada stignu svi podaci u potpunosti. To je resenej za lvelike shopove sa velikim brojem artikala.

*/



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    ><i className="fas fa-chevron-circle-right"></i></div>
  );
}



const UniversalItems = (props) => {

  console.log(props);

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
  // TODO: zanimljivo za kasnije da se napravi funkcionalnost ako nismo zadali limit...

  let hasMax = false;
  if (props.limit) {
    // max je definisan
    if (props.limit > 0) {
      hasMax = true;
    }
  } else {
    // max je undefined ili je nula
    if (props.limit === 0) {
      hasMax = true;
    }
  }

  // filtered = [{id: 1}, {id: 2}, {id: 3}]
  let filtered = items; // preskocicemo filtriranje za sada
  console.log('LIMIT: ', props.limit, hasMax);
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





