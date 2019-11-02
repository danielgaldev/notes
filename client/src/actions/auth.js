const baseURL = 'http://localhost:8000/api/v1/';

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'USER_LOADING' });

    const token = getState().auth.token;

    let headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch(baseURL.concat('auth/user/'), { headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'USER_LOADED', user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({ type: 'AUTHENTICATION_ERROR', data: res.data });
          throw res.data;
        }
      })
  }
}

export const login = (username, password) => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ username, password });

    return fetch(baseURL.concat('auth/login/'), { headers, body, method: "POST" })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'LOGIN_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        } else {
          dispatch({ type: "LOGIN_FAILED", data: res.data });
          throw res.data;
        }
      })
  }
}

export const register = (username, password) => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ username, password });

    return fetch(baseURL.concat('auth/register/'), { headers, body, method: "POST" })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'REGISTRATION_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        } else {
          dispatch({ type: "REGISTRATION_FAILED", data: res.data });
          throw res.data;
        }
      })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };

    let token = getState().auth.token;
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(baseURL.concat('auth/logout/'), { headers, method: "GET" })
      .then(res => {
        if (res.status < 500) {
          return res;
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'LOGOUT_SUCCESSFUL' });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      })
  }
}
