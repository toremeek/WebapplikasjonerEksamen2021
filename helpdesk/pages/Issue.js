import SupportItem from '@/components/SupportItem'
import axios from 'axios'
import { useRouter } from 'next/router'

const IssuePage = () => {
  const data = localStorage.getItem('item')
  const itemData = JSON.parse(data)

  //sender tilbake til allissues//
  const router = useRouter()
  const back = () => {
    router.push('AllIssues')
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
        {itemData ? <SupportItem key={itemData.id} item={itemData} /> : null}
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
