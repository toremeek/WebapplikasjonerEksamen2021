import { prismaMock } from '../__mocks__/prismaMock'
import {
  get,
  getUsersCalendar,
  getCalenderWithAllUsers,
} from '@/features/calender/calender.repository'

describe('get(name)', () => {
  it('Should throw error if prisma fails', async () => {
    prismaMock.calender.findUnique.mockImplementation(() => {
      throw new Error('Prisma fail')
    })

    const result = await get('Julekalenders')

    expect(result).toEqual(expect.objectContaining({ success: false }))
  })

  it('Should return success result if db query is fine', async () => {
    prismaMock.calender.findUnique.mockResolvedValue({ calender: true })

    const result = await get('Julekalenders')

    expect(result).toEqual(expect.objectContaining({ success: true }))
  })
})

describe('getUsersCalendar(name, userId)', () => {
  it('Should return failure if userId is falsy', async () => {
    const result = await getUsersCalendar('Julekalender')

    expect(result).toEqual(expect.objectContaining({ success: false }))
  })

  it('Should throw error if prisma fails', async () => {
    prismaMock.calender.findUnique.mockImplementation(() => {
      throw new Error('Prisma fail')
    })

    const result = await getUsersCalendar('Julekalenders', 'abc123')

    expect(result).toEqual(expect.objectContaining({ success: false }))
  })

  it('Should return success result if db query is fine', async () => {
    prismaMock.calender.findUnique.mockResolvedValue({ calender: true })

    const result = await getUsersCalendar('Julekalenders', 'abc123')

    expect(result).toEqual(expect.objectContaining({ success: true }))
  })
})

describe('getCalenderWithAllUsers(name)', () => {
  it('Should return failure if name is falsy', async () => {
    const result = await getCalenderWithAllUsers()

    expect(result).toEqual(expect.objectContaining({ success: false }))
  })

  it('Should throw error if prisma fails', async () => {
    prismaMock.calender.findUnique.mockImplementation(() => {
      throw new Error('Prisma fail')
    })

    const result = await getCalenderWithAllUsers('Julekalenders')

    expect(result).toEqual(expect.objectContaining({ success: false }))
  })

  it('Should return success result if db query is fine', async () => {
    prismaMock.calender.findUnique.mockResolvedValue({ calender: true })

    const result = await getCalenderWithAllUsers('Julekalenders')

    expect(result).toEqual(expect.objectContaining({ success: true }))
  })
})
