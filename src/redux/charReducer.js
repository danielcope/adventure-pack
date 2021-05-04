const initialState = {
  character: [
  ]
}

const GET_CHARACTER = 'GET_CHARACTER'
const LOGOUT_USER = 'LOGOUT_USER'

export function getCharacterArr (char) {

  return{
    type: GET_CHARACTER,
    payload:char
  }
}

export function clearChar () {
  return {
    type: LOGOUT_USER
  }
}


export default function reducer (state = initialState,action) {
  switch (action.type) {
    case GET_CHARACTER:
      return {
        ...state,
        character:action.payload
      }

    case LOGOUT_USER:
      return initialState

      default: return state
  }
}
