const initialState = {
  backpack:  []
}

const GET_ITEMS ='GET_ITEMS'
const LOGOUT_USER = 'LOGOUT_USER'

export function getItemArr (item) {
  return {
    type: GET_ITEMS,
    payload: item
  }
}

export function clearChar () {
  return {
    type: LOGOUT_USER
  }
}

export default function reducer (state = initialState,action) {
  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state,
        item:action.payload
      }

    case LOGOUT_USER:
      return initialState

    default: return state
  }
}