import {
  LaptopOutlined,
  ProductOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  OrderedListOutlined,
  SmileOutlined,
} from "@ant-design/icons"

interface UserProps {
  _id: string
  username: string
  email: string
  role: string
}

export const getNavItems = (user: UserProps) => {
  const { _id, role } = user

  const SUPER_ADMIN_ITEMS = [
    { label: "Products", key: "/", icon: <ProductOutlined /> },
    { label: "Dashboard", key: "/dashboard", icon: <LaptopOutlined /> },
    { label: "Discounts", key: "/discounts", icon: <SmileOutlined /> },
    { label: "Orders", key: `/orders`, icon: <OrderedListOutlined /> },
    { label: "Users", key: `/users`, icon: <UsergroupAddOutlined /> },
    { label: "Profile", key: `/profile/${_id}`, icon: <UserOutlined /> },
  ]

  const ADMIN_ITEMS = [
    { label: "Products", key: "/", icon: <ProductOutlined /> },
    { label: "Dashboard", key: "/dashboard", icon: <LaptopOutlined /> },
    { label: "Discounts", key: "/discounts", icon: <SmileOutlined /> },
    { label: "Orders", key: `/orders`, icon: <OrderedListOutlined /> },
    { label: "Users", key: `/users`, icon: <UsergroupAddOutlined /> },
    { label: "Profile", key: `/profile/${_id}`, icon: <UserOutlined /> },
  ]

  const DEVELOPER_ITEMS = [
    { label: "Products", key: "/", icon: <ProductOutlined /> },
    { label: "Dashboard", key: "/dashboard", icon: <LaptopOutlined /> },
    { label: "Discounts", key: "/discounts", icon: <SmileOutlined /> },
    { label: "Orders", key: `/orders`, icon: <OrderedListOutlined /> },
    { label: "Users", key: `/users`, icon: <UsergroupAddOutlined /> },
    { label: "Profile", key: `/profile/${_id}`, icon: <UserOutlined /> },
  ]

  const USER_ITEMS = [
    { label: "Products", key: "/", icon: <ProductOutlined /> },
    { label: "Dashboard", key: "/dashboard", icon: <LaptopOutlined /> },
    { label: "Profile", key: `/profile/${_id}`, icon: <UserOutlined /> },
  ]

  switch (role) {
    case "admin":
      return ADMIN_ITEMS
    case "superadmin":
      return SUPER_ADMIN_ITEMS
    case "developer":
      return DEVELOPER_ITEMS
    default:
      return USER_ITEMS
  }
}
