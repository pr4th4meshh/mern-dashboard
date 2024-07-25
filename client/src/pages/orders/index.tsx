import { Table, message, Space, Tag, Steps, Button } from "antd"
import {
  useGetAdminOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/slices/ordersApiSlice"
import { useEffect, useState } from "react"
import ModalComponent from "../../components/ui/Modal"
import { useDispatch, useSelector } from "react-redux"
import {
  selectConfiguration,
  toggleModal,
} from "../../redux/slices/configurationSlice"
import { MODAL_STATE } from "../../common/states"

type User = {
  _id: string
  username: string
}

type Product = {
  product: {
    _id: string
    name: string
  }
  quantity: number
}

type Order = {
  _id: string
  phoneNumber: string
  user: User
  deliveryAddress: string
  status:
    | "order confirmed"
    | "processing order"
    | "order out for delivery"
    | "order delivered"
  products: Product[]
}

const { Step } = Steps

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const {
    data: orders,
    isLoading: ordersLoading,
    refetch,
  } = useGetAdminOrdersQuery(undefined)
  const [updateOrderStatus] = useUpdateOrderStatusMutation()

  console.log(orders)

  const configuration = useSelector((state) => selectConfiguration(state))
  const dispatch = useDispatch()

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({ orderId, status }).unwrap()
      await refetch()
      message.success("Order status updated successfully")
      dispatch(toggleModal(MODAL_STATE.CHANGE_ORDER_STATUS))
    } catch (error) {
      console.error("Failed to update order status:", error)
      message.error("Failed to update order status")
    }
  }

  const openModal = (order: Order) => {
    setSelectedOrder(order)
    dispatch(toggleModal(MODAL_STATE.CHANGE_ORDER_STATUS))
  }

  const getStatusIndex = (status: string) => {
    const statuses = [
      "order confirmed",
      "processing order",
      "order out for delivery",
      "order delivered",
    ]
    return statuses.indexOf(status)
  }

  const pagination = {
    pageSize: 10,
    total: orders?.length,
    showTotal: (total: number, range: [number, number]) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
  }

  const columns = [
    { title: "Order ID", dataIndex: "_id", key: "_id" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Username",
      key: "username",
      render: (text: string, record: Order) => record.user.username,
    },
    { title: "Address", dataIndex: "deliveryAddress", key: "deliveryAddress" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: Order) => (
        <Tag
          color={
            record.status === "order confirmed"
              ? "gold"
              : record.status === "processing order"
              ? "blue"
              : record.status === "order out for delivery"
              ? "cyan"
              : "green"
          }
        >
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    // {
    //   title: "Products",
    //   key: "products",
    //   dataIndex: "products",
    //   render: (products: Order["products"]) => (
    //     <ul>
    //       {products.map((product, index) => (
    //         <li key={index}>
    //           {product.product.name} (Quantity: {product.quantity})
    //         </li>
    //       ))}
    //     </ul>
    //   ),
    // },
    {
      title: "Change Status",
      key: "Change Status",
      render: (text: string, record: Order) => (
        <Space
          onClick={() => openModal(record)}
          className="text-orange-500"
          size="middle"
        >
          <a>Change Status</a>
        </Space>
      ),
    },
  ]

  return (
    <>
      <ModalComponent
        modalTitle="Change Status"
        open={configuration[MODAL_STATE.CHANGE_ORDER_STATUS]}
        onCancel={() => dispatch(toggleModal(MODAL_STATE.CHANGE_ORDER_STATUS))}
        footer={
          <Button
            type="primary"
            onClick={() =>
              selectedOrder &&
              handleStatusChange(selectedOrder._id, selectedOrder.status)
            }
          >
            Update Status
          </Button>
        }
      >
        {selectedOrder && (
          <Steps
            direction="vertical"
            progressDot
            current={getStatusIndex(selectedOrder.status)}
            onChange={(current) =>
              setSelectedOrder({
                ...selectedOrder,
                status: [
                  "order confirmed",
                  "processing order",
                  "order out for delivery",
                  "order delivered",
                ][current],
              })
            }
          >
            <Step
              title="Order Confirmed"
              description="Order has been confirmed"
            />
            <Step
              title="Processing Order"
              description="Order is being processed"
            />
            <Step
              title="Order Out for Delivery"
              description="Order is out for delivery"
            />
            <Step
              title="Order Delivered"
              description="Order has been delivered"
            />
          </Steps>
        )}
      </ModalComponent>
      <Table
        pagination={pagination}
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        loading={ordersLoading}
      />
    </>
  )
}

export default AdminOrders
