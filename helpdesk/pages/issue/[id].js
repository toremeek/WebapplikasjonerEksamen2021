import axios from 'axios'
import { useRouter } from 'next/router'
import Issue from '../../components/issue/Issue'

const issue = {
  id: 'ckvr70ha7001878u4jjpeex92',
  isResolved: false,
  title: 'I can do that',
  description:
    "Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
  creator: 'Marius Wallin',
  severity: 1,
  created_at: '2021-11-08T21:45:00.799Z',
  departmentId: 'ckvr70ha7002078u4f374hs14',
  department: {
    name: 'IT',
  },
  _count: {
    comments: 1,
  },
}

const IssuePage = () => {
  const router = useRouter()
  const { id } = router.query

  return <Issue data={issue} />
}

export default IssuePage
