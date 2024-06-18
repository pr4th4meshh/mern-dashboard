import { useEffect, useState } from "react"
import {
  useGetAllProductsQuery,
  useGetProductsByNameQuery,
} from "../../redux/slices/productsSlice"
import ProductCard from "./components/ProductCard"
import moment from "moment"
import PageNavbar from "../../components/ui/PageNavbar"
import useDebounce from "../../hooks/useDebounceHook"
import NotFoundComponent from "../../components/ui/NotFound"

type ProductProps = {
  _id: string
  name: string
  createdBy?: string
  createdAt?: string
}

const Products = () => {
  const {
    data: allProducts,
    refetch: refetchAllProducts,
    isLoading: allProductsLoading,
    error: allProductsError,
  } = useGetAllProductsQuery(undefined)

  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const {
    data: productsBySearch,
    error: productsBySearchError,
    isLoading: productsBySearchLoading,
  } = useGetProductsByNameQuery(debouncedSearchTerm)

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (!debouncedSearchTerm) {
      refetchAllProducts()
    }
  }, [debouncedSearchTerm, refetchAllProducts])

  const displayedProducts = debouncedSearchTerm ? productsBySearch : allProducts

  if (allProductsLoading || productsBySearchLoading)
    return <p>Loading products...</p>
  if (allProductsError || productsBySearchError) {
    const errorMessage =
      allProductsError?.message || productsBySearchError?.message
    return <p>Error fetching products: {errorMessage}</p>
  }

  return (
    <div>
      <PageNavbar
        searchTerm={searchTerm}
        searchOnChange={handleInputChange}
        canSearch
        title="Products"
        buttonName="Create Product"
      />
      {debouncedSearchTerm ? (
        <h1 className="text-lg text-secondary font-semibold">
        Search result:
      </h1>
      ) : (
        <h1 className="text-lg text-secondary font-semibold">
          All Products ({displayedProducts?.length})
        </h1>
      )}
      <div className="grid grid-cols-4">
        {displayedProducts && displayedProducts.length > 0 ? (
          displayedProducts.map((product: ProductProps) => (
            <div className="m-3" key={product._id}>
              <ProductCard
                productName={product.name}
                icon={undefined}
                loading={allProductsLoading}
                createdBy={product.createdBy?.username}
                createdAt={moment(product.createdAt).format("D MMM YYYY LT")}
              />
            </div>
          ))
        ) : (
          <div>
            <NotFoundComponent pageTitle={"Products"} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
