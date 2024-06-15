import { Form, Input, Button, message } from 'antd';
import { useSignupMutation } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form] = Form.useForm();
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      await signup(values).unwrap();
      message.success('Signup successful!');
      form.resetFields();
      navigate("/")
    } catch (error) {
      message.error('Signup failed. Please try again.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='flex justify-center items-center h-[100vh] bg-primary'>
      <div>
        <h1 className='text-2xl text-center pb-10'>Welcome to MERN-Dashboard</h1>
        <Form
          className='border p-10 sm:w-[300px] md:w-[400px] bg-white'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='Enter username..' className='w-full' />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder='Enter email..' className='w-full' />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Enter password..' className='w-full' />
          </Form.Item>

          <Form.Item>
            <Button className='w-full bg-secondary' type="primary" htmlType="submit" loading={isLoading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;