import { formatDate } from '@/lib/dateHandler'

const DashboardSlot = ({ data }) => {
  const { order, openAt, openBy } = data

  return (
    <article>
      <h1>Luke: {order}</h1>
      <p>Tilgjengelig fra {formatDate(openAt)}</p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Brukernavn</th>
            <th>Åpnet luke</th>
            <th>Kode</th>
          </tr>
        </thead>
        <tbody>
          {openBy.slice(0, 3).map((user, i) => (
            <tr key={i}>
              <td>{user.id}</td>
              <td>{user.user}</td>
              <td>{formatDate(user.createdAt)}</td>
              <td>{user.coupon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}

export default DashboardSlot
