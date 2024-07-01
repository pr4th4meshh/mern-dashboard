import { useNavigate, useParams } from "react-router-dom"
import {
  useDeleteProductByIdMutation,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
} from "../../redux/slices/productsSlice"
import { Button, Form, Input, Popconfirm, Select, Tag, message } from "antd"
import { useMemo } from "react"
import NestedLayout from "../../components/layouts/NestedLayout"
import moment from "moment"
import { useSelector } from "react-redux"
import Loading from "../../components/ui/Loading"
import { useGetAllCategoriesQuery } from "../../redux/slices/categorySlice"

const SingleProduct = () => {
  const { id } = useParams()
  const {
    data: singleProductData,
    refetch,
    isLoading,
  } = useGetProductByIdQuery(id)
  const { data: categoriesData, refetch: categoriesRefetch } =
    useGetAllCategoriesQuery(undefined)
  const [deleteProduct] = useDeleteProductByIdMutation()
  const [updateProduct] = useUpdateProductByIdMutation()

  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      await deleteProduct(id).unwrap()
      message.success("Product deleted")
      navigate("/")
    } catch (error) {
      message.error(error.data.message)
    }
  }

  const handleUpdate = async (values) => {
    try {
      await updateProduct({ id, ...values }).unwrap()
      message.success("Product updated successfully!")
      refetch()
      categoriesRefetch()
    } catch (error) {
      if (error.data) {
        message.error(error.data.message || "Error updating product")
      } else {
        message.error("An unknown error occurred")
      }
      console.error("Error updating product:", error)
    }
  }

  const fields = useMemo(() => {
    if (!singleProductData)
      return [
        { name: ["name"], value: `Loading..` },
        { name: ["description"], value: `Loading..` },
        { name: ["price"], value: `Loading..` },
        { name: ["category"], value: `Loading...` },
      ]
    return [
      { name: ["name"], value: `${singleProductData?.name}` },
      { name: ["description"], value: `${singleProductData?.description}` },
      { name: ["price"], value: singleProductData?.price },
      { name: ["category"], value: singleProductData?.category },
    ]
  }, [singleProductData])

  const [form] = Form.useForm()

  if (isLoading) return <Loading />

  return (
    <NestedLayout
      title={singleProductData?.name}
      createdAt={moment(singleProductData?.createdAt).format("D MMM YYYY LT")}
      createdBy={singleProductData?.createdBy?.username}
    >
      <div className="flex justify-center">
        <Form
          className="p-5 w-full bg-white sm:w-[500px] pt-[100px]"
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          fields={fields}
          onFinish={handleUpdate}
          disabled={user.role === "user"}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input placeholder="Enter product name.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
          >
            <Input
              placeholder="Enter product description.."
              className="w-full"
            />
          </Form.Item>

          <Form.Item label="Category" name="category" required>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select or enter Category Type"
              // onChange={handleCheckboxChange}
            >
              {categoriesData?.map((category: string) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <Input
              placeholder="Enter product price.."
              type="number"
              className="w-full"
            />
          </Form.Item>

          {user.role === "user" ? (
            <div className="flex justify-center">
              <Tag className="flex w-min text-lg" color="volcano">
                You are only allowed to view the product as a User.
              </Tag>
            </div>
          ) : (
            <Form.Item>
              <div className="flex justify-between">
                <Popconfirm
                  title="Delete Product"
                  description="Are you sure to delete this product?"
                  onConfirm={handleDelete}
                >
                  <Button className="w-full mx-2" danger>
                    Delete
                  </Button>
                </Popconfirm>
                <Button
                  className="w-full bg-green-600 text-white mx-2"
                  type="primary"
                  htmlType="submit"
                >
                  Update
                </Button>
              </div>
            </Form.Item>
          )}
        </Form>
      </div>
    </NestedLayout>
  )
}

export default SingleProduct
