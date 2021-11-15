import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  const { method } = req

  switch (method.toUpperCase()) {
    case 'GET': {
      const users = await prisma.user.findMany()

      return res.status(200).json({ success: true, users })
    }
    default:
      return res.status(405).end()
  }
}
