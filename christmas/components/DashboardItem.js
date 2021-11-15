import axios from 'axios'
import { useEffect, useState } from 'react'
import AdminModal from './AdminModal'
import { useUser } from '@/hooks/useUser'

const DashboardItem = () => {
  const [modal, setModal] = useState(false)
  const { users } = useUser()

  var random_index = Math.floor(Math.random() * users.length)
  // var randomUser = users[random_index].username
  // console.log(randomUser)

  console.log(users)

  const showModal = () => {
    setModal((prev) => !prev)
  }

  return (
    <>
      <AdminModal modal={modal} setModal={setModal} />

      <section>
        <div className="dashboard">
          <h2>Luke 1</h2>
          <p>Tilgjengelig fra: 05.12.2022</p>
          <div className="dashboard-options">
            <span>Se alle deltakere</span>
            <button onClick={showModal}>Trekk superbonus</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Brukernavn</th>
                <th>Dato</th>
                <th>Kode</th>
              </tr>
            </thead>
            {users.slice(0, 3).map((user) => (
              <>
                <tbody>
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.createdAt}</td>
                    <td>{user.slug}</td>
                    <td></td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </section>
    </>
  )
}

export default DashboardItem
