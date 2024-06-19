import React, { useState } from "react"
import {
  LaptopOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Avatar, Layout, Menu, theme } from "antd"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const { Header, Content, Sider } = Layout

const items = [
  {
    label: "Products",
    key: "/",
    icon: <ProductOutlined />,
  },
  {
    label: "Dashboard",
    key: "/dashboard",
    icon: <LaptopOutlined />,
  },
  {
    label: "Profile",
    key: "/profile",
    icon: <UserOutlined />,
  },
]

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)

  const navigate = useNavigate()
  const user = useSelector((state) => state?.user.user)

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ flex: 1, minWidth: 0 }}
          className=" flex justify-end "
        >
          <div className="flex items-center">
            <Avatar
              size={30}
              icon={<UserOutlined />}
              className="mr-2 bg-gray-500"
            />
            <h1 className="sm:text-md md:text-lg">
              Hello, {user.username} ||{" "}
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </h1>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider
          onCollapse={() => setCollapsed(!collapsed)}
          collapsible
          width={200}
          style={{ background: colorBgContainer }}
          breakpoint="md"
          collapsedWidth="70"
        >
          <Link to="/">
            {collapsed ? (
              <h1 className="text-xl flex justify-center py-10">P4</h1>
            ) : (
              <h1 className="text-xl flex justify-center py-10">
                Pr4th4mesh Logo
              </h1>
            )}
          </Link>
          <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            onClick={({ keyPath }) => navigate(`${keyPath}`)}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 16,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default MainLayout
