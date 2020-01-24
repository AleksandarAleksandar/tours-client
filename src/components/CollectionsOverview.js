import React from 'react'

import axios from 'axios'
import { selectCollectionsForPreview } from '../redux/shop/shop-selector'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PreviewCollection from '../components/PreviewCollections'


// import '../css/styles.scss'

class CollectionsOverview extends React.Component {

  // async componentDidMount() {
  //   try {
  //     const tours = await axios.get('api/v1/tours');
  //     console.log(tours.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  render() {
    const { collections } = this.props
    console.log(this.props);

    return (
      <div className='collections-overview'>
        {
          collections.map(({ id, ...collectionProps }) => (
            <PreviewCollection key={id} {...collectionProps} />
          ))}
      </div>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
})
export default connect(mapStateToProps)(CollectionsOverview)

