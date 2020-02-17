//DA se obrise?

import React from 'react'
import { connect } from 'react-redux'
import { selectDirectorySection } from '../redux/directory/directory-selectors'
import { createStructuredSelector } from 'reselect'

// import '../css/styles.scss'

import HomeMenuItem from './HomeMenuItem'


const Directory = ({ sections }) => (

  <div className="directory-menu">
    {
      sections.map(({ id, ...sectionProps }) => (
        <HomeMenuItem key={id} {...sectionProps} />
      ))
    }
  </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection
})

export default connect(mapStateToProps)(Directory)