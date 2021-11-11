const issueCreateDto = ({
  title,
  description,
  creator,
  severity,
  department,
}) => ({
  issue: {
    title,
    description,
    creator,
    severity,
  },
  department,
})

export default issueCreateDto
