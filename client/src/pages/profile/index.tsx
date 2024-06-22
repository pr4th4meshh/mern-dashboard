import { Avatar, Card, Button, Form, Input, Tag, message } from "antd"
import {
  UserOutlined,
  MailOutlined,
  RobotOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useSignoutMutation } from "../../redux/slices/authSlice"
import { clearUser, selectCurrentUser, setUser } from "../../redux/slices/userSlice"
import ButtonComponent from "../../components/ui/ButtonComponent"
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/slices/usersSlice"
import { useEffect } from "react"

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signout, { isLoading: signoutLoading }] = useSignoutMutation()
  const [form] = Form.useForm()
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation()

  const { id } = useParams()
  const { data: userData, refetch } = useGetUserDetailsQuery(id)
  const user = useSelector(selectCurrentUser)

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleUpdateUser = async (values) => {
    try {
      const updatedUser = await updateUser({ id, ...values }).unwrap()
      message.success("User updated successfully!")
      dispatch(setUser(updatedUser))
      refetch()
    } catch (error) {
      message.error(error.data.message || "Error while updating user")
    }
  }

  const handleSignout = async () => {
    try {
      await signout(null)
      dispatch(clearUser())
      navigate("/login")
      message.info("Logged out user")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <Card className="w-full max-w-2xl shadow-lg rounded-lg mt-10">
        <div className="flex justify-between mb-6">
          <h1 className="text-lg">User details:</h1>
          <ButtonComponent
            icon={<LogoutOutlined />}
            name="Logout"
            onClick={handleSignout}
            bgColor="bg-red-500"
            cn=""
            isLoading={signoutLoading}
          />
        </div>

        <div className="flex flex-col items-center">
          <Avatar size={100} icon={<UserOutlined />} />
          <h1 className="text-2xl font-semibold mt-4">{userData?.username}</h1>
          <p className="text-gray-600 mb-1">
            <MailOutlined /> {userData?.email}
          </p>
          <Tag color="magenta">
            <RobotOutlined />{" "}
            {userData?.role.charAt(0).toUpperCase() + userData?.role.slice(1)}
          </Tag>
        </div>
        <Form
          layout="vertical"
          className="mt-8"
          initialValues={{
            username: user?.username,
            email: user?.email,
          }}
          onFinish={handleUpdateUser}
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateLoading}
              disabled={updateLoading}
              className="w-full bg-secondary"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Profile
