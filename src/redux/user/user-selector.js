import {createSelector} from 'reselect'

const selectUser = state => state.user


export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.auth
)
export const selectUsersLocation = createSelector(
  [selectUser],
  user => user.userLocation
)
export const selectUsers = createSelector(
  [selectUser],
  user => user.users
)