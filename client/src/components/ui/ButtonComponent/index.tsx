import { Button, ButtonProps } from "antd"

const ButtonComponent = ({ name, onClick, cn, icon, bgColor, isLoading }: ButtonProps) => {
  return (
    <Button
      type="primary"
      className={`${cn} ${bgColor} flex text-primary`}
      size="large"
      icon={icon}
      onClick={onClick}
      loading={isLoading}
    >
      {name}
    </Button>
  )
}

export default ButtonComponent
