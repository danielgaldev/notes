const baseURL = 'http://localhost:8000/api/v1/'


export const fetchSemesters = () => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(baseURL.concat('semesters/'), { headers, })
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
          return dispatch({ type: 'FETCH_SEMESTERS', semesters: res.data });
        } else if (res.status === 401 || res.status === 403) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      })
  }
}


export const addSemester = number => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ number, });
    let { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(baseURL.concat('semesters/'), { headers, method: "POST", body })
      .then(res => res.json())
      .then(semester => {
        return dispatch({
          type: 'ADD_SEMESTER',
          semester
        })
      })
  }
}


export const deleteSemester = index => {
  return (dispatch, getState) => {

    let headers = { "Content-Type": "application/json" };
    let { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let semId = getState().semesters[index].id;

    let url = baseURL.concat(`semesters/${semId}/`)

    return fetch(url, { headers, method: "DELETE" })
      .then(res => {
        if (res.status === 204) {
          return { status: res.status, data: {} };
        } else if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 204) {
          return dispatch({ type: 'DELETE_SEMESTER', index });
        } else if (res.status === 401 || res.status === 403) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
          throw res.data;
        }
      })
  }
}


export const removeAllSemesters = () => {
  return dispatch => {
    dispatch({ type: 'REMOVE_ALL_SEMESTERS' });
  }
}