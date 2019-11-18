import axios from '../utils/session';
import { AUTH_SUCCESS, AUTH_FAIL, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL } from './actionTypes';


export const getUser = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/v1/me/');
    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data
    });
  } catch (e) {
    dispatch({
      type: AUTH_FAIL,
      payload: e
    });
  }
}

export const login = (username, password) => async (dispatch) => {
  try {
    await axios.post('/api/v1/login/', { username, password });
    // history push /
    dispatch(getUser());
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL,
      payload: e
    });
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/api/v1/logout/');
    // history push /
    dispatch({
      type: LOGOUT_SUCCESS
    });
  } catch (e) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: e
    });
  }
}
