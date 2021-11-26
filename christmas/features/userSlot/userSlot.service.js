import { getSlotById } from '../slot/slot.repository'
import { getUserById } from '../user/user.repository'
import { create, exists, getBySlotId } from './userSlot.repository'
import generateCouponCode from '@/lib/api/couponGenerator'
import { Result } from '@/lib/api/result'
import { isTimePassed } from '@/lib/dateHandler'

export const openSlot = async (slotId, user) => {
  // Henter slot fra db
  const slotFromDb = await getSlotById(slotId)

  // Sjekker om denne finnes
  if (!slotFromDb.success) return Result.failure(slotFromDb.error)
  if (!slotFromDb?.data)
    return Result.failure(`Slot with id: ${slotId} does not exist!`)
  // Sjekke om dato er forbi åpningsdato
  if (!isTimePassed(slotFromDb.data.openAt))
    return Result.failure('Not allowed to open a slot before its date')

  // Henter bruker fra db
  const userFromDb = await getUserById(user.id)

  // Sjekker om denne finnes
  if (!userFromDb.success) return Result.failure(userFromDb.error)
  if (!userFromDb?.data)
    return Result.failure(`User with id: ${user.id} does not exist!`)

  // Sjekke om luken allerede er åpnet?
  const userSlot = await exists(slotId, user.id)

  if (!userSlot.success) return Result.failure(userSlot.error)
  if (userSlot?.data)
    return Result.failure(`Slot with id: ${slotId} has allready been opend!`)

  const coupon = generateCouponCode()

  // Lager en ny userSlot (åpen luke)
  const { success, data, error } = await create(slotId, user.id, coupon)

  if (!success) return Result.failure(error)

  return Result.success(data)
}

export const getSuperBonusWinner = async (id) => {
  const { success, data, error } = await getBySlotId(id)

  if (!success) return Result.failure(error)
  if (data?.length <= 0)
    return Result.failure(`Slot with id: ${id} has no participants.`)

  const winner = data[Math.floor(Math.random() * data.length)]

  const user = winner.user.username

  return Result.success({ winner: user })
}
