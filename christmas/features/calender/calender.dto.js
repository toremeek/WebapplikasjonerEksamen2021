const slotDto = (slot) => {
  const { userSlots, ...slotInfo } = slot

  if (!userSlots) return { ...slotInfo }

  const open = userSlots?.length > 0
  const { coupon } = userSlots[0] || ''

  return { ...slotInfo, isOpen: open, coupon }
}

export const userCalender = (calender) => {
  const { slot: slotList } = calender

  const slots = slotList.map((slot) => slotDto(slot))

  return { ...calender, slot: [...slots] }
}
