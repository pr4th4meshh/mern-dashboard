import ModalComponent from '../../../components/ui/Modal';
import { Button, Form, Input, message } from 'antd';
import { useCreateProductMutation, useGetAllProductsQuery } from '../../../redux/slices/productsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConfiguration, toggleModal } from '../../../redux/slices/configurationSlice';
import { MODAL_STATE } from '../../../common/states';

const CreateProduct = () => {
  const [form] = Form.useForm();
  const { refetch } = useGetAllProductsQuery(undefined);
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const dispatch = useDispatch();
  const Configuration = useSelector(selectConfiguration);

  const toggle = () => {
    form.resetFields();
    dispatch(toggleModal(MODAL_STATE.CREATE_PRODUCT_MODAL));
  };

  const onFinish = async (values) => {
    try {
      await createProduct(values).unwrap();
      message.success('Product created successfully!');
      form.resetFields();
      refetch();
      toggle();
    } catch (error) {
      message.error(error.data?.message || error.message || "Error creating product");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <ModalComponent open={Configuration[MODAL_STATE.CREATE_PRODUCT_MODAL]} onCancel={toggle} modalTitle="Product">
        <Form
          className='p-5 w-full bg-white'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input placeholder='Enter product name..' className='w-full' />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input product description!' }]}
          >
            <Input placeholder='Enter product description..' className='w-full' />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input product price!' }]}
          >
            <Input placeholder='Enter product price..' type="number" className='w-full' />
          </Form.Item>
          <Form.Item>
            <Button className='w-full bg-secondary' type="primary" htmlType="submit" loading={isLoading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default CreateProduct;