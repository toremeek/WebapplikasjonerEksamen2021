import { validate } from '@/lib/Validation'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'

//bruker styled compoenents på error-beskjeder//

const StyledErrorP = styled.p`
  color: red;
  margin: 20px 0 0 0;
`
const CommentArea = styled.textarea`
  max-width: 100%;
  height: 100px;
  border: 1px solid black;
`

const SupportForm = () => {
  const router = useRouter()
  const [validationErrors, setValidationErrors] = useState()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    creator: '',
    severity: '',
    department: '',
  })

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }))

  //Validere input før de sendes til api//
  const handleSendSupport = async (event) => {
    const sendData = {
      title: form.title,
      description: form.description,
      creator: form.creator,
      severity: parseInt(form.severity),
      department: form.department,
    }
    event.preventDefault()
    const isValidTitle = validate.minMaxLength(25, 150, sendData.title)
    const isValidDescription = validate.maxLength(250, sendData.description)
    const isValidName = validate.nameCheck(sendData.creator)

    if (!isValidDescription) {
      setValidationErrors({
        description: 'Beskrivelse må fylles ut, min 5 tegn og maks 250 tegn',
      })
    } else if (!isValidTitle) {
      setValidationErrors({
        title: 'Tittel må fylles ut, min 25 og maks 150 tegn',
      })
    } else if (!isValidName) {
      setValidationErrors({
        creator: 'For og etternavn må ha stor forbokstav og mellomrom',
      })
    } else {
      setValidationErrors(null)
      await postForm(sendData)
    }
  }
  const postForm = async (sendData) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/issues/',
        sendData
      )
      if (response?.data.success) {
        setSuccess(true)
      }
    } catch (err) {
      console.log('noe gikk galt', err)
    }
  }

  const handleSuccess = () => {
    setSuccess(false)
    setForm({
      title: '',
      description: '',
      creator: '',
      severity: '',
      department: '',
    })
  }

  const toAllIssues = () => {
    router.push('/AllIssues')
  }

  return (
    <>
      {success ? (
        <div>
          <p>Takk for din henvendelse</p>
          <button type="button" onClick={handleSuccess}>
            Ny sak
          </button>
          <button type="button" onClick={toAllIssues}>
            Se alle saker
          </button>
        </div>
      ) : (
        <form className="support_form" onSubmit={handleSendSupport}>
          <h2>Ny henvendelse</h2>
          <div>
            {validationErrors?.department?.length > 0 ? (
              <StyledErrorP>{validationErrors.department}</StyledErrorP>
            ) : null}
            <p>Velg avdeling:</p>
            <select
              required
              value={form.department}
              name="department"
              onChange={handleInputOnChange}
            >
              <option value="">Velg</option>
              <option value="IT">IT</option>
              <option value="Salg">Salg</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <div>
            <p>Velg hastegrad:</p>
            {validationErrors?.severity?.length > 0 ? (
              <StyledErrorP>{validationErrors.severity}</StyledErrorP>
            ) : null}

            <select
              required
              value={form.severity}
              name="severity"
              id="severity"
              onChange={handleInputOnChange}
            >
              <option value="">Velg</option>
              <option value="3">Høy</option>
              <option value="2">Medium</option>
              <option value="1">Lav</option>
            </select>
          </div>
          <div>
            {validationErrors?.title?.length > 0 ? (
              <StyledErrorP>{validationErrors.title}</StyledErrorP>
            ) : null}
            <label htmlFor="title">Tittel</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Tittel på henvendelsen"
              onChange={handleInputOnChange}
              value={form.title}
            />
          </div>
          <div>
            {validationErrors?.creator?.length > 0 ? (
              <StyledErrorP>{validationErrors.creator}</StyledErrorP>
            ) : null}
            <label htmlFor="creator">Navn</label>
            <input
              type="text"
              id="creator"
              placeholder="Fornavn Etternavn"
              name="creator"
              onChange={handleInputOnChange}
              value={form.creator}
              required
            />
          </div>
          <div>
            {validationErrors?.description?.length > 0 ? (
              <StyledErrorP>{validationErrors.description}</StyledErrorP>
            ) : null}
            <label htmlFor="description">Beskrivelse</label>
            <CommentArea
              type="text"
              id="description"
              placeholder="Hva er problemet?"
              name="description"
              onChange={handleInputOnChange}
              value={form.description}
              required
            />
          </div>
          <button type="sumbit">Send henvendelse</button>
          {error ? <p>Noe gikk galt.. {error}</p> : null}
        </form>
      )}
    </>
  )
}

export default SupportForm
