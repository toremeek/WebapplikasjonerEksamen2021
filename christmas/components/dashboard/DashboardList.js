import Alert from '../shared/Alert'
import DashboardSlot from './DashboardSlot'
import { useCalenderContext } from '@/context/CalenderContext'

const DashboardList = ({ modalHandler }) => {
  const {
    state: { dashboard },
  } = useCalenderContext()

  const { slot } = dashboard || []

  if (slot?.length <= 0)
    return <Alert role="danger" text="Finner ingen dager i databasen!" />

  return (
    <>
      {slot?.map((slotData, index) => (
        <DashboardSlot
          key={index}
          data={slotData}
          modalHandler={modalHandler}
        />
      ))}
    </>
  )
}

export default DashboardList
