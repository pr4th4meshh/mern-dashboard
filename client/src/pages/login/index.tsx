import { Form, Input, Button, message } from "antd"
import { useSigninMutation } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/slices/userSlice"

const Login = () => {
  const [form] = Form.useForm()
  const [signin, { isLoading }] = useSigninMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const user = await signin(values).unwrap()
      dispatch(setUser({ user: user, accessToken: user.token }))
      message.success("Login successful!")
      form.resetFields()
      navigate("/")
    } catch (error) {
      message.error("Invalid Credentials, please try again")
      console.log(error)
    }
  }

  const onFinishFailed = (errorInfo: {
    values: { email: string; password: string }
    errorFields: {
      name: (string | number)[]
      errors: string[]
    }[]
    outOfDate: boolean
  }) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className="flex justify-center items-center h-[100vh] bg-primary">
      <div>
        <h1 className="text-2xl text-center pb-10">Login to continue</h1>
        <Form
          className="border p-10 sm:w-[300px] md:w-[400px] bg-white"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter email.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter password.." className="w-full" />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-secondary"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
