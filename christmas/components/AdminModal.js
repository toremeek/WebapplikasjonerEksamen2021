import { useUser } from '@/hooks/useUser'
import { useState } from 'react'
import styled from 'styled-components'

const StyledModal = styled.section`
  display: flex;
  z-index: 1;
  width: 100%;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.753);
  position: fixed;
  top: 0;
  left: 0;
`
const InnerModal = styled.section`
  position: relative;
  text-align: left;
  background-color: rgb(255, 255, 255);
  color: black;
  width: 70%;
  height: 50%;
  overflow-y: auto;
  padding: 40px;
`

const CloseSign = styled.span`
  position: absolute;
  top: 0;
  font-size: 1.5rem;
  right: 25px;
  width: 10px;
  height: 10px;
  padding: 10px;
  cursor: pointer;
`

const AdminModal = ({ showAdminModal, setShowAdminModal, obj }) => {
  const closeModal = () => {
    setShowAdminModal(false)
  }

  return (
    <>
      {showAdminModal ? (
        <StyledModal>
          <InnerModal>
            <CloseSign onClick={closeModal}>X</CloseSign>
            <h1>Superbonus luke 1</h1>
            <div className="superbonus winner">{obj}</div>
          </InnerModal>
        </StyledModal>
      ) : null}
    </>
  )
}

export default AdminModal
