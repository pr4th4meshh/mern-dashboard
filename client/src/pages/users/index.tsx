import React from "react"
import { Space, Table, Tag } from "antd"
import { useGetAllUsersQuery } from "../../redux/slices/usersSlice"

interface UserType {
  key: React.Key
  username: string
  email: string
  role: string[]
}

const Users = () => {
  const {
    data: getAllUsers = [],
    isLoading,
    isError,
  } = useGetAllUsersQuery(undefined)

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (username) => (
        <span>{username.charAt(0).toUpperCase() + username.slice(1)}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          color={
            role === "user"
              ? "green"
              : role === "admin"
              ? "blue"
              : role === "superadmin"
              ? "orange"
              : "cyan"
          }
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: UserType) => (
        <Space size="middle">
          <a className="text-blue-500">Edit</a>
          <a className="text-red-500">Delete</a>
        </Space>
      ),
    },
  ]

  const pagination = {
    pageSize: 8, // Number of items per page
    total: getAllUsers.length, // Total number of items
    showTotal: (total: number, range: [number, number]) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`, // Display text for total items
  };

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>

  return (
    <div className="p-6">
      <Table pagination={pagination} dataSource={getAllUsers} columns={columns} />
    </div>
  )
}

export default Users
