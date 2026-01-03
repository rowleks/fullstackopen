const AuthorList = ({ authors }) => {
  return (
    <>
      {authors.map(a => (
        <tr key={a.id}>
          <td>{a.name}</td>
          <td>{a.born}</td>
          <td>{a.bookCount}</td>
        </tr>
      ))}
    </>
  )
}

const Authors = () => {
  const authors = [
    { id: '1', name: 'Robert Martin', born: 1952, bookCount: 2 },
    { id: '2', name: 'Martin Fowler', born: 1963, bookCount: 1 },
    { id: '3', name: 'Fyodor Dostoevsky', born: 1821, bookCount: 2 },
    { id: '4', name: 'Joshua Kerievsky', born: null, bookCount: 1 },
    { id: '5', name: 'Sandi Metz', born: null, bookCount: 1 },
  ]

  return (
    <div>
      <h2>authors</h2>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          <AuthorList authors={authors} />
        </tbody>
      </table>
    </div>
  )
}

export default Authors
