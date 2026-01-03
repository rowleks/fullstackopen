const BookList = ({ books }) => {
  return (
    <>
      {books.map(a => (
        <tr key={a.id}>
          <td>{a.title}</td>
          <td>{a.author}</td>
          <td>{a.published}</td>
        </tr>
      ))}
    </>
  )
}

const Books = () => {
  const books = [
    { id: '1', title: 'Clean Code', author: 'Robert Martin', published: 2008 },
    {
      id: '2',
      title: 'Agile software development',
      author: 'Robert Martin',
      published: 2002,
    },
    {
      id: '3',
      title: 'Refactoring, edition 2',
      author: 'Martin Fowler',
      published: 2018,
    },
  ]

  return (
    <div>
      <h2>books</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          <BookList books={books} />
        </tbody>
      </table>
    </div>
  )
}

export default Books
