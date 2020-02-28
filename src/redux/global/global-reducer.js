
const INITIAL_STATE = {
  browserTitle: 'Initial Title',
  currentRoute: {
    pageTitle: '...'
  }

}

const globalReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'UPDATE_BROWSER_TITLE':
      return {
        ...state,
        browserTitle: action.payload
      }
    case 'UPDATE_CURRENT_ROUTE':
      return {
        ...state,
        currentRoute: action.payload
      }

    default:
      return state
  }
}
export default globalReducer