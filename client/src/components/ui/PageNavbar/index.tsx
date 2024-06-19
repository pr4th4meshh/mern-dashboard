import { Input } from "antd"
import { Header } from "antd/es/layout/layout"
import ButtonComponent from "../ButtonComponent"

type PageNavbarProps = {
  title: string
  canSearch: boolean
  buttonName: string
  searchOnChange: () => void
  searchTerm: string
}

const PageNavbar = ({
  title,
  canSearch,
  buttonName,
  searchOnChange,
  searchTerm,
  onClick
}: PageNavbarProps) => {
  const { Search } = Input
  return (
    <Header className="bg-white border-b mb-5">
      <div className="flex justify-between">
        {canSearch && (
          <Search
            size="large"
            placeholder={`Search ${title}..`}
            onChange={searchOnChange}
            value={searchTerm}
            className="px-6"
          />
        )}
        <ButtonComponent cn="" onClick={onClick} name={buttonName} />
      </div>
    </Header>
  )
}

export default PageNavbar
