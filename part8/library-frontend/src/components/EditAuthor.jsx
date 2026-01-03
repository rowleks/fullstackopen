import Select from 'react-select'
import { useMutation, useQuery } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_AUTHORS_NAMES } from '../queries'
import { useState } from 'react'

const EditAuthor = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const { loading, error, data } = useQuery(ALL_AUTHORS_NAMES)

  const options = data?.allAuthors.map(a => ({
    value: a.name,
    label: a.name,
  }))

  const onSubmit = event => {
    event.preventDefault()

    if (!event.target.author.value || !event.target.born.value) {
      return
    }

    editAuthor({
      variables: {
        name: selectedOption.value,
        setBornTo: Number(event.target.born.value),
      },
      onCompleted: () => {
        setSelectedOption(null)
        event.target.born.value = ''
      },
    })
  }

  return (
    <>
      <h3>Edit author</h3>
      <form className="space-y-2" onSubmit={onSubmit}>
        <label>
          Name
          <Select
            className="basic-single"
            classNamePrefix="Select"
            isLoading={loading}
            options={options}
            value={selectedOption}
            onChange={option => setSelectedOption(option)}
            isDisabled={error}
            placeholder={loading ? 'Loading authors...' : 'Select author'}
            name="author"
          />
        </label>
        <label>
          Born
          <input type="number" name="born" required />
        </label>
        <button type="submit">Update author</button>
      </form>
    </>
  )
}

export default EditAuthor
