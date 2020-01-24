import React from 'react';
import { browserUtils } from './utils/browser-utils'
import { connect } from 'react-redux'

class Helper extends React.Component {
  componentDidMount() {
    if (this.props.state_ceo) {
      browserUtils.updateTitle(this.props.state_ceo.global.browserTitle)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.state_ceo) {
      if (this.props.state_ceo.global.browserTitle !== prevProps.state_ceo.global.browserTitle) {
        browserUtils.updateTitle(this.props.state_ceo.global.browserTitle)
      }
    }
  }

  render() {
    return (
      <>
      </>
    );
  }
}

const mapStateToProps = state => ({
  state_ceo: state
})

export default connect(mapStateToProps)(Helper);