/* eslint-disable no-ternary */
import { useState } from 'react'

import Alert from '../shared/Alert'
import SlotUserRow from './SlotUserRow'
import useApi from '@/hooks/useApi'
import { formatDate } from '@/lib/dateHandler'

const DashboardSlot = ({ data, modalHandler }) => {
  const { id, order, openAt, openBy } = data
  const { setWinner, displayModal } = modalHandler
  const [showMore, setShowMore] = useState(false)
  const { get, error } = useApi()

  // Velger superbonus for luke - Dette kunne vi videre ha lagret i database.
  const superBonus = async () => {
    const response = await get(`slots/${id}/superbonus`)

    if (!error) {
      setWinner({ order, user: response.winner })
      displayModal()
    }
  }

  const moreClickHandler = () => setShowMore(true)
  const clickPickSuperBonus = () => superBonus()

  return (
    <article>
      <h1>Luke: {order}</h1>
      <p>Tilgjengelig fra {formatDate(openAt)}</p>
      <p>
        <button onClick={moreClickHandler}>
          Se alle deltakelser ({openBy?.length})
        </button>
        <button onClick={clickPickSuperBonus}>Trekk superbonus</button>
      </p>
      {error ? <Alert role="danger" text={error} /> : null}
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
          {showMore
            ? openBy.map((user, i) => <SlotUserRow key={i} user={user} />)
            : openBy
                .slice(0, 3)
                .map((user, i) => <SlotUserRow key={i} user={user} />)}
        </tbody>
      </table>
    </article>
  )
}

export default DashboardSlot
