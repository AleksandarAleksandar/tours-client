import React from 'react'

import { connect } from 'react-redux'
// import '../css/styles.scss'
import { selectCollection } from '../redux/shop/shop-selector'
import CollectionItem from '../components/PreviewItem'
import UniversalItems from '../components/UniversalItems'
import { toursNeeded } from '../redux/shop/shop-actions'
import shopActionTypes from '../redux/shop/shop-types'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    console.log('constructor Category Page');
    console.log(this.props);
  }

  componentDidMount() {
    this.props.dispatch(toursNeeded())
    console.log('did mount Category Page');
    console.log(this.props);
  }

  render() {
    let catId = this.props.match.params.id; // path='/category/:id'
    let categories = {
      "skiing": {
        title: "SKIING"
      },
      "hiking": {
        title: "HIKING"
      },
      "swimming": { title: "SWIMMING" },
      "biking": { title: "BIKING" }
    }

    let category = categories[catId]

    if (category && category.title) {
      category.id = catId
    } else {
      category = {
        title: 'NEPOZNATA KATEGORIJA'
      }
    }
    let items = [];
    let filteredItems = []

    if (this.props.state_ceo.shop.isFetching === false) {
      console.log('test 3 ');
      console.log(this.props.state_ceo.shop);
      items = this.props.state_ceo.shop.tours_items;

    }
    console.log(items)

    filteredItems = items.filter((item) => {
      console.log(item.category, category)
      if (catId === 'all') {
        return true;
      }
      if (item.category === category.id) {
        return true
      } else {
        return false
      }
    })

    console.log(filteredItems)

    return (
      <div className='collection-page'>
        <h2 className='title'>{category.title}</h2>
        

        <div className="">
          <UniversalItems title={category.title} items={filteredItems} limit={'ncemo da limitiramo ovde'} spinner={true} />

        </div>




      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  state_ceo: state
});
export default connect(mapStateToProps)(Dashboard);
