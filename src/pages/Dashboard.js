import React from 'react'
import { connect } from 'react-redux'
import UniversalItems from '../components/UniversalItems'
import { toursNeeded } from '../redux/shop/shop-actions'
import { selectIsCollectionFetching, selectTours } from './../redux/shop/shop-selector'
import { createStructuredSelector } from 'reselect'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(toursNeeded())
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

    if (this.props.isFetching === false) {
      items = this.props.tours_items;

    }

    filteredItems = items.filter((item) => {
      if (catId === 'all') {
        return true;
      }
      if (item.category === category.id) {
        return true
      } else {
        return false
      }
    })


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

const mapStateToProps = createStructuredSelector({
  tours_items: selectTours,
  isFetching: selectIsCollectionFetching,
});
export default connect(mapStateToProps)(Dashboard);
