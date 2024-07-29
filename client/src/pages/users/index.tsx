import { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  message,
  Form,
  Input,
  Button,
  Select,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/slices/usersSlice";
import Loading from "../../components/ui/Loading";
import ModalComponent from "../../components/ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  selectConfiguration,
} from "../../redux/slices/configurationSlice";
import { MODAL_STATE } from "../../common/states";
import { Breakpoint } from "antd";
interface Roles {
  user: string;
  admin: string;
  superadmin: string;
  developer: string;
}

interface UserProps {
  _id: string;
  username: string;
  email: string;
  role: keyof Roles;
}

interface FormValues {
  username: string;
  email: string;
  role: keyof Roles;
  newPassword?: string;
  confirmPassword?: string;
}

const Users = () => {
  const {
    data: getAllUsers = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllUsersQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const Configuration = useSelector(selectConfiguration);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [isChangePassword, setIsChangePassword] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleEdit = (user: UserProps) => {
    setSelectedUser(user);
    setIsChangePassword(false);
    dispatch(toggleModal(MODAL_STATE.UPDATE_USER_MODAL));
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  const handleChangePassword = (user: UserProps) => {
    setSelectedUser(user);
    setIsChangePassword(true);
    dispatch(toggleModal(MODAL_STATE.UPDATE_USER_MODAL));
    form.resetFields();
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      message.success("User deleted successfully!");
      refetch();
    } catch (error) {
      message.error("Error while deleting user");
      console.log(error);
    }
  };

  const handleUpdateUser = async (values: FormValues) => {
    try {
      if (isChangePassword) {
        if (values.newPassword !== values.confirmPassword) {
          message.error("Passwords do not match!");
          return;
        }
        await updateUserMutation({
          id: selectedUser!._id,
          ...values,
          password: values.newPassword,
        }).unwrap();
        message.success("Password updated successfully!");
      } else {
        await updateUserMutation({ id: selectedUser!._id, ...values }).unwrap();
        message.success("User updated successfully!");
      }
      refetch();
      dispatch(toggleModal(MODAL_STATE.UPDATE_USER_MODAL));
    } catch (error) {
      message.error("Error updating user");
      console.log(error)
    }
  };

  const roles = [
    { value: "user", title: "User" },
    { value: "admin", title: "Admin" },
    { value: "superadmin", title: "Superadmin" },
    { value: "developer", title: "Developer" },
  ];

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
      responsive: ['md'] as Breakpoint[],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: keyof Roles) => (
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
      responsive: ['lg'] as Breakpoint[],
      render: (record: UserProps) => (
        <Space size="middle">
          <a className="text-blue-500" onClick={() => handleEdit(record)}>
            Edit
          </a>
          <a
            className="text-yellow-600"
            onClick={() => handleChangePassword(record)}
          >
            Change password
          </a>
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
            icon={<DeleteOutlined style={{ color: "red" }} />}
            okText="Delete"
            okType="danger"
            cancelText="Cancel"
          >
            <a className="text-red-500">Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const pagination = {
    pageSize: 8,
    total: getAllUsers?.length,
    showTotal: (total: number, range: [number, number]) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="sm:p-2 md:p-6">
      <Table
        loading={isLoading}
        pagination={pagination}
        dataSource={getAllUsers}
        columns={columns}
      />
      <ModalComponent
        modalTitle={isChangePassword ? "Change Password" : "Update User"}
        open={Configuration[MODAL_STATE.UPDATE_USER_MODAL]}
        onCancel={() => dispatch(toggleModal(MODAL_STATE.UPDATE_USER_MODAL))}
      >
        <Form
          className="p-5"
          form={form}
          onFinish={handleUpdateUser}
          layout="vertical"
          initialValues={{
            username: selectedUser?.username,
            email: selectedUser?.email,
            role: selectedUser?.role,
          }}
        >
          {!isChangePassword ? (
            <>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input the username!" },
                ]}
              >
                <Input placeholder="Enter username.." />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input the email!" }]}
              >
                <Input placeholder="Enter email.." />
              </Form.Item>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select placeholder="Select a role..">
                  {roles.map((role) => (
                    <Select.Option key={role.value} value={role.value}>
                      {role.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please enter a new password" },
                ]}
              >
                <Input.Password
                  visibilityToggle={false}
                  placeholder="Enter new password.."
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password",
                  },
                ]}
              >
                <Input.Password
                  visibilityToggle={false}
                  placeholder="Confirm new password.."
                />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button
              className="bg-secondary w-full"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {isChangePassword ? "Change Password" : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default Users;
