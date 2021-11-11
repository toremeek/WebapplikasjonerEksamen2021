import { useRouter } from 'next/router'

const Issue = () => {
  return (
    <>
      {JSON.stringify(localStorage.getItem('item'))}
      <h1>hei</h1>
    </>
  )
}

export default Issue
