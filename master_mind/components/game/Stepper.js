/* eslint-disable no-ternary */
const Stepper = ({ steps, step, setStep }) => {
  return (
    <button
      className="startButton"
      type="button"
      onClick={() => setStep(step + 1)}
    >
      {steps[step + 1].name}
    </button>
  )
}

export default Stepper
