import React, { useState } from "react"
import type { FormProps } from "antd"
import { Button, Form, Input, message } from "antd"
import { useSigninMutation } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"

type FieldType = {
  email?: string
  password?: string
  remember?: string
  confirmPassword?: string
}

const Login: React.FC = () => {
  const [form] = Form.useForm()
  const [signin, { isLoading }] = useSigninMutation()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      await signin(values).unwrap()
      message.success("Login successfull!")
      form.resetFields()
      navigate("/")
    } catch (error) {
      message.error("Invalid credentials. Please try again!")
      console.log("Invalid credentials. Please try again!")
    }
  }

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo)
  }
  return (
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
          form={form}
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
