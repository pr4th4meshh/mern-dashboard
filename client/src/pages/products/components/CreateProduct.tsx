import ModalComponent from "../../../components/ui/Modal"
import { Button, Form, Input, Select, message } from "antd"
import {
  useCreateProductMutation,
  useGetAllProductsQuery,
} from "../../../redux/slices/productsSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectConfiguration,
  toggleModal,
} from "../../../redux/slices/configurationSlice"
import { MODAL_STATE } from "../../../common/states"
import { useGetAllCategoriesQuery } from "../../../redux/slices/categorySlice"

const CreateProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [form] = Form.useForm()
  const { refetch } = useGetAllProductsQuery(undefined)
  const [createProduct, { isLoading }] = useCreateProductMutation()
  const { data: categoriesData, refetch: categoriesRefetch } = useGetAllCategoriesQuery(undefined)
  const dispatch = useDispatch()
  const Configuration = useSelector(selectConfiguration)

  const handleCategoryChange = (value) => {
    setSelectedCategories(value);
  };

  const toggle = () => {
    form.resetFields()
    dispatch(toggleModal(MODAL_STATE.CREATE_PRODUCT_MODAL))
  }

  const onFinish = async (values) => {
    try {
      await createProduct({...values, category: values.category.join(", ")}).unwrap()
      message.success("Product created successfully!")
      form.resetFields()
      refetch()
      categoriesRefetch()
      toggle()
    } catch (error) {
      message.error(
        error.data?.message || error.message || "Error creating product"
      )
    }
  }

  useEffect(() => {
    refetch()
    categoriesRefetch()
  }, [refetch, categoriesRefetch])

  return (
    <div>
      <ModalComponent
        open={Configuration[MODAL_STATE.CREATE_PRODUCT_MODAL]}
        onCancel={toggle}
        modalTitle="Product"
      >
        <Form
          className="p-5 w-full bg-white"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
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
              mode="tags"
              allowClear
              style={{ width: "100%" }}
              placeholder="Select or enter Category Type"
              value={selectedCategories}
              onChange={handleCategoryChange}
            >
              {categoriesData?.map((category) => (
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
          <Form.Item>
            <Button
              className="w-full bg-secondary"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  )
}

export default CreateProduct
