import { routingUtils } from './../../utils/routing-utils'
// import { updateBrowserTitle } from './../redux/global/global-actions'

// TODO: napraviti univerzalni deo za breadcrumbs i header admin panel stranice atrnice. upisati podatke o sttranicama u state reducera...

export const updateCurrentRoute = (routeName) => {
  let thisPageRoute = routingUtils.getRouteData(routeName);
  return (
    {
      type: 'UPDATE_CURRENT_ROUTE',
      payload: thisPageRoute
    }
  )
}

export const updateBrowserTitle = (title) => {
  return (
    {
      type: 'UPDATE_BROWSER_TITLE',
      payload: title
    }
  )
}
