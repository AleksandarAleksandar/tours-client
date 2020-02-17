import React from 'react'
import { connect } from 'react-redux'
import Directory from '../components/Directory'

// import '../css/styles.scss'
import UniversalItems from '../components/UniversalItems'
import { browserUtils } from './../utils/browser-utils'
import { routingUtils } from './../utils/routing-utils'
import Breadcrumbs from './../components/Breadcrumbs'
import { tourStatsNeeded, toursNeeded } from './../redux/shop/shop-actions'
import { updateBrowserTitle } from './../redux/global/global-actions'
import { sortingUtils } from '../utils/sorting-utils'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CategoriesDashboard from './../components/CategoriesDashboard'
import { selectIsCollectionFetching, selectTours, selectStats } from './../redux/shop/shop-selector'
import { createStructuredSelector } from 'reselect'


class Home extends React.Component {

  componentDidMount() {
    this.props.dispatch(tourStatsNeeded())
    this.props.dispatch(toursNeeded())

    let thisPageRoute = routingUtils.getRouteData('HOME');
    // browserUtils.updateTitle(thisPageRoute.browserTitle)
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle));
  }

  render() {
    let props = this.props;
    let isFetching = true;
    let items = []; // all tours
    let filtered = {
      cheapest: [],
      mostpopular: [],
      longest: []
    }

    if (this.props.isFetching === false) {
      console.log('test 3 ');
      // console.log(this.props.st.shop);
      isFetching = false
      items = this.props.tours_items; // all tourse unfiltered
    }

    /*
    filtered.cheapest = items.filter((item) => {
      if (item.price < 400) {
        return true
      }
      return false;
    })
    */
    let mini_sort_cheeapest = (arr) => {
      let pureCopy = [...arr]
      pureCopy.sort(function (a, b) {
        return a.price - b.price;
      });
      return pureCopy;
    }
    filtered.cheapest = mini_sort_cheeapest(items)

    /*
    filtered.mostpopular = items.filter((item) => {
      if (item.ratingsAverage > 4.4) {
        return true
      }
      return false
    })
    */
    let mini_sort_most_popular = arr => {
      let pureCopy = [...arr];
      pureCopy.sort(function (a, b) {
        return b.ratingsAverage - a.ratingsAverage;
      })
      return pureCopy
    }
    filtered.mostpopular = mini_sort_most_popular(items)



    // filtered.longest = items.filter((item) => {
    //   if (item.duration > 10) {
    //     return true
    //   }
    //   return false
    // })


    let mini_sort_longest = arr => {
      let pureCopy = [...arr];
      pureCopy.sort(function (a, b) {
        return b.duration - a.duration;
      })
      return pureCopy
    }

    filtered.longest = mini_sort_longest(items)


    let stats = [];
    let jsxStats = null

    if (this.props.isFetching === false) {
      stats = this.props.stats.data;
      console.log(stats)
      let jsxStatsRows = stats.map((item) => {
        return (
          <div key={item.id} className="fact item">
            <div className="fact-icon"><i className="fas fa-chart-line"></i></div>
            <div className=""><span className="term-name">{item._id}:</span><span className="term-value">{item.numTours}</span></div>
          </div>
        )
      })

      jsxStats = (
        <div className="homepage-stats">

          <h3>Stats</h3>

          <div className="facts items horisontal">
            {jsxStatsRows}
          </div>
        </div>
      )

    }


    let thisPageRoute = routingUtils.getRouteData('SHOP');
    let breadcrumbs = thisPageRoute.breadcrumbs;
    let activeRoute = thisPageRoute.routeName;

    let isLoggedIn = props.isLoggedIn;

    let wrapper_cl = 'page-wrapper';
    if (false) {
      //TODO: ako je admin panel stranica ide ovaj wrapper
      wrapper_cl = 'wrapper adminlte';
    }

    return (
      <>
        <div className={wrapper_cl}>
          <Header isLoggedIn={isLoggedIn} isHomePage={true} />
          <div className="page-body">


            <section className="section">
              <div className="inner">
                <div className="homepage">
                  <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />
                  {<Directory />
                  }
                  {/* dir */}
                </div>
              </div>
            </section>



            <section className="section homepage-dashboard">
              <div className="inner">

                {/* <h2>Od svega po malo</h2> */}

                <UniversalItems title={'Most popular'} category={'nema kategorije'} items={filtered.mostpopular} limit={4} spinner={isFetching} />

                <UniversalItems title={'Most affordable'} category={'nema kategorije'} items={filtered.cheapest} limit={4} spinner={isFetching} />

                <UniversalItems title={'Most days'} category={'nema kategorije'} items={filtered.longest} limit={4} spinner={isFetching} />
              </div>
            </section>

            <section className="section">
              <div className="inner">
                {/* {jsxStats} */}
              </div>
            </section>

            <section className="section">
              <div className="inner">
                <CategoriesDashboard />
              </div>
            </section>

          </div>

          <Footer />
        </div>
      </>
    )
  }

}

const mapStateToProps = createStructuredSelector({
  tours_items: selectTours,
  isFetching: selectIsCollectionFetching,
  stats: selectStats
});

export default connect(mapStateToProps)(Home)


/*
 *
 * {
"status":"success",
"data":{
"stats":[
{
"_id":"DIFFICULT",
"numRatings":6,
"numTours":5,
"avgRating":4.5,
"avrPrice":228,
"minPrice":33,
"maxPrice":997
},
{
"_id":"EASY",
"numRatings":21,
"numTours":3,
"avgRating":4.766666666666667,
"avrPrice":1030.3333333333333,
"minPrice":397,
"maxPrice":1497
},
{
"_id":"MEDIUM",
"numRatings":19,
"numTours":11,
"avgRating":4.572727272727272,
"avrPrice":619.6363636363636,
"minPrice":3,
"maxPrice":2997
}
]
}
}
 */