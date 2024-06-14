import React from "react"
import type { FormProps } from "antd"
import { Button, Form, Input } from "antd"

type FieldType = {
  email?: string
  password?: string
  remember?: string
  confirmPassword?: string
}

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values)
}

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo)
}

const Login: React.FC = () => (
  <div className="flex justify-center items-center h-[100vh] bg-primary ">
    <div>
      <h1 className="text-2xl text-center pb-10">Login to continue</h1>
      <Form
        className="border p-10 sm:w-[300px] md:w-[400px] bg-white"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter email.." className="w-full" />
        </Form.Item>

        <Form.Item<FieldType>
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
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
)

export default Login
