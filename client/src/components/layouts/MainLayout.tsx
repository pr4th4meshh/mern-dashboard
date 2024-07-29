import React, { useState } from "react"
import { UserOutlined } from "@ant-design/icons"
import { Avatar, Layout, Menu, theme } from "antd"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Footer } from "antd/es/layout/layout"
import { getNavItems } from "../../common/siderLinks"

const { Header, Content, Sider } = Layout

interface UserState {
  currentUser: {
    _id: string
    username: string
    email: string
    role: string
  }
  token: string | null
  isLoading: boolean
  error: string | null
}

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)

  const navigate = useNavigate()
  const user = useSelector(
    (state: { user: UserState }) => state.user.currentUser
  )
  const NAV_ITEMS = getNavItems(user)

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
              Hello,{" "}
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
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
          collapsedWidth="0"
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
            items={NAV_ITEMS}
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
      <Footer style={{ textAlign: "center" }}>
        Pr4th4meshh Dashboard ©{new Date().getFullYear()} | Created by{" "}
        <a
          target="_blank"
          rel="noopener"
          className="text-red-500 underline"
          href="https://github.com/pr4th4meshh"
        >
          @pr4th4meshh
        </a>
      </Footer>
    </Layout>
  )
}

export default MainLayout
