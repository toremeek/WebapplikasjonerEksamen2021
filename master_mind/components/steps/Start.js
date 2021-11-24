import { createUser } from '@/lib/utils/api'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ScoreBoardItems } from '../game/ScoreBoardItems'

const Start = () => {
  const [results, setResults] = useState()
  const [loading, setLoading] = useState()

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
      <section className="startSectionWrapper">
        <div className="titleWrapper">
          <h2 id="masterMind">
            <span style={{ color: 'red' }}>MasterMind </span>
          </h2>
          <h2 id="hallOf">
            <span style={{ color: 'teal' }}>Hall</span>{' '}
            <span style={{ color: 'blue ' }}>Of</span>
          </h2>
          <h2 id="fame">
            <span style={{ color: 'orange' }}>Fame</span>
          </h2>
        </div>
        <section id="resultsSection">
          {loading ? <p>Laster..</p> : null}
          <ul className="ul">
            {results?.length > 0 ? (
              //slicer result for å vise topp 3 som har klart spillet
              results?.slice(0, 3).map((items, index) =>
                //viser kun de som har klart kombinasjonen
                items.foundCombination ? (
                  <ScoreBoardItems key={items.id} items={items} index={index} />
                ) : null
              )
            ) : (
              <p>Det er ingen resultater å vise</p>
            )}
          </ul>
        </section>
        <section className="gameSection">
          <h1>Velkommen til Master Mind</h1>
          <ul>
            <li>
              Spillet går ut på at den ene spilleren bruker brikker med ulik
              farge for å sette opp en skjult kombinasjon (kode), som den andre
              spilleren skal forsøke å gjette. Her kommer koden fra apiet.
            </li>
            <li>
              Etter hver gjetning får spilleren et antall små sorte og grå
              pinner ved siden av koden han/hun gjettet på. Pinnene viser hvor
              mange brikker som er av riktig farge på riktig plass (sorte
              pinner), og hvor mange brikker som er av riktig farve, men er feil
              plassert (grå pinner).
            </li>
            <li>NB: Det er kun lov å bruke en av hver farge</li>
            <li>
              Det er selvsagt om å gjøre å gjette koden ved å bruke færrest
              mulig forsøk.
            </li>
          </ul>
        </section>
      </section>
    </>
  )
}

export default Start
