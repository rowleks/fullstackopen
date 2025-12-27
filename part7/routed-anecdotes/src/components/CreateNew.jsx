/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = props => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    })
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
