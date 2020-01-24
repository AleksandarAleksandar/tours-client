import React, { Component } from 'react'
import { routingUtils } from './../utils/routing-utils'
import { updateBrowserTitle, updateCurrentRoute } from './../redux/global/global-actions'


/*
AdminLTE forme

uve kide ovako:

form-group > label+input

ILI

row > col-sm-4 > from-group > label+input
row > col-sm-8 > from-group > label+input

*/


export default class AdminGuidesAdd extends Component {
  componentDidMount() {
    let thisPageRoute = routingUtils.getRouteData('AP_GUIDES_ADD');
    this.props.dispatch(updateBrowserTitle(thisPageRoute.browserTitle))
    this.props.dispatch(updateCurrentRoute('AP_GUIDES_ADD'))
  }
  render() {
    return (
      <>
        <div className="col-md-12">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title"><i className="fas  fa-user-plus"></i> Add tour guide</h3>
            </div>
            <div className="card-body pad table-responsive">


              <form>
                <div className='form-group'>

                  <label>Text</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter ..."
                  />

                </div>
                <div className='form-group'>

                </div>
                <div className='form-group'>

                </div>
                <div className='form-group'>

                </div>

              </form>


            </div>

          </div>
        </div>
      </>
    )
  }
}
