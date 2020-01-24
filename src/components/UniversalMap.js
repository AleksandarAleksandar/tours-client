import React from 'react'

class UniversalMap extends React.Component {
  constructor(props) {
    super(props);

    // binding this
    this._refresh_leaflet = this._refresh_leaflet.bind(this)
  }

  _refresh_leaflet() {
    let locations_arr = [];
    if (this.props.locations) {
      locations_arr = this.props.locations;
    }
    /*
    let callback_extract_ll_from_arr = function (arr) {
      arr.forEach(function (item) {
        item.coordinates
      });
    }
    */
    let callback_extract_ll_from_arr_item = function (item) {
      var ll = [item.coordinates[1], item.coordinates[0]]; // FIX za obrnuti redosled lat long...
      return ll;
    }
    let callback_tooltip_template = function (item) {
      var html = 'Day' + item.day + '; ' + item.description;
      return html;
    }

    if (this.props.ll) {
      let ll = this.props.ll;
      /*
      let lat = 0;
      let long = 0;
      */
      if (ll[0] && typeof ll[0] === 'number') {
      } else {
        ll[0] = 0;
      }
      if (ll[1] && typeof ll[1] === 'number') {
      } else {
        ll[1] = 0;
      }
      /*
      // FIX
      let original_ll = [...ll];
      ll = [original_ll[1], original_ll[0]];
      */

      window.myscript.init(ll, locations_arr, callback_extract_ll_from_arr_item, callback_tooltip_template); // inivijalizujemo/reinicijalizujemo lefalet widget
    }
  }

  componentDidMount() {
    console.log(this.props);
    this._refresh_leaflet();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate ', prevProps.ll, this.props.ll);
    console.log(this.props);
    if (this.props.ll !== prevProps.ll) {
      console.log('UPDATED props.ll');
      this._refresh_leaflet();
    }
  }

  render() {

    return (
      <div className='map-widget-group'>
        <div className="map-widget" id="map-dom-parent">
          <div id="if_you_see_me_map_is_not_rendered"></div>
        </div>
      </div>
    );
  }
};
export default UniversalMap;





