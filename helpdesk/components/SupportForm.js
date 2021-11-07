import { validate } from '@/lib/Validation'
import { useState } from 'react'
import styled from 'styled-components';

//bruker styled compoenents på error-beskjeder//

const StyledErrorP = styled.p`
color: red;
margin: 20px 0 0 0;
`;

const SupportForm = () => {
const [validationErrors, setValidationErrors] = useState();
  const [form, setForm] = useState({
    title: '',
    creator: '',
    description: '',
    severity: '',
    department: '',
  })

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }))

  const handleSendSupport = (event) => {
    event.preventDefault()

    const isValidTitle = validate.minMaxLength(25, 150, form.title)
    const isValidDescription = validate.maxLength(250, form.description)
   
   const isValidName = validate.nameCheck(form.creator)
   console.log(isValidName)


   if (!isValidDescription) {
      setValidationErrors({
        description: "Beskrivelse må fylles ut, min 5 tegn og maks 250 tegn",
      })
    } else if (!isValidTitle) {
      setValidationErrors({
        title: "Tittel må fylles ut, min 25 og maks 150 tegn",
      })
    }
    else if(!isValidName){
      setValidationErrors({
        creator: "For og etternavn må ha stor forbokstav og mellomrom"
      })
    }
    
    else{
      setValidationErrors(null)
      console.log(form)
      //her kommer logikk for å pushe til api //
     
    }
  }


  return (
    <form className="support_form" onSubmit={handleSendSupport}>
      <h2>Ny henvendelse</h2>
      <div>
      {validationErrors?.department?.length > 0 ? <StyledErrorP>{validationErrors.department}</StyledErrorP> : null}
        <p>Velg avdeling:</p>
        <select
        required
          value={form.department}
          name="department"
          onChange={handleInputOnChange}
        >
          <option value="">Velg</option>
          <option value="It">IT</option>
          <option value="Salg">Salg</option>
          <option value="Design">Design</option>
        </select>
      </div>
      <div>
        <p>Velg hastegrad:</p>
        {validationErrors?.severity?.length > 0 ? <StyledErrorP>{validationErrors.severity}</StyledErrorP> : null}

        <select
        required
          value={form.severity}
          name="severity"
          id="severity"
          onChange={handleInputOnChange}
          
        >
          <option value="">Velg</option>
          <option value="High">Høy</option>
          <option value="Medium">Medium</option>
          <option value="Lav">Lav</option>
        </select>
      </div>
      <div>
        {validationErrors?.title?.length > 0 ? <StyledErrorP>{validationErrors.title}</StyledErrorP> : null}
        <label htmlFor="title">Tittel</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Tittel på henvendelsen din"
          onChange={handleInputOnChange}
          value={form.title}
          
        />
      </div>
      <div>
      {validationErrors?.creator?.length > 0 ? <StyledErrorP>{validationErrors.creator}</StyledErrorP> : null}
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
      {validationErrors?.description?.length > 0 ? <StyledErrorP>{validationErrors.description}</StyledErrorP> : null}
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          type="text"
          id="description"
          placeholder="Hva er problemet?"
          name="description"
          onChange={handleInputOnChange}
          value={form.description}
          required
        />
      </div>
      <div>{}</div>
      <button type="sumbit">Send henvendelse</button>
    </form>
  )
}

export default SupportForm
