const initialState = ''
const NotificationReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SET_NOTIFICATION' : {
        const notification = action.data
        state = notification
        return state
      }
      case 'CLEAR_NOTIFICATION' : {
        state = ''
        return state
      }
      default : return state
    }
  }

export const setNotification = (content, seconds) => {
    return dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: content,
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION',
        })
      }, seconds*1000)
    }
  }

  export default NotificationReducer