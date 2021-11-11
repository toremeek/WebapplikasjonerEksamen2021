import SupportItem from '@/components/SupportItem'
import { useRouter } from 'next/router'

const IssuePage = () => {
  const data = localStorage.getItem('item')
  const itemData = JSON.parse(data)
  console.log(itemData.id)
  //sender tilbake til allissues//
  const router = useRouter()
  const back = () => {
    router.push('AllIssues')
  }
  return (
    <>
      <section>
        {itemData ? <SupportItem key={itemData.id} item={itemData} /> : null}
        <button type="button" onClick={back}>
          Tilbake
        </button>
      </section>
    </>
  )
}

export default IssuePage
