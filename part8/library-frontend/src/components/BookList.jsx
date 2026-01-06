const BookList = ({ books }) => {
  return (
    <>
      {books.map(b => (
        <tr key={b.id}>
          <td className="max-w-48">{b.title}</td>
          <td>{b.author.name}</td>
          <td>{b.published}</td>
        </tr>
      ))}
    </>
  )
}

export default BookList
