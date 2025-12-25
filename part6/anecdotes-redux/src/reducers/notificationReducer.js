import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { vote: '', add: '' },
  reducers: {
    setVoteNotif(state, action) {
      state.vote = action.payload
    },
    setAddNotif(state, action) {
      state.add = action.payload
    },
    resetNotif(state) {
      state.vote = ''
      state.add = ''
    },
  },
})

export const { setAddNotif, setVoteNotif, resetNotif } =
  notificationSlice.actions
export default notificationSlice.reducer
