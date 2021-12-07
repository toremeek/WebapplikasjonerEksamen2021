// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as combinationController from '@/features/combination.controller'

export default async function handler(req, res) {
  const { method } = req
  switch (method?.toLowerCase()) {
    case 'get':
      // kaller på kontrolleren som brukes til å lage random kombinason
      await combinationController.createCombination(req, res)
      break
    default:
      // gir 405 Method Not Allowed hvis brukeren prøver på noe annet
      // enn GET
      res.status(405).end()
  }
}
