import { ReactNode, useEffect, useState } from "react";
import {
  useGetAllProductsQuery,
} from "../../redux/slices/productsSlice";
import ProductCard from "./components/ProductCard";
import moment from "moment";
import PageNavbar from "../../components/ui/PageNavbar";
import useDebounce from "../../hooks/useDebounceHook";
import NotFoundComponent from "../../components/ui/NotFound";
import CreateProduct from "./components/CreateProduct";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/slices/configurationSlice";
import { MODAL_STATE } from "../../common/states";

type ProductProps = {
  _id: string;
  name: string;
  createdBy?: string;
  createdAt?: string;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useGetAllProductsQuery(debouncedSearchTerm || undefined);

  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!debouncedSearchTerm) {
      refetchProducts();
    }
  }, [debouncedSearchTerm, refetchProducts]);

  if (productsLoading) return <p>Loading products...</p>;
  if (productsError) {
    const errorMessage = productsError?.message;
    return <p>Error fetching products: {errorMessage}</p>;
  }

  const displayedProducts = products || [];

  return (
    <div>
      <CreateProduct />
      <PageNavbar
        searchTerm={searchTerm}
        searchOnChange={handleInputChange}
        onClick={() => dispatch(toggleModal(MODAL_STATE.CREATE_PRODUCT_MODAL))}
        canSearch
        title="Products"
        buttonName="Create Product"
      />
      {debouncedSearchTerm ? (
        <h1 className="text-lg text-secondary font-semibold">Search result:</h1>
      ) : (
        <h1 className="text-lg text-secondary font-semibold">
          All Products ({displayedProducts.length})
        </h1>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product: ProductProps) => (
            <div className="m-3" key={product._id}>
              <ProductCard
              productId={product._id}
                productName={product.name}
                icon={undefined}
                loading={productsLoading}
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
  );
};

export default Products;
