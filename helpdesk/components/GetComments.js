import useGetData from '@/hooks/useGetData'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
/* eslint-disable no-ternary */

const StyledUl = styled.ul`
  margin-top: 3rem;
`
const GetComments = ({ id }) => {
  const url = `issues/${id}/comments`
  const { apiData, loading, error } = useGetData({ url })
  return (
    <>
      {loading ? <p>Laster..</p> : null}
      {error ? <p>Noe gikk galt, {error}</p> : null}
      <StyledUl>
        {apiData?.data.length > 0
          ? apiData?.data.map((comments, index) => (
              <li className="issue" key={comments.id}>
                {/* <h3>Kommentar {index + 1}</h3> */}
                <p>{comments.comment}</p>
              </li>
            ))
          : null}
      </StyledUl>
    </>
  )
}
export default GetComments
