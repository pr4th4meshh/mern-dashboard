import { Modal } from "antd"
import { ReactNode } from "react"

type ModalProps = {
    children: ReactNode
    modalTitle:string
    open: () => void
    onCancel:() => void
    footer?: string[]
}

const ModalComponent = ({ children, modalTitle, open, onCancel, footer }: ModalProps) => {
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
        footer={footer}
      >
        {children}
      </Modal>
    </>
  )
}

export default ModalComponent
