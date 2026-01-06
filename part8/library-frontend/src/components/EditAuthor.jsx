import Select from 'react-select'
import { useMutation, useQuery } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_AUTHORS_NAMES } from '../queries'
import { useState } from 'react'

const EditAuthor = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const { loading, error, data } = useQuery(ALL_AUTHORS_NAMES)

  const options = data?.allAuthors
    ? data.allAuthors.map(a => ({
        value: a.name,
        label: a.name,
      }))
    : []

  const onSubmit = event => {
    event.preventDefault()

    if (!selectedOption || !born) {
      return
    }

    editAuthor({
      variables: {
        name: selectedOption.value,
        setBornTo: Number(born),
      },
      onCompleted: () => {
        setSelectedOption(null)
        setBorn('')
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
          <input
            type="number"
            name="born"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            required
          />
        </label>
        <button type="submit">Update author</button>
      </form>
    </>
  )
}

export default EditAuthor
