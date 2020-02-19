import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor() {
    super()

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log(error);

  }
  render() {
    if (this.state.hasError === true) {
      return (
        <div className="error-image-overlay">
          <div className="error-image-container"></div>
          <h4 className="error-image-text">Sorry, our dog ate this page</h4>
        </div>
      )
    }
    return (
      this.props.children
    )
  }
}
