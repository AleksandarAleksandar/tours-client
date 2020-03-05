import React from 'react'
import { apiLib } from '../utils/api-lib'
import { ajaxGet } from '../utils/ajax-abstraction'
import Rating from '@material-ui/lab/Rating';

class ReviewItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      avatarFetching: true,
      data: {},
      avatarUrl: ''
    }
  }
  componentDidMount() {
    let userid = this.props.item.user._id
    ajaxGet(apiLib.apiGetsingleUser(userid))
      .then((response) => {
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          let avatarUrl = apiLib.staticAvatarDefault();
          if (pripremljeni_podaci_za_state.photo) {
            avatarUrl = apiLib.staticAvatar(pripremljeni_podaci_za_state.photo);
          }
          this.setState({
            avatarFetching: false,
            data: pripremljeni_podaci_za_state,
            avatarUrl: avatarUrl
          });
        } else {
        }
      })

  }

  render() {

    let item = this.props.item

    return (
      <>
        <div className="item review-item">
          <div className="review-card">
            <div className="avatar-group">
              <div className="avatar-img"><img alt="avatar" src={this.state.avatarUrl} />
              </div>
              <div className="nickname"><span className="">{item.user.name}</span></div>
            </div>
            <div className="review-text">
              {item.review}
            </div>
            <div className="review-rating">
              <Rating name="read-only" value={item.rating} readOnly />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ReviewItem