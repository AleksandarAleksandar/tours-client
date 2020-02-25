import React from 'react'
import { shallow } from 'enzyme'
import RatingStars from './../components/RatingStars'

// console.log(shallow(<RatingStars />));
// it('expect to render Rating stars', () => {
//   expect(shallow(<RatingStars />).length).toEqual(1)
// })

it('expect to render Rating stars', () => {
  expect(shallow(<RatingStars />).length).toMatchSnapshot(1)
})
