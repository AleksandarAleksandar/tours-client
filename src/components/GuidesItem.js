import React from 'react'
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
    ajaxGet(apiLib.apiGetsingleUser(userid))
      .then((response) => {
        if (response && response.data) {
          let pripremljeni_podaci_za_state = response.data.data.doc;
          let avatarUrl = apiLib.staticAvatar(pripremljeni_podaci_za_state.photo);
          this.setState({
            isFetching: false,
            data: pripremljeni_podaci_za_state,
            avatarUrl: avatarUrl
          });
        } else {
        }
      })
  }

  render() {
    let jsxSpinner = null;
    if (this.state.isFetching === true) {
      jsxSpinner = <SpinnerRow />
    }
    let user = this.state.data
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