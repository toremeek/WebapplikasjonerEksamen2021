import PostIssueSuccess from '@/components/PostIssueSuccess'
import Alert from '@/components/shared/Alert'
import Loading from '@/components/shared/Loading'
import ValidationAlert from '@/components/shared/ValidationAlert'
import useApi from '@/hooks/useApi'
import Validate from '@/lib/validation/validate'
import { useEffect, useState } from 'react'

const SupportForm = () => {
  const [validationErrors, setValidationErrors] = useState([])
  const { data, post, error, isLoading } = useApi()
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    creator: '',
    severity: null,
    department: '',
  })

  const handleInputChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }))

  //Validere input før de sendes til api
  const handleSendSupport = async (event) => {
    event.preventDefault()
    const { isValid, issues } = Validate.issue(form)

    if (isValid) {
      setValidationErrors(null)
      await postForm({ ...form, severity: parseInt(form.severity) })
    } else {
      console.log('ERROR:', issues)
      setValidationErrors(issues)
    }
  }

  const postForm = async (issue) => {
    await post(issue)
  }

  useEffect(() => {
    if (data && !error) setSuccess(true)
  }, [data])

  if (success) return <PostIssueSuccess />

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>Ny henvendelse</h1>
          {error ? (
            <Alert
              role="warning"
              text={`Ooops, her skjedde det en feil: ${error}`}
            />
          ) : null}
          <form
            className="wrapper border light add-issue"
            onSubmit={handleSendSupport}
          >
            <section className="col-2">
              <label htmlFor="department-select">Avdeling:</label>
              <select
                required
                value={form.department}
                id="department-select"
                name="department"
                onChange={handleInputChange}
              >
                <option value="">Velg</option>
                <option value="IT">IT</option>
                <option value="Salg">Salg</option>
                <option value="Design">Design</option>
              </select>

              <label htmlFor="severity-select">Viktighet:</label>
              <select
                required
                value={form.severity}
                name="severity"
                id="severity-select"
                onChange={handleInputChange}
              >
                <option value="">Velg</option>
                <option value="3">Høy</option>
                <option value="2">Medium</option>
                <option value="1">Lav</option>
              </select>
            </section>

            <section className="col-2">
              <label htmlFor="title">Tittel</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Tittel på henvendelsen"
                onChange={handleInputChange}
                value={form.title}
                required
              />
              <label htmlFor="creator">Navn</label>
              <input
                type="text"
                id="creator"
                placeholder="Fornavn Etternavn"
                name="creator"
                onChange={handleInputChange}
                value={form.creator}
                required
              />
            </section>
            <section className="col">
              <label htmlFor="description">Beskrivelse</label>
              <textarea
                type="text"
                id="description"
                placeholder="Hva er problemet?"
                name="description"
                onChange={handleInputChange}
                value={form.description}
                rows="4"
                required
              />
              {validationErrors?.length > 0 ? (
                <ValidationAlert errors={validationErrors} />
              ) : null}
              <button type="sumbit">Send henvendelse</button>
            </section>
          </form>
        </>
      )}
    </>
  )
}

export default SupportForm
