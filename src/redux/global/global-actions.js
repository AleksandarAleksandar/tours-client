import { routingUtils } from './../../utils/routing-utils'

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
