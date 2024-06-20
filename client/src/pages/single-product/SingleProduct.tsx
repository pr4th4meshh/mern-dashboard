import { useNavigate, useParams } from "react-router-dom"
import {
  useDeleteProductByIdMutation,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
} from "../../redux/slices/productsSlice"
import { Button, Form, Input, Popconfirm, message } from "antd"
import { useMemo } from "react"
import NestedLayout from "../../components/layouts/NestedLayout"
import moment from "moment"

const SingleProduct = () => {
  const { id } = useParams()
  const { data: singleProductData, refetch } = useGetProductByIdQuery(id)
  console.log(singleProductData)

  const [deleteProduct] = useDeleteProductByIdMutation()
  const [updateProduct] = useUpdateProductByIdMutation()
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      await deleteProduct(id)
      message.success("Product deleted")
      navigate("/")
    } catch (error) {
      message.error(error.data.message)
    }
  }

  const handleUpdate = async (values) => {
    try {
      await updateProduct({ id, ...values }).unwrap();
      message.success('Product updated successfully!');
      refetch();
    } catch (error) {
      if (error.data) {
        message.error(error.data.message || 'Error updating product');
      } else {
        message.error('An unknown error occurred');
      }
      console.error('Error updating product:', error);
    }
  };

  const fields = useMemo(() => {
    if (!singleProductData)
      return [
        { name: ["name"], value: `Loading..` },
        { name: ["description"], value: `Loading..` },
        { name: ["price"], value: `Loading..` },
      ]
    return [
      { name: ["name"], value: `${singleProductData?.name}` },
      { name: ["description"], value: `${singleProductData?.description}` },
      { name: ["price"], value: singleProductData?.price },
    ]
  }, [singleProductData])

  const [form] = Form.useForm()

  return (
    <NestedLayout
      title={singleProductData?.name}
      createdAt={moment(singleProductData?.createdAt).format("D MMM YYYY LT")}
      createdBy={singleProductData?.createdBy.username}
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

          <Form.Item>
            <div className="flex justify-between">
              <Popconfirm
                title="Delete Product"
                description="Are you sure to delete this product?"
                onConfirm={handleDelete}
              >
                <Button
                className="w-full mx-2"
                danger
              >
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
        </Form>
      </div>
    </NestedLayout>
  )
}

export default SingleProduct
