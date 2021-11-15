import Alert from '@/components/shared/Alert'
import SupportItem from '@/components/SupportItem'
import axios from 'axios'
import { useRouter } from 'next/router'

const IssuePage = () => {
  const router = useRouter()
  const data = localStorage.getItem('item')
  const itemData = JSON.parse(data)

  //sender tilbake til allissues//
  const back = () => {
    console.log('clicks')
    router.back()
  }

  const handleResolved = async () => {
    try {
      await axios.put(`http://localhost:3000/api/issues/${itemData.id}`)
    } catch (err) {
      console.log('noe gikk galt', err)
    }
  }
  return (
    <>
      <section>
        {itemData ? (
          <SupportItem key={itemData.id} item={itemData} />
        ) : (
          <Alert role="danger" text="Her har det skjedd noe rart!" />
        )}
        <button type="button" onClick={back}>
          Tilbake
        </button>
        {itemData.isResolved === false ? (
          <button type="button" onClick={handleResolved}>
            Sett som løst
          </button>
        ) : null}
      </section>
    </>
  )
}

export default IssuePage
