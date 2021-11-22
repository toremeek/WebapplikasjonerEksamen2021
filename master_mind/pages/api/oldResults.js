//tar i mot state ved fulllført spill og lagrer resultatet//
export default function results(req, res) {
  const resultsList = []
  const resultData = req.body

  //TODO: validere metodene
  if (req.method === 'POST') {
    // if (resultData.length === 0) {
    //   res.status(405).json({
    //     success: false,
    //     message: 'Ingen data mottatt, her har det skjedd en feil',
    //   })
    // }
    res.status(200).json({
      success: true,
      message: 'Takk, ditt resultat er mottatt',
    })
    resultsList.push(resultData)
  } else if (req.method === 'GET') {
    // if (resultsList.length > 0) {
    res.status(200).json({
      success: true,
      message: 'Her kommer resultatlisten',
      data: resultsList,
    })
    res.status(404).json({
      success: false,
      message: 'Det er ingen resultater i listen',
    })
    // }
  } else {
    req.status(400).json({
      succes: false,
      message: 'Du kan bare poste eller hente data fra dette api-et',
    })
  }
}
