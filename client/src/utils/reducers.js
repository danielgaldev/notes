import { AUTH_SUCCESS, LOGOUT_SUCCESS } from "./actionTypes";


const AUTH_INITIAL_STATE = { user: null };

export function authReducer(state = AUTH_INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, user: action.payload };
    case LOGOUT_SUCCESS:
      return { ...AUTH_INITIAL_STATE };
    default:
      return state;
  }
}
