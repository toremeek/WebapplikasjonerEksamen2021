import { useEffect, useState } from 'react'

import { createUser } from '@/lib/utils/api'
import axios from 'axios'
import { ScoreBoardItems } from '../game/ScoreBoardItems'
import styled from 'styled-components'

const MainOuterSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  backgrund: teal;
  width: 100%;
`
const ResultsSection = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1rem;
  background: pink;
`
const GameSection = styled.section`
  width: 50%;
  height: 100%;
  margin: 2rem auto;
  background: yellow;
`
const Styledh2 = styled.h2`
  wisth: 100%;
  text-allign: center;
  margin: auto;
`

const Start = () => {
  const [results, setResults] = useState()
  const [loading, setLoading] = useState()

  //TODO: hente resultat fr apiet //
  const getScoreBoard = async () => {
    setLoading(true)
    try {
      const getData = await axios.get('/api/results')
      const response = await getData?.data
      console.log('fra db', response)
      if (response.data.length > 0) {
        sortData(response.data)
      }
    } catch (error) {
      console.log('noe gikk galt', error)
    }
  }

  //enkel sortering av listen over resultater //
  const sortData = (data) => {
    const sortedByTries = data?.sort((a, b) =>
      a.numberOfTries > b.numberOfTries
        ? 1
        : b.numberOfTries > a.numberOfTries
        ? -1
        : 0
    )
    setResults(sortedByTries)
    setLoading(false)
  }
  useEffect(() => {
    createUser()
    getScoreBoard()
  }, [])

  return (
    <>
      <MainOuterSection>
        <ResultsSection>
          <Styledh2>Scoreboard</Styledh2>
          {console.log(results)}
          {loading ? <p>Laster..</p> : null}
          <ul>
            {results?.length > 0 ? (
              results?.map((items, index) =>
                //viser kun de som har klart kombinasjonen
                items.foundCombination ? (
                  <ScoreBoardItems key={items.id} items={items} index={index} />
                ) : null
              )
            ) : (
              <p>Det er ingen resultater å vise</p>
            )}
          </ul>
        </ResultsSection>
        <GameSection>
          <h1>Velkommen til Master Mind</h1>
          <ul>
            <li>
              Spillet går ut på at den ene spilleren bruker farvete brikker for
              å sette opp en skjult kombinasjon (kode), som den andre spilleren
              skal forsøke å gjette.
            </li>
            <li>
              Etter hver gjetning får spilleren et antall små sorte og hvite
              pinner ved siden av koden han/hun gjettet på. Pinnene viser hvor
              mange brikker som er av riktig farve på riktig plass (sorte
              pinner), og hvor mange brikker som er av riktig farve, men er feil
              plassert (hvite pinner).
            </li>
            <li>NB: Det er kun lov å bruke en av hver farge</li>
            <li>
              Det er selvsagt om å gjøre å gjette koden ved å bruke færrest
              mulig forsøk.
            </li>
          </ul>
        </GameSection>
      </MainOuterSection>
    </>
  )
}

export default Start
