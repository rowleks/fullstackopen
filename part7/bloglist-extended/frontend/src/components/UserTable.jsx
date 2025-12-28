import { Link } from 'react-router-dom'
import { useUserResources } from '../hooks'

const UserItem = ({ user }) => {
  return (
    <>
      <tr className="table-row even:bg-gray-100">
        <td className="table-cell p-2">
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>
        <td className="table-cell text-center">{user.blogs.length}</td>
      </tr>
    </>
  )
}

const UserTable = () => {
  const users = useUserResources()

  if (!users) return null

  return (
    <>
      <table className="table w-full">
        <thead className="table-header-group p-2">
          <tr className="table-row">
            <th className="table-cell p-2"></th>
            <th className="table-cell p-2">blogs created</th>
          </tr>
        </thead>
        <tbody className="table-row-group even:bg-blue-200">
          {users.data?.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserTable
