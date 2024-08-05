import { Button, ButtonProps } from "antd"

const ButtonComponent = ({ name, onClick, icon, bgColor, loading }: ButtonProps) => {
  return (
    <Button
      type="primary"
      className={`${bgColor} flex text-primary`}
      size="large"
      icon={icon}
      onClick={onClick}
      loading={loading}
    >
      {name}
    </Button>
  )
}

export default ButtonComponent
