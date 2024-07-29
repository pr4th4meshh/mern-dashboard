import { ProductOutlined } from "@ant-design/icons"
import { Avatar, Card, Skeleton } from "antd"
import Meta from "antd/es/card/Meta"
import { Product } from "../../../interfaces/ProductInterface"
import { Link } from "react-router-dom"

const ProductCard = ({
  productName,
  icon,
  createdBy,
  createdAt,
  loading,
  productId,
}: Product) => {
  return (
    <>
      {loading ? (
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar icon={<ProductOutlined /> || icon} size={50} />}
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      ) : (
        <Link to={`/product/id/${productId}`}>
          <Card className="w-full mt-4 min-h-min min-w-min">
            <div className="flex items-center xs:flex-col lg:flex-row">
              <Avatar icon={<ProductOutlined /> || icon} size={50} />
              <div className="ml-5  flex flex-col">
                <h1 className="text-lg uppercase font-semibold text-secondary pb-1">
                  {productName && productName?.length > 10
                    ? productName?.slice(0, 9) + ".."
                    : productName}
                </h1>
                <span className="text-sm text-gray-500">
                  Created by {createdBy || "Insomnia"}
                </span>
                <span className="text-sm text-gray-500">
                  Created on {createdAt}
                </span>
              </div>
            </div>
          </Card>
        </Link>
      )}
    </>
  )
}

export default ProductCard
