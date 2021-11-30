/* eslint-disable camelcase */

// Bruke når det legges til en henvendelse
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

// Brukes ifb. med dto under.
const commentGetDto = ({ id, comment, created_at }) => ({
  id,
  comment,
  created: created_at,
})

// Fjerner unødvendig informasjon og nesting i resultatet som kommer fra databasen
const issueGetDto = ({
  id,
  isResolved,
  title,
  department: { name },
  description,
  creator,
  severity,
  created_at,
  comments,
}) => ({
  id,
  isResolved,
  title,
  description,
  creator,
  severity,
  created: created_at,
  department: name,
  comments: comments.map((comment) => commentGetDto(comment)),
})

export { issueGetDto, issueCreateDto }
