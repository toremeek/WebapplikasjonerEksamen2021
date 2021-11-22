// TODO: Riktig måte å gjøre dette på?
const dashboardUserDto = (userSlot) => {
  const { user } = userSlot

  return { ...userSlot, user: user.username }
}

const dashboardSlotDto = (slot) => {
  const { userSlots, ...slotInfo } = slot

  if (userSlots?.length <= 0) return null

  const users = userSlots.map((userSlot) => dashboardUserDto(userSlot))

  return { ...slotInfo, openBy: [...users] }
}

export const dashboardDto = (dashboard) => {
  const { slot: slotList } = dashboard
  const slots = slotList.map((slot) => dashboardSlotDto(slot))

  return { ...dashboard, slot: [...slots.filter(Boolean)] }
}
