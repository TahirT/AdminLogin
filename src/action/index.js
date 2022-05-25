
import axios from 'axios'

const quikly_UIAccessToken = 'quikly.UIaccessToken'
const logoutUrl = `http://localhost:3000/interceptor/admin/v1/logout`
const loginUrl = `http://localhost:3000/interceptor/admin/v1/login`

const setStorageItem = (key, value) => {
  return localStorage && localStorage.setItem(key, value)
}

const login = (email, password) => {
  const user = {
    email: email,
    password: password,
  }
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  return dispatch => {
    axios.post(loginUrl, user, requestOptions).then(
      response => {
        if (
          response.data.status === 'success' &&
          response.data.response.access_token
        ) {
          setStorageItem(
            quikly_UIAccessToken,
            response.data.response.access_token
          )
          dispatch({
            type: 'LOGIN_SUCCESS',
          })
        }
      },
      error => {
        dispatch({
          type: 'LOGIN_FAILED',
          payload: error,
        })
      }
    )
  }
}


const logout = () => {
  let ui_access_token = localStorage.getItem(quikly_UIAccessToken)
  const options = {
    headers: {
      Authorization: `Bearer ${ui_access_token}`,
    },
  }

  return dispatch => {
    axios
      .post(logoutUrl, {}, options)
      .then(res => {
        if (res.data.message === 'Logout complete') {
          localStorage.clear()

          dispatch({
            type: 'LOGOUT_SUCCESS',
          })
        }
      })
      .catch(err => {
        if (err.message.includes('Request failed with status code')) {
          localStorage.clear()

          dispatch({
            type: 'LOGOUT_SUCCESS',
          })
        } else {
          dispatch({
            type: 'LOGOUT_FAILED', // Not implemented Yet
            payload: err,
          })
        }
      })
  }
}

// const getTestLists = () => {
//   let access_token = localStorage.getItem(quikly_AIOToken)
//   let ui_access_token = localStorage.getItem(quikly_UIAccessToken)

//   const options = {
//     headers: {
//       Authorization: `Bearer ${ui_access_token || access_token}`,
//     },
//   }
//   return dispatch => {
//     let promise = new Promise((resolve, reject) => {
//       axios
//         .get(getTestListUrl, options)
//         .then(res => {
//           resolve(res)
//         })
//         .catch(err => {
//           reject(err)
//         })
//     })
//     promise
//       .then(data => {
//         dispatch({
//           type: 'TEST_LISTS',
//           payload: data.data.response,
//         })
//       })
//       .catch(error => {
//         dispatch({
//           type: 'NO_TEST_LISTS_AVAILABLE_FOR_THIS_USER',
//           payload: error.response.data.message,
//         })
//       })
//   }
// }

// const getTestDetails = requestId => {
//   let ui_access_token = localStorage.getItem(quikly_UIAccessToken)

//   const options = {
//     headers: {
//       Authorization: `Bearer ${ui_access_token}`,
//     },
//   }
//   return dispatch => {
//     let promise = new Promise((resolve, reject) => {
//       axios
//         .get(`${getTestDetailsUrl}/${requestId}`, options)
//         .then(res => {
//           resolve(res)
//         })
//         .catch(err => {
//           reject(err)
//         })
//     })
//     promise
//       .then(data => {
//         dispatch({
//           type: 'TEST_DETAILS',
//           payload: data.data,
//         })
//       })
//       .catch(error => {
//         // eslint-disable-next-line no-console
//         console.log('getTestDetails error===>', error)
//       })
//   }
// }

// const getTestEnhancerData = requestId => {
//   // let access_token = localStorage.getItem(quikly_AIOToken)
//   let ui_access_token = localStorage.getItem(quikly_UIAccessToken)

//   const options = {
//     headers: {
//       Authorization: `Bearer ${ui_access_token}`,
//     },
//   }
//   return dispatch => {
//     let promise = new Promise((resolve, reject) => {
//       axios
//         .get(`${getTestEnhancerUrl}/${requestId}`, options)
//         .then(res => {
//           resolve(res)
//         })
//         .catch(err => {
//           reject(err)
//         })
//     })
//     promise
//       .then(data => {
//         dispatch({
//           type: 'TEST_ENHANCER_DATA',
//           payload: data.data,
//         })
//       })
//       .catch(error => {
//         // eslint-disable-next-line no-console
//         console.log('getTestEnhancerData error===>', error)
//       })
//   }
// }

// const quicklyTestTable = row => {
//   return dispatch => {
//     dispatch({
//       type: 'SHOW_TABLE_LOADING_FOR_QUICKLY',
//       payload: row.requestId,
//     })
//   }
// }

export {
  login,
  logout,
}
