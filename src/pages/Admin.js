import React, { Component } from 'react'
// import { routesData } from './../utils/routes-data'
import { routingUtils } from './../utils/routing-utils'
import Breadcrumbs from './../components/Breadcrumbs'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AdminWelcome from './../components/AdminWelcome'
import AdminGuidesList from './../components/AdminGuidesList'
import AdminGuidesAdd from '../components/AdminGuidesAdd'
import AdminToursForm from './../components/AdminToursForm'
import AdminToursList from './../components/AdminToursList'
import AdminNotFound from './../components/AdminNotFound'
import { selectCurrentUser } from './../redux/user/user-selector'
import { selectCurrentRoute } from './../redux/global/global-selector'
import { createStructuredSelector } from 'reselect'



class Admin extends Component {
  render() {
    console.log(this.props);
    // let id = this.props.match.params.id; // path='/category/:id'
    let match = this.props.match;
    let dispatch = this.props.dispatch;

    let thisPageRoute = routingUtils.getRouteData('HOME');
    // let breadcrumbs = thisPageRoute.breadcrumbs;
    // let activeRoute = thisPageRoute.routeName;

    // let pageTitle = thisPageRoute.pageTitle;
    let pageTitle = '...';
    let currentRoute = this.props.currentRoute;
    pageTitle = currentRoute.pageTitle;

    let activeRoute = currentRoute.routeName;
    // zastita od slucaja da breadcrumbs nije spreman je ugradjena u Breqacrumbs komponentu
    let breadcrumbs = currentRoute.breadcrumbs;




    /*
    <li className="nav-item">
      <a href="#" className="nav-link active">
        <i className="far fa-circle nav-icon"></i>
        <p>Active Page</p>
      </a>
    </li>
    <li className="nav-item">
      <a href="#" className="nav-link">
        <i className="far fa-circle nav-icon"></i>
        <p>Inactive Page</p>
      </a>
    </li>
    */
    let menuOptions = [
      {
        routeName: 'AP',
        title: 'Admin Panel',
        path: '/admin'
      },
      {
        routeName: 'AP_GUIDES_LIST',
        title: 'Guides List',
        path: '/admin/guides'
      },
      {
        routeName: 'AP_GUIDES_ADD',
        title: 'Guides Add',
        path: '/admin/guides/add',
        icon: 'fas fa-user-plus'
      },
      {
        routeName: 'AP_TOURS_LIST',
        title: 'Tour List',
        path: '/admin/tours/list',
        icon: 'fas fa-list-alt'
      },
      {
        routeName: 'AP_TOURS_ADD',
        title: 'Tour Add',
        path: '/admin/tours/add',
        icon: 'fas fa-user-plus'
      },
      {
        routeName: 'PLACEHOLDER0001',
        title: 'Tours',
        path: '/admin/tours',
        icon: 'fas fa-list'
      },
      {
        routeName: 'PLACEHOLDER0002',
        title: 'Reviews',
        path: '/admin/reviews',
        icon: 'far fa-commenting'
      }
    ];
    let jsxSidebarMenu = menuOptions.map((item) => {
      let cl = 'nav-link'
      if (activeRoute === item.routeName) {
        cl += ' active'
      }
      let cl_icon = "far fa-circle nav-icon";
      if (item.icon) {
        cl_icon = item.icon + " nav-icon";
      }
      return (
        <li key={item.routeName} className="nav-item">
          <Link to={item.path} className={cl}>
            <i className={cl_icon}></i>
            <p>{item.title}</p>
          </Link>
        </li>
      );
    })


    let nickname = this.props.auth.me.nickname;
    let avatar_src = '/static/img/users/avatar5.png';

    return (
      <>
        <div className="wrapper adminlte">


          <nav className="main-header navbar navbar-expand navbar-dark navbar-teal">

            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">Contact</a>
              </li>
            </ul>



            <ul className="navbar-nav ml-auto">

              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                  <i className="far fa-comments"></i>
                  <span className="badge badge-danger navbar-badge">3</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <a href="#" className="dropdown-item">

                    <div className="media">
                      <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                      <div className="media-body">
                        <h3 className="dropdown-item-title">
                          Brad Diesel
                  <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                        </h3>
                        <p className="text-sm">Call me whenever you can...</p>
                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                      </div>
                    </div>

                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">

                    <div className="media">
                      <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                      <div className="media-body">
                        <h3 className="dropdown-item-title">
                          John Pierce
                  <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                        </h3>
                        <p className="text-sm">I got your message bro</p>
                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                      </div>
                    </div>

                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">

                    <div className="media">
                      <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                      <div className="media-body">
                        <h3 className="dropdown-item-title">
                          Nora Silvester
                  <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                        </h3>
                        <p className="text-sm">The subject goes here</p>
                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                      </div>
                    </div>

                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                  <i className="far fa-bell"></i>
                  <span className="badge badge-warning navbar-badge">15</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <span className="dropdown-header">15 Notifications</span>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-envelope mr-2"></i> 4 new messages
            <span className="float-right text-muted text-sm">3 mins</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-users mr-2"></i> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-file mr-2"></i> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                </div>
              </li>


              <li className="nav-item dropdown user-menu">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                  <img src={avatar_src} className="user-image img-circle elevation-2" alt="User Image" />
                  <span className="d-none d-md-inline">{nickname}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">

                  <li className="user-header bg-primary">
                    <img src={avatar_src} className="img-circle elevation-2" alt="User Image" />

                    <p>
                      {nickname} - Web Developer <small>Member since Nov. 2012</small>
                    </p>
                  </li>

                  <li className="user-body">
                    <div className="row">
                      <div className="col-4 text-center">
                        <a href="#">Followers</a>
                      </div>
                      <div className="col-4 text-center">
                        <a href="#">Sales</a>
                      </div>
                      <div className="col-4 text-center">
                        <a href="#">Friends</a>
                      </div>
                    </div>

                  </li>

                  <li className="user-footer">
                    <a href="#" className="btn btn-default btn-flat">Profile</a>
                    <Link className="btn btn-default btn-flat float-right" to='/logout'>Logout</Link>
                  </li>
                </ul>
              </li>


              <li className="nav-item">
                <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#"><i
                  className="fas fa-th-large"></i></a>
              </li>
            </ul>
          </nav>






          <aside className="main-sidebar sidebar-dark-primary elevation-4">

            <a href="index3.html" className="brand-link">
              <img src="/static/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
                style={{ opacity: 0.8 }} />
              <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            <div className="sidebar">

              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                  <img src={avatar_src} className="img-circle elevation-2" alt="User Image" />
                </div>
                <div className="info">
                  <a href="#" className="d-block">{nickname}</a>
                </div>
              </div>


              <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                  <li className="nav-item has-treeview menu-open">
                    <a href="#" className="nav-link active">
                      <i className="nav-icon fas fa-tachometer-alt"></i>
                      <p>
                        Starter Pages
                <i className="right fas fa-angle-left"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      {jsxSidebarMenu}

                    </ul>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-th"></i>
                      <p>
                        Simple Link
                <span className="right badge badge-danger">New</span>
                      </p>
                    </a>
                  </li>
                </ul>
              </nav>

            </div>

          </aside>



          <div className="content-wrapper">
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0 text-dark">{pageTitle}</h1>
                  </div>
                  <div className="col-sm-6">

                    <Breadcrumbs breadcrumbs={breadcrumbs} activeRoute={activeRoute} />

                  </div>
                </div>
              </div>
            </section>
            <section className="content">
              <Switch>
                <Route exact path={`${match.path}`}>
                  <>
                    <AdminWelcome dispatch={this.props.dispatch} />
                  </>
                </Route>
                <Route exact path={`${match.path}/guides`}>
                  <>
                    <AdminGuidesList dispatch={this.props.dispatch} />
                  </>
                </Route>
                <Route exact path={`${match.path}/guides/add`}>
                  <>
                    <AdminGuidesAdd dispatch={this.props.dispatch} />
                  </>
                </Route>

                <Route exact path={`${match.path}/tours/add`}
                  render={(props) => {
                    return (
                      <AdminToursForm match={props.match} mode={'CREATE'} dispatch={dispatch} />
                    );
                  }}
                />
                <Route path={`${match.path}/tours/edit/:id`}
                  render={(props) => {
                    return (
                      <AdminToursForm match={props.match} mode={'UPDATE'} dispatch={dispatch} />
                    );
                  }}
                />

                <Route exact path={`${match.path}/tours/list`}>
                  <>
                    <AdminToursList dispatch={this.props.dispatch} />
                  </>
                </Route>
                <Route>
                  <>
                    <AdminNotFound dispatch={this.props.dispatch} />
                  </>
                </Route>
              </Switch>


            </section>
          </div>



          <aside className="control-sidebar control-sidebar-dark">

            <div className="p-3">
              <h5>Title</h5>
              <p>Sidebar content</p>
            </div>
          </aside>

          <footer className="main-footer">
            <div className="float-right d-none d-sm-inline">AdminLTE 3.0.1</div>

            <span><strong>Copyright &copy; 2014-2019 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reservedy</span>

          </footer>

        </div>
      </>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  auth: selectCurrentUser, //naming???
  currentRoute: selectCurrentRoute
})

export default connect(mapStateToProps)(Admin);
