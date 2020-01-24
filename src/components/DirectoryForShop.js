import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectDirectorySection } from '../redux/directory/directory-selectors'
import { createStructuredSelector } from 'reselect'
// import '../css/styles.scss'
import HomeMenuItem from './HomeMenuItem'
import axios from 'axios'


class Directory extends Component {
  constructor() {
    super();
    this.state = { tours: [] };

  }
  async componentDidMount() {
    const response = await axios.get('api/v1/tours')
    const toursData = response.data.data.doc
    this.setState({ tours: toursData})

  }
  render() {
    return (
      <div className="directory-menu" >
        {
          this.state.tours.map((props) => (
            <HomeMenuItem key={props.id} {...props} />
          ))
        }
      </div>
    )
  }
}

export default (Directory)