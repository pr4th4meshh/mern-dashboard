import React, { useState } from "react"
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons"
import { Avatar, Breadcrumb, Layout, Menu, theme } from "antd"
import { Outlet, useNavigate } from "react-router-dom"

const { Header, Content, Sider } = Layout

const items = [
  {
    label: "Events",
    key: "/",
    icon: <NotificationOutlined />,
  },
  {
    label: "Dashboard",
    key: "/dashboard",
    icon: <LaptopOutlined />,
  },
  {
    label: "Profile",
    key: "/events",
    icon: <UserOutlined />,
  },
]

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)

  const navigate = useNavigate()

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
           <Avatar size={30} icon={<UserOutlined />} className="mr-2 bg-gray-500" />
           <h1 className="text-lg">Hello, Prathamesh</h1>
           </div>
        </Menu>
      </Header>
      <Layout>
        <Sider
          onCollapse={() => setCollapsed(!collapsed)}
          collapsible
          width={200}
          style={{ background: colorBgContainer }}
        >
          {collapsed ? (
            <h1 className="text-xl flex justify-center py-10">P4</h1>
          ) : (
            <h1 className="text-xl flex justify-center py-10">
              Pr4th4mesh Logo
            </h1>
          )}
          <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            onClick={({ keyPath }) => navigate(`${keyPath}`)}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
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
