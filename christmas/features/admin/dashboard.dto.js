// Bruket is dashboardSlot
const dashboardUser = (userSlot) => {
  const { user } = userSlot

  return { ...userSlot, user: user.username }
}

// Bruker i dashboardDTO
const dashboardSlot = (slot) => {
  const { userSlots, ...slotInfo } = slot

  if (userSlots?.length <= 0) return null

  const users = userSlots.map((userSlot) => dashboardUser(userSlot))

  return { ...slotInfo, openBy: [...users] }
}

// Dashbord DTO
export const dashboardDto = (dashboard) => {
  const { slot: slotList } = dashboard
  const slots = slotList.map((slot) => dashboardSlot(slot))

  return { ...dashboard, slot: [...slots.filter(Boolean)] }
}
