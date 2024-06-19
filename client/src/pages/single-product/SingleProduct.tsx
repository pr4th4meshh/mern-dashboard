import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/slices/productsSlice";
import { Button, Form, Input } from "antd";
import { useMemo } from "react";
import NestedLayout from "../../components/layouts/NestedLayout";
import moment from "moment";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: singleProductData, refetch } = useGetProductByIdQuery(id);
  console.log(singleProductData);

  const fields = useMemo(() => {
    if (!singleProductData)
      return [
        { name: ["name"], value: `Loading..` },
        { name: ["description"], value: `Loading..` },
        { name: ["price"], value: `Loading..` },
      ];
    return [
      { name: ["name"], value: `${singleProductData?.name}` },
      { name: ["description"], value: `${singleProductData?.description}` },
      { name: ["price"], value: singleProductData?.price },
    ];
  }, [singleProductData]);

  const [form] = Form.useForm();

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
            <Input placeholder="Enter product description.." className="w-full" />
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
              <Button
                className="w-full bg-red-500 text-white mx-2"
                type="primary"
                htmlType="submit"
                loading={null}
              >
                Delete
              </Button>
              <Button
                className="w-full bg-green-600 text-white mx-2"
                type="primary"
                htmlType="submit"
                loading={null}
              >
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </NestedLayout>
  );
};

export default SingleProduct;
