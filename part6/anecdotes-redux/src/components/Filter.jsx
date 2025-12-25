import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = e => {
    dispatch(filterChange(e.target.value))
  }

  return (
    <div>
      <span>Filter </span>
      <input type="text" onChange={handleChange} />
    </div>
  )
}

export default Filter
