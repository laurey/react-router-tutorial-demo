const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
    // Check to see if the reducer cares about this action
    if (action.type === 'increment') {
        return {
            ...state,
            value: state.value + 1
        }
    } else if (action.type === 'decrement') {
        return { ...state, value: state.value - 1 };
    }
    // otherwise return the existing state unchanged
    return state
}

export default counterReducer