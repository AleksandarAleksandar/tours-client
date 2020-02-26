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
import Slider from "react-slick";


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    // this.props.dispatch(tourStatsNeeded())
    // this.props.dispatch(toursNeeded()) 

    let thisPageRoute = routingUtils.getRouteData('HOME');
    browserUtils.updateTitle(thisPageRoute.browserTitle)
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle));

    // quotes widget
    if (window.quoteswidget && typeof window.quoteswidget.init === 'function') {
      window.quoteswidget.init();
    }

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


    // slick slider settings
    let settings = {
      autoplay: true,
      arrows: false,
      dots: false,
      infinite: true,
      speed: 1600,
      fade: true,
      cssEase: 'linear'
    };


    // text transitions...
    // [ "nerdy.", "simple.", "vanilla JS.", "fun!" ]
    const QUOTES = [
      '“I am not the same having seen the moon shine on the other side of the world.” – Mary Anne Radmacher',
      '“‘It’s a dangerous business, Frodo, going out your door. You step onto the road, and if you don’t keep your feet, there’s no knowing where you might be swept off to.” – J.R.R Tolkien',
      '“Two roads diverged in a wood, and I – I took the one less traveled by.” – Robert Frost',
      '“Once a year, go somewhere you have never been before.” — Dalai Lama'
    ];
    let quotes_string = JSON.stringify(QUOTES);


    return (
      <>
        <div className={wrapper_cl}>
          <Header isLoggedIn={isLoggedIn} isHomePage={true} />
          <div className="page-body homepage">


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


            <section className="section NOVVA_SEKCIJA">
              <div className="inner">

                <h1>GLAVNI NASLOV</h1>
                <div className="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>

                <div className="grid-items">
                  <div className="item">

                    {jsxStats}

                  </div>
                  <div className="item">
                    <div className="description text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                  </div>
                </div>

              </div>
            </section>

            <section className="section SLIDER_SEKCIJA">
              <div className="homepage-slider-group">
                <div className="clip-top"></div>
                <div className="visible-area">
                  <Slider {...settings}>
                    <div className="slide-img slide-img-1">
                    </div>
                    <div className="slide-img slide-img-2">
                    </div>
                    <div className="slide-img slide-img-3">
                    </div>
                  </Slider>
                </div>
                <div className="visible-area-overlay slide-quotes">
                  <span
                    className="txt-rotate"
                    data-period={"2000"}
                    data-rotate={quotes_string}>
                  </span>
                </div>
                <div className="clip-bottom"></div>
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