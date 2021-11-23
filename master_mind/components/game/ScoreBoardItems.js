import styled from 'styled-components'

const StyledSection = styled.section`
  display: flex;
  border: 5px solid lightgrey;
  width: 100%;
  flex-direction: row;
  background: white;
  margin: 1rem auto;
`
const StyledLeftDiv = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
`
const StyledrightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 70%;
  background: lightgrey;
  align-items: center;
`
const StyledP = styled.p`
  font-size: 5rem;
  min-with: 80%;
  color: white;
  padding: 0.5rem;
  margin: 1rem auto 1rem auto;
  background: pink;
  text-allign: center;
`
const StyledPlayerInfo = styled.p`
  color: black;
  font-size: 1rem;
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem 0 0 0;
`
const TextBox = styled.div`
  width: 100%;
  margin: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
`
export const ScoreBoardItems = ({ items, index }) => {
  const name = items.user.charAt(0).toUpperCase() + items.user.slice(1)

  return (
    <StyledSection>
      <StyledLeftDiv>
        <StyledP>{index + 1}</StyledP>
      </StyledLeftDiv>
      <StyledrightDiv>
        <TextBox>
          <StyledPlayerInfo>Navn: {name}</StyledPlayerInfo>
          <StyledPlayerInfo>
            Antall forsøk: {items.numberOfTries}
          </StyledPlayerInfo>
          <StyledPlayerInfo>Kombinasjon: {items.combination}</StyledPlayerInfo>
        </TextBox>
      </StyledrightDiv>
    </StyledSection>
  )
}
