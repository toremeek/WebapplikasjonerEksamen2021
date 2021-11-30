/* eslint-disable no-underscore-dangle */
import { createMocks } from 'node-mocks-http'

import { get, getDashboard } from '@/features/calender/calender.controller'
import * as calenderService from '@/features/calender/calender.service'
import * as userUtils from '@/lib/utils/user'

afterEach(() => {
  jest.clearAllMocks()
})

describe('Get calender from db - CalenderController.get(req, res)', () => {
  it('Should return badRequest if calender name is missing', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await get(req, res)
    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: false,
        error: 'Missing required parameters: name',
      })
    )
  })

  it('Should return serverError if service fails', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { name: 'Julekalender' },
    })

    const calenderServiceSpy = jest.spyOn(calenderService, 'getCalender')

    calenderServiceSpy.mockReturnValue({ success: false })

    await get(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(calenderServiceSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return 200 OK if service is success', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { name: 'Julekalender' },
    })

    const calenderServiceSpy = jest.spyOn(calenderService, 'getCalender')

    calenderServiceSpy.mockReturnValue({ success: true })

    await get(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(calenderServiceSpy).toHaveBeenCalledTimes(1)
  })
})

describe('Get calender dashboard from db - CalenderController.getDashboard(req, res)', () => {
  it('Should return badRequest if name is missing', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await getDashboard(req, res)
    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: false,
        error: 'Missing required parameters: name',
      })
    )
  })

  it('Should return forbidden if user is not admin', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        name: 'Julekalender',
      },
    })

    await getDashboard(req, res)

    expect(res._getStatusCode()).toBe(403)
  })

  it('Should return 500 error if calenderService fails', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        name: 'Julekalender',
      },
    })

    // Mocker at vi får bruker tilbake fra cokkie i userInfo
    userUtils.userInfo = jest
      .fn()
      .mockReturnValue({ admin: true, user: { username: 'James', id: 12 } })

    const calenderServiceSpy = jest.spyOn(calenderService, 'getAdminCalender')

    calenderServiceSpy.mockReturnValue({ success: false })

    await getDashboard(req, res)

    expect(res._getStatusCode()).toBe(500)
  })

  it('Should return 200 if calenderService was success', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        name: 'Julekalender',
      },
    })

    // Mocker at vi får bruker tilbake fra cokkie i userInfo
    userUtils.userInfo = jest
      .fn()
      .mockReturnValue({ admin: true, user: { username: 'James', id: 12 } })

    const calenderServiceSpy = jest.spyOn(calenderService, 'getAdminCalender')

    calenderServiceSpy.mockReturnValue({ success: true })

    await getDashboard(req, res)

    expect(res._getStatusCode()).toBe(200)
  })
})
