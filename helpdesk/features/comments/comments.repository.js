import prisma from '@/lib/clients/db'

// Henter alle kommentarer til en issue
export const findMany = async (issueId) => {
  try {
    console.log('here: ', issueId)
    const comments = await prisma.comment.findMany({ where: { issueId } })

    return { success: true, data: comments }
  } catch (error) {
    return { success: false, error: 'Failed finding comments' }
  }
}
