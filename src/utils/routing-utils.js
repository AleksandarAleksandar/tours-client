import { routesData } from './routes-data'


export const routingUtils = {};

routingUtils.getRouteData = (target) => {
  let result = {
    routeName: 'NOT_FOUND',
    browserTitle: 'Not Found',
    pageTitle: '',
    breadcrumbs: []
  };
  routesData.forEach((item) => {
    if (item.routeName === target) {
      result = item
    }
  })
  return result;
}
