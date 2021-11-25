import { useState } from 'react'

import { useCalenderContext } from '../context/CalenderContext'
// import Slot from './slot/Slot'
import { formatDate } from '../lib/dateHandler'
import AdminModal from './AdminModal'

let randomNum = Math.floor(Math.random() * dummyOjekt.slot.length)

const DashboardItems = () => {
  const { state } = useCalenderContext()
  const [showAdminModal, setShowAdminModal] = useState(false)
  const { users } = useUser()
  //console.log(users)
  const { slot } = dummyOjekt
  const { username } = slot[randomNum]

  const openModal = () => {
    setShowAdminModal(true)
  }

  console.log(state)

  return (
    <section>
      {slot?.map((obj, index) => (
        <>
          <div className="dashboarditems">
            <h1>Luke: {obj.order}</h1>
            <p>Tilgjengelig fra {formatDate(obj.openAt)}</p>
            <div className="dashboard-options">
              <p>Se alle deltakere ({slot.length})</p>
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
                {slot.slice(0, 3).map((user, i) => (
                  <tr key={i}>
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
