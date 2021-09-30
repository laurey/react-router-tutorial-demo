const initialState = { id: null, name: null, token: null }

function authReducer(state = initialState, action) {
  if (action.type === 'LOG_IN') {
    return {
      ...state,
      ...action.payload.auth
    }
  } else if (action.type === 'LOG_OUT') {
    return { id: null, name: null, token: null }
  }

  return state
}

export default authReducer
