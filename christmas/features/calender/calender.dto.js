const slotDto = (slot) => {
  const { userSlots, ...slotInfo } = slot

  const open = userSlots?.length > 0

  return { ...slotInfo, isOpen: open }
}

export const userCalender = (calender) => {
  const { slot: slotList } = calender

  const slots = slotList.map((slot) => slotDto(slot))

  return { ...calender, slot: [...slots] }
}
