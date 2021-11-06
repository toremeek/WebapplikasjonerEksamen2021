// TODO: Oppdatere med riktig default error navn
// Trenger vi å logge hvorfor feil har oppstått?
export const Response = (res) => ({
  ok: (data) => res.status(200).json({ success: true, data }),
  created: (data) => res.status(201).json({ success: true, data }),
  badRequest: (error = 'Dataen du har fylt ut innholder feil') =>
    res.status(400).json({ success: false, error }),
  conflict: (error = 'Ressursen finnes allerede') =>
    res.status(409).json({ success: false, error }),
  serverError: (error = 'Forespørselen feilet') =>
    res.status(500).json({ success: false, error }),
})
