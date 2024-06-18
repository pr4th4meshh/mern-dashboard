import { ProductOutlined } from "@ant-design/icons"
import { Avatar, Card, Skeleton } from "antd"
import Meta from "antd/es/card/Meta"
import { Product } from "../../../interfaces/ProductInterface"

const ProductCard = ({ productName, icon, createdBy, createdAt, loading }: Product) => {
  return (
    <>
      {loading ? (
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar icon={icon} size={50} />}
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      ) : (
        <Card className="w-full mt-4 h-[130px]">
          <div className="flex items-center">
            <Avatar icon={<ProductOutlined /> || icon} size={60} />
            <div className="ml-10 flex flex-col">
              <h1 className="text-lg uppercase font-semibold text-secondary pb-1">
                {productName?.length > 10
                  ? productName?.slice(0, 9) + ".."
                  : productName}
              </h1>
              <span className="text-sm text-gray-500">Created by {createdBy || "Insomnia"}</span>
              <span className="text-sm text-gray-500">Created at {createdAt}</span>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

export default ProductCard
