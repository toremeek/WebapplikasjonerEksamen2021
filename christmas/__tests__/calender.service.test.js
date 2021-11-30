import * as dashboardDto from '@/features/admin/dashboard.dto'
import * as calenderDto from '@/features/calender/calender.dto'
import * as calenderRepository from '@/features/calender/calender.repository'
import {
  getAdminCalender,
  getCalender,
} from '@/features/calender/calender.service'

describe('getCalender(name, user)', () => {
  it('Should call get if user is undefined', () => {
    const calenderRepositoryGetSpy = jest.spyOn(calenderRepository, 'get')
    const calenderRepositoryGetUserCalenderSpy = jest.spyOn(
      calenderRepository,
      'getUsersCalendar'
    )

    getCalender('Julekalender')
    expect(calenderRepositoryGetSpy).toBeCalledTimes(1)
    expect(calenderRepositoryGetUserCalenderSpy).not.toBeCalled()
  })

  it('Should call getUserCalender if a user is passed in', () => {
    const calenderRepositoryGetSpy = jest.spyOn(calenderRepository, 'get')
    const calenderRepositoryGetUserCalenderSpy = jest.spyOn(
      calenderRepository,
      'getUsersCalendar'
    )

    getCalender('Julekalender', { id: 1, username: 'James' })
    expect(calenderRepositoryGetSpy).not.toBeCalled()
    expect(calenderRepositoryGetUserCalenderSpy).toBeCalledTimes(1)
  })

  it('Should return failure if fetching from db fails', async () => {
    const calenderRepositoryGetSpy = jest.spyOn(calenderRepository, 'get')

    calenderRepositoryGetSpy.mockReturnValue({ success: false })

    const result = await getCalender('Julekalender')

    expect(calenderRepositoryGetSpy).toBeCalled()
    expect(result).toEqual(expect.objectContaining({ success: false }))
  })

  it('Should return failure if data is missing', async () => {
    const calenderRepositoryGetSpy = jest.spyOn(calenderRepository, 'get')

    calenderRepositoryGetSpy.mockReturnValue({ success: true, data: '' })

    const result = await getCalender('Julekalender')

    expect(calenderRepositoryGetSpy).toBeCalled()
    expect(result).toEqual(expect.objectContaining({ success: false }))
  })

  it('Should return success if calender was fetched from db', async () => {
    const calenderRepositoryGetSpy = jest.spyOn(calenderRepository, 'get')
    const calenderDtoSpy = jest.spyOn(calenderDto, 'userCalender')

    calenderRepositoryGetSpy.mockReturnValue({ success: true, data: true })
    calenderDtoSpy.mockResolvedValue(jest.fn())

    const result = await getCalender('Julekalender')

    expect(calenderDtoSpy).toBeCalled()
    expect(result).toEqual(expect.objectContaining({ success: true }))
  })
})

describe('getAdminCalender(name)', () => {
  it('Should call repository', async () => {
    const calenderRepositoryGetSpy = jest.spyOn(
      calenderRepository,
      'getCalenderWithAllUsers'
    )

    await getAdminCalender('Julekalender')
    expect(calenderRepositoryGetSpy).toBeCalled()
  })

  it('Should return failure if fetching form db fails', async () => {
    const calenderRepositoryGetSpy = jest.spyOn(
      calenderRepository,
      'getCalenderWithAllUsers'
    )

    calenderRepositoryGetSpy.mockReturnValue({ success: false })

    const result = await getAdminCalender('Julekalender')

    expect(calenderRepositoryGetSpy).toBeCalled()
    expect(result).toEqual(expect.objectContaining({ success: false }))
  })

  it('Should return failure if data is missing', async () => {
    const calenderRepositoryGetSpy = jest.spyOn(
      calenderRepository,
      'getCalenderWithAllUsers'
    )

    calenderRepositoryGetSpy.mockReturnValue({ success: true, data: '' })

    const result = await getAdminCalender('Julekalender')

    expect(calenderRepositoryGetSpy).toBeCalled()
    expect(result).toEqual(expect.objectContaining({ success: false }))
  })

  it('Should return success, if adminCalender was fetched from db', async () => {
    const calenderRepositoryGetSpy = jest.spyOn(
      calenderRepository,
      'getCalenderWithAllUsers'
    )
    const dashboardDtoSpy = jest.spyOn(dashboardDto, 'dashboardDto')

    calenderRepositoryGetSpy.mockReturnValue({ success: true, data: true })
    dashboardDtoSpy.mockResolvedValue(jest.fn())

    const result = await getAdminCalender('Julekalender')

    expect(dashboardDtoSpy).toBeCalled()
    expect(result).toEqual(expect.objectContaining({ success: true }))
  })
})
