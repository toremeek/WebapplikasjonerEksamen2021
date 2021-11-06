import { useState } from 'react'

const SupportForm = () => {
  const [form, setForm] = useState({
    title: '',
    creator: '',
    description: '',
    severity: '',
  })

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }))

  const handleSendSupport = (event) => {
    event.preventDefault()
    console.log(form)
  }

  return (
    <form className="support_form" onSubmit={handleSendSupport}>
      <h2>Ny henvendelse</h2>
      <div>
        <select value={form.severity} onChange={handleInputOnChange}>
          <option value="High">Høy</option>
          <option value="Medium">Medium</option>
          <option value="Lav">Lav</option>
        </select>
      </div>
      <div>
        <label htmlFor="title">Tittel</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleInputOnChange}
          value={form.title}
        />
      </div>
      <div>
        <label htmlFor="creator">Navn</label>
        <input
          type="text"
          id="creator"
          name="creator"
          onChange={handleInputOnChange}
          value={form.creator}
        />
      </div>
      <div>
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={handleInputOnChange}
          value={form.description}
        />
      </div>
      <div>{/* TODO Add department */}</div>
      <div>{/* TODO Add severity */}</div>
      <button type="sumbit">Send henvendelse</button>
    </form>
  )
}

export default SupportForm
