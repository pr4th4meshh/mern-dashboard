import PageNavbar from "../../components/ui/PageNavbar"
import {
  Breakpoint,
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import {
  useDeleteDiscountCodeMutation,
  useGetAllDiscountCodesQuery,
  useUpdateDiscountCodeMutation,
} from "../../redux/apis/discountApiSlice"
import Loading from "../../components/ui/Loading"
import { useDispatch, useSelector } from "react-redux"
import {
  selectConfiguration,
  toggleModal,
} from "../../redux/slices/configurationSlice"
import { MODAL_STATE } from "../../common/states"
import CreateDiscount from "./components/CreateDiscount"
import ModalComponent from "../../components/ui/Modal"
import { useState } from "react"

interface ICouponCode {
  _id: string
  code: string
  discountType: boolean
  discountValue: number
  specialDiscount: boolean
  usageLimit: number
  minimumPriceToAvail: number
  active: boolean
}

const Discounts = () => {
  const [currentCoupon, setCurrentCoupon] = useState<ICouponCode | null>(null)
  const {
    data: discountCodes,
    isLoading: discountCodesLoading,
    refetch: refetchDiscountCodes,
  } = useGetAllDiscountCodesQuery({})
  const [deleteDiscountCode] = useDeleteDiscountCodeMutation()
  const [udpateDiscountCode] = useUpdateDiscountCodeMutation()

  const Configuration = useSelector(selectConfiguration)
  const dispatch = useDispatch()

  const [form] = Form.useForm()

  const handleEdit = (coupon: ICouponCode) => {
    setCurrentCoupon(coupon)
    dispatch(toggleModal(MODAL_STATE.UPDATE_DISCOUNT_MODAL))
    form.setFieldsValue({
      code: coupon?.code,
      discountType: coupon?.discountType,
      discountValue: coupon?.discountValue,
      specialDiscount: coupon?.specialDiscount,
      usageLimit: coupon?.usageLimit,
      minimumPriceToAvail: coupon?.minimumPriceToAvail,
      active: coupon?.active
    });
  }

  const handleEditDiscountCoupon = async (values: ICouponCode) => {
    try {
      const couponToBeEdited = await udpateDiscountCode({id: currentCoupon?._id , ...values}).unwrap()
      console.log("VALUES", values)
      console.log(couponToBeEdited)
      message.success("Coupon Edited Successfully")
      refetchDiscountCodes()
      dispatch(toggleModal(MODAL_STATE.UPDATE_DISCOUNT_MODAL))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteDiscountCode = async (id: string) => {
    try {
      await deleteDiscountCode(id)
      message.success("Coupon code deleted successfully!")
      refetchDiscountCodes()
    } catch (error) {
      // TODO: add message.error() with exact error
      console.log(error)
    }
  }
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (code: string) => <span>{code.toUpperCase()}</span>,
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
      render: (type: string) => (
        <Tag color={type === "percentage" ? "green" : "orange"}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Discount Value",
      dataIndex: "discountValue",
      key: "discountValue",
      responsive: ["md"] as Breakpoint[],
    },
    {
      title: "Special Discount",
      dataIndex: "specialDiscount",
      key: "specialDiscount",
      responsive: ["md"] as Breakpoint[],
      render: (type: boolean) => (
        <Tag color={type === true ? "blue" : "red"}>
          {type?.toString().toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Usage Limit",
      dataIndex: "usageLimit",
      key: "usageLimit",
      responsive: ["md"] as Breakpoint[],
    },
    {
      title: "Minimum Price To Avail",
      dataIndex: "minimumPriceToAvail",
      key: "minimumPriceToAvail",
      responsive: ["md"] as Breakpoint[],
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      responsive: ["md"] as Breakpoint[],
      render: (type: boolean) => (
        <Tag color={type === true ? "blue" : "red"}>
          {type.toString().toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      responsive: ["lg"] as Breakpoint[],
      render: (record: ICouponCode) => (
        <Space size="middle">
          <a className="text-blue-500" onClick={() => handleEdit(record)}>
            Edit
          </a>
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this coupon?"
            onConfirm={() => handleDeleteDiscountCode(record._id)}
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
  ]

  const pagination = {
    pageSize: 8,
    total: discountCodes?.length,
    showTotal: (total: number, range: [number, number]) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
  }

  if (discountCodesLoading) return <Loading />
  // if (isError) return <div>Error fetching data</div>;
  return (
    <div>
      <CreateDiscount />
      <PageNavbar
        title="Discounts"
        canSearch={true}
        buttonName="Create Discount"
        searchOnChange={function (): void {
          message.info("Function is not implemented yet")
        }}
        searchTerm={""}
        onClick={() => dispatch(toggleModal(MODAL_STATE.CREATE_DISCOUNT_MODAL))}
      />

      <Table
        loading={discountCodesLoading}
        pagination={pagination}
        dataSource={discountCodes}
        columns={columns}
      />

      <ModalComponent
        modalTitle="Update discount code"
        open={Configuration[MODAL_STATE.UPDATE_DISCOUNT_MODAL]}
        onCancel={() =>
          dispatch(toggleModal(MODAL_STATE.UPDATE_DISCOUNT_MODAL))
        }
      >
        <Form
          className="p-5 w-full bg-white"
          layout="vertical"
          initialValues={{ 
            code: currentCoupon?.code,
            discountType: currentCoupon?.discountType,
            discountValue: currentCoupon?.discountValue,
            specialDiscount: currentCoupon?.specialDiscount,
            usageLimit: currentCoupon?.usageLimit,
            minimumPriceToAvail: currentCoupon?.minimumPriceToAvail,
            active: currentCoupon?.active
           }}
          onFinish={handleEditDiscountCoupon}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Code"
            name="code"
            rules={[
              { required: true, message: "Please input the coupon code!" },
            ]}
          >
            <Input
              placeholder="Enter coupon code.."
              className="w-full"
              minLength={6}
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            label="Discount Type"
            name="discountType"
            rules={[{ required: true, message: "Please input discount type!" }]}
          >
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select Discount Type"
            >
              <Select.Option value="percentage">Percentage</Select.Option>
              <Select.Option value="number">Number</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Discount value" name="discountValue" required>
            <Input placeholder="Enter discount value.." className="w-full" />
          </Form.Item>

          <Form.Item label="Special Discount" name="specialDiscount" required>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select Discount Type"
            >
              <Select.Option value={true}>YES</Select.Option>
              <Select.Option value={false}>NO</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Usage Limit"
            name="usageLimit"
            rules={[{ required: true, message: "Please input usage limit!" }]}
          >
            <Input
              placeholder="Enter usage limit.."
              type="number"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Minimum price to avail discount"
            name="minimumPriceToAvail"
            rules={[
              {
                required: true,
                message: "Please input minimum price to avail discount!",
              },
            ]}
          >
            <Input
              placeholder="Enter minimum price to avail discount.."
              type="number"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Active status"
            name="active"
            rules={[
              {
                required: true,
                message: "Please input minimum price to avail discount!",
              },
            ]}
          >
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select Discount Type"
            >
              <Select.Option value={true}>ACTIVE</Select.Option>
              <Select.Option value={false}>INACTIVE</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-secondary"
              type="primary"
              htmlType="submit"
              loading={false}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  )
}

export default Discounts
