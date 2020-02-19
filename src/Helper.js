import React from 'react';
import { browserUtils } from './utils/browser-utils'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectBrowserTitle } from './redux/global/global-selector'

class Helper extends React.Component {
  componentDidMount() {
    if (this.props.state_ceo) {
      browserUtils.updateTitle(this.props.browserTitle)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.state_ceo) {
      if (this.props.browserTitle !== prevProps.browserTitle) {
        browserUtils.updateTitle(this.props.browserTitle)
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

const mapStateToProps = createStructuredSelector({
  browserTitle: selectBrowserTitle
})


export default connect(mapStateToProps)(Helper);