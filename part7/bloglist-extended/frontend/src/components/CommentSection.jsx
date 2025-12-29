import { useState } from 'react'
import { useCommentResources } from '../hooks'

const CommentList = ({ comment }) => {
  return (
    <>
      <li className="p-2">
        {/* <em>
          <b>{comment.user.username}</b> says -{' '}
        </em> */}
        {comment.comment}
      </li>
    </>
  )
}

const CommentForm = ({ handleSubmit }) => {
  const [value, setValue] = useState('')

  const submitComment = e => {
    e.preventDefault()
    handleSubmit(value)
    setValue('')
  }

  return (
    <>
      <form className="grid gap-1" onSubmit={submitComment}>
        <textarea
          name="comment"
          id="comment"
          value={value}
          rows={5}
          onChange={e => setValue(e.target.value)}
        ></textarea>
        <button className="create-btn" type="submit">
          Add comment
        </button>
      </form>
    </>
  )
}

const CommentSection = ({ blogId, comments }) => {
  const { create } = useCommentResources(blogId)

  const handleSubmit = comment => {
    create({ comment })
  }

  if (!comments) return null
  return (
    <>
      <div className="grid gap-6">
        <h3>Comments</h3>
        <CommentForm handleSubmit={handleSubmit} />
        <ul className="divide-y divide-gray-300">
          {comments.map(comment => (
            <CommentList comment={comment} key={comment.id} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default CommentSection
