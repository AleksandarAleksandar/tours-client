import { createSelector } from 'reselect'


const selectGlobal = state => state.global

export const selectCurrentRoute = createSelector(
  [selectGlobal],
  global => global.currentRoute
)
export const selectBrowserTitle = createSelector(
  [selectGlobal],
  global => global.browserTitle
)