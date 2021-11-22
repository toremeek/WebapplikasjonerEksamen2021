const Modal = ({ children, toggleModal }) => {
  const toggle = () => toggleModal()

  return (
    <div className="modal-bg">
      <div className="modal">
        <span className="close" onClick={toggle}>
          &times;
        </span>
        <section>{children}</section>
      </div>
    </div>
  )
}

export default Modal
