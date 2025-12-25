const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload
    default:
      return state
  }
}

const filterChange = filter => {
  return {
    type: 'FILTER',
    payload: filter,
  }
}

export { filterChange }

export default reducer
