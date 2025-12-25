import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '' },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    resetMessage(state) {
      state.message = ''
    },
  },
})

const { setMessage, resetMessage } = notificationSlice.actions

let timeoutId = null

export const setNotification = (msg, timeout) => dispatch => {
  dispatch(setMessage(msg))

  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  timeoutId = setTimeout(() => {
    dispatch(resetMessage())
  }, timeout * 1000)
}
export default notificationSlice.reducer
