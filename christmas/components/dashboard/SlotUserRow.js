import { formatDate } from '@/lib/dateHandler'

const SlotUserRow = ({ user }) => (
  <tr>
    <td>{user.id}</td>
    <td>{user.user}</td>
    <td>{formatDate(user.createdAt)}</td>
    <td>{user.coupon}</td>
  </tr>
)

export default SlotUserRow
