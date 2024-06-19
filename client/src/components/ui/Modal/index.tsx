import { Modal } from "antd"
import { ReactNode } from "react"

type ModalProps = {
    children: ReactNode
    modalTitle:string
    open: () => void
    onCancel:() => void
}

const ModalComponent = ({ children, modalTitle, open, onCancel }: ModalProps) => {
  const handleCancel = () => {
    onCancel()
  }
  return (
    <>
      <Modal
        open={open}
        onCancel={handleCancel}
        title={`Create ${modalTitle}`}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        {children}
      </Modal>
    </>
  )
}

export default ModalComponent
