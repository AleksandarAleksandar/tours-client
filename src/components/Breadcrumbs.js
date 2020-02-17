import React from 'react'
import { routingUtils } from './../utils/routing-utils'
import { Link } from 'react-router-dom'


let Breadcrumbs = (props) => {
  let breadcrumbs = props.breadcrumbs;
  if (!Array.isArray(breadcrumbs)) {
    breadcrumbs = [];
  }
  let activeRoute = props.activeRoute;
  let id = props.id;
  let breadcrumbsMake = (id) => {
    let jsxBreadcrumbs = null;
    if (Array.isArray(breadcrumbs)) {
      jsxBreadcrumbs = breadcrumbs.map((item) => {
        let iRoute = routingUtils.getRouteData(item)
        let cl = 'breadcrumb-item'
        if (activeRoute) {
          if (iRoute.routeName === activeRoute) {
            cl += ' active'
          }
        }
        let jsx = <li key={item} className={cl}><span>{iRoute.pageTitle}</span></li>
        let path;
        if (iRoute.path) {
          if (typeof iRoute.path === 'function') {
            path = iRoute.path(id);
          } else {
            path = iRoute.path;
          }
          // jsx = <li key={item} className={cl}><a href={iRoute.path}>{iRoute.pageTitle}</a></li>
          jsx = <li key={item} className={cl}>
            <Link to={iRoute.path}>
              {iRoute.pageTitle}
            </Link>
          </li>
        }
        return jsx;
      })
    }
    return jsxBreadcrumbs;
    /*
      < li className = "breadcrumb-item" > <a href="#">Home</a></li>
        <li className="breadcrumb-item active">Starter Page</li>
    */
  }
  let jsx = breadcrumbsMake();
  return (
    <>
      <ol className="breadcrumb float-sm-right clearfix">
        {jsx}
      </ol>

    </>
  );
}
export default Breadcrumbs