import SupportItem from '@/components/SupportItem'
import styled from 'styled-components'

const SupportMain = () => {
  const data = [
    {
      id: 1,
      title: 'Title one',
      creator: 'Marius Wallin',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
      department: 'salg',
      severity: 'low',
      isResolved: false,
      createdAt: new Date(2021, 11, 22).toLocaleDateString(),
    },
    {
      id: 2,
      title: 'Title two',
      creator: 'Simen Simensen',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
      department: 'it',
      severity: 'medium',
      isResolved: false,
      createdAt: new Date(2021, 11, 6).toLocaleDateString(),
    },
    {
      id: 3,
      title: 'Title three',
      creator: 'Trude Trudesen',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
      department: 'design',
      severity: 'high',
      isResolved: false,
      createdAt: new Date(2021, 10, 12).toLocaleDateString(),
    },
  ]

  return (
    <section className="issues">
      <h2>Alle henvendelser</h2>
      <ul>
        {data?.map((issue) => (
          <SupportItem key={issue.id} item={issue} />
        ))}
      </ul>
    </section>
  )
}

export default SupportMain
