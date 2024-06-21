import { Popconfirm, Space, Table, Tag, message } from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/slices/usersSlice"
import Loading from "../../components/ui/Loading"
import { useEffect } from "react"

const Users = () => {
  const {
    data: getAllUsers = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllUsersQuery(undefined)

  const [deleteUser] = useDeleteUserMutation()

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId).unwrap()
      refetch()
      message.success("User deleted successfully!")
    } catch (error) {
      message.error(error.mesage || "Error while deleting user")
    }
  }

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (username: string) => (
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
      render: (role: string) => (
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
      render: (record) => (
        <Space size="middle">
          <a className="text-blue-500">Edit</a>
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
            icon={<DeleteOutlined style={{color: "red"}} />}
            okText="Delete"
            okType="danger"
            cancelText="Cancel"
          >
            <a className="text-red-500">Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const pagination = {
    pageSize: 8, // Number of items per page
    total: getAllUsers.length, // Total number of items
    showTotal: (total: number, range: [number, number]) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`, // Display text for total items
  }

  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching data</div>

  return (
    <div className="p-6">
      <Table
        loading={isLoading}
        pagination={pagination}
        dataSource={getAllUsers}
        columns={columns}
      />
    </div>
  )
}

export default Users
