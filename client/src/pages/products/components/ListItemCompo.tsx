import { List } from "antd"
import moment from "moment"
import { Link } from "react-router-dom"

interface ItemProps {
  _id: string
  name: string
  description: string
  productImages: string[]
  createdBy?: {
    username: string
  }
  createdAt?: string
}

interface ListItemComponentProps {
  item: ItemProps
}

const ListItemComponent = ({ item }: ListItemComponentProps) => {
  return (
    <Link to={`/product/id/${item._id}`}>
      <List.Item
      style={{
        display: "flex",
        padding: "20px 20px"
      }}
        key={item._id}
        className="border-gray-400 rounded-lg shadow-lg my-4"
        extra={
          <img
            className="object-cover rounded-xl w-[100px] h-[100px]"
            alt={item.name}
            src={item.productImages[0] || "https://via.placeholder.com/300x300/ff0000"}
          />
        }
      >
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold mb-2">
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </h1>
          <h1>Created by: {item.createdBy?.username}</h1>
          <h1>Created at: {moment(item.createdAt).format("D MMM YYYY LT")}</h1>
        </div>
      </List.Item>
    </Link>
  )
}

export default ListItemComponent
