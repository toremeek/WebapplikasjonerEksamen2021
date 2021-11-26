import Modal from '../shared/Modal'

const Superbonus = ({ toggle, data }) => (
  <Modal toggleModal={toggle}>
    <h1 className="superbonus-title">Superbonus, luke {data.order}</h1>
    <p className="superbonus-winner">
      👏 <span>{data.user}</span> 🎉
    </p>
  </Modal>
)

export default Superbonus
