import { Button } from "antd"
import { AppstoreAddOutlined } from "@ant-design/icons"

const ButtonComponent = ({ name, onClick, cn }) => {
  return (
    <Button className={`${cn} flex bg-secondary text-primary`} size="large" icon={<AppstoreAddOutlined />} onClick={onClick}>
      {name}
    </Button>
  )
}

export default ButtonComponent
