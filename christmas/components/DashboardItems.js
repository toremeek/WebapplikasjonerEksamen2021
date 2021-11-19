import { useCalender } from '../context/CalenderContext'
import Slot from './slot/Slot'
import { formatDate } from '../lib/dateHandler'
import { useState } from 'react'
import AdminModal from './AdminModal'
import { useUser } from '@/hooks/useUser'

const dummyOjekt = {
  name: 'dummy',
  slot: [
    {
      slotId: 1,
      userId: 30,
      username: 'trude',
      participationDate: '11.06.2021',
      cupon: 'abcd1234',
    },
    {
      slotId: 2,
      userId: 31,
      username: 'markus',
      participationDate: '11.06.2021',
      cupon: 'abcd1234',
    },
    {
      slotId: 3,
      userId: 32,
      username: 'tom',
      participationDate: '15.06.2021',
      cupon: 'abcd1234',
    },
    {
      slotId: 4,
      userId: 33,
      username: 'trude',
      participationDate: '22.06.2021',
      cupon: 'abcd1234',
    },
    {
      slotId: 5,
      userId: 34,
      username: 'tom',
      participationDate: '21.06.2021',
      cupon: 'abcd1234',
    },
    {
      slotId: 6,
      userId: 34,
      username: 'lars',
      participationDate: '18.06.2021',
      cupon: 'abcd1234',
    },
  ],
}

let randomNum = Math.floor(Math.random() * dummyOjekt.slot.length)

const DashboardItems = () => {
  const { state } = useCalender()
  const [showAdminModal, setShowAdminModal] = useState(false)
  const { users } = useUser()
  //console.log(users)
  const { slot } = dummyOjekt
  const { username } = slot[randomNum]

  const openModal = () => {
    setShowAdminModal(true)
  }

  return (
    <section>
      {state?.slot?.map((obj, index) => (
        <>
          <div className="dashboarditems">
            <h1>Luke: {obj.order}</h1>
            <p>Tilgjengelig fra {formatDate(obj.openAt)}</p>
            <div className="dashboard-options">
              <p>Se alle deltakere ({dummyOjekt.slot.length})</p>
              <p onClick={openModal}>Trekk superbonus</p>
              <AdminModal
                showAdminModal={showAdminModal}
                setShowAdminModal={setShowAdminModal}
                username={username}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Brukernavn</th>
                  <th>Dato for deltakelse</th>
                  <th>Kode</th>
                </tr>
              </thead>
              <tbody>
                {dummyOjekt.slot.slice(0, 3).map((user) => (
                  <tr>
                    <td>{user.slotId}</td>
                    <td>{user.username}</td>
                    <td>{user.participationDate}</td>
                    <td>{user.cupon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ))}
    </section>
  )
}
export default DashboardItems
