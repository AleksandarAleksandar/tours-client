import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withRouter } from 'react-router-dom'
import Button from './CustomButton'
import { addItem } from '../redux/cart/cart-actions'
import RatingStars from './RatingStars'
import { apiLib } from '../utils/api-lib'
import { ajaxGet } from '../utils/ajax-abstraction'
import SpinnerRow from './SpinnerRow'

class GuidesItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      data: {
      },
      avatarUrl: '',
    }
  }
  componentDidMount() {
    let userid = this.props.id

    // step 2: odmah zapocinjemo fetchovanje asinhtono
    ajaxGet(apiLib.apiGetsingleUser(userid))
      .then((response) => {
        // fetchovanje je zavrseno i uspelo
        // step 3
        console.log('nase fetchovanje je zavrseno')
        console.log(response);
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          let avatarUrl = apiLib.staticAvatar(pripremljeni_podaci_za_state.photo);
          this.setState({
            isFetching: false,
            data: pripremljeni_podaci_za_state,
            avatarUrl: avatarUrl
          });
          console.log(pripremljeni_podaci_za_state);
          // dispatch(fetchReviewsSuccess(pripremljeni_podaci_za_state))
        } else {
          // dispatch(fetchReviewsFailure())
        }

      })

  }

  render() {

    let jsxSpinner = null;
    if (this.state.isFetching === true) {
      jsxSpinner = <SpinnerRow />
    }

    let id = this.props.id

    let user = this.state.data



    /*
    _id: "5c8a3e63e12c44188b4dbc5b"
    review: "Quisque egestas faucibus primis ridiculus mi felis tristique curabitur habitasse vehicula"
    rating: 4
    user: {_id: "5c8a24a02f8fb814b56fa193", name: "Lisa Brown"}
    tour: "5c88fa8cf4afda39709c2966"
    createdAt: "2019-12-26T09:45:32.389Z"
    id: "5c8a3e63e12c44188b4dbc5b"
    */
    let role = 'TOUR GUIDE'
    if (user.role === 'lead-guide') {
      role = "LEAD GUIDE"
    }



    return (
      <>
        <div className="item guides-item">
          <div className="avatar-group">
            <div className="avatar-img"><img src={this.state.avatarUrl} />
            </div>
            <div className="info">
              <div className="nickname"><span className="">{user.name}</span></div>
              <div className="guide-role">{role}</div>
            </div>
          </div>
          {jsxSpinner}
        </div>
      </>
    )
  }
}

export default GuidesItem