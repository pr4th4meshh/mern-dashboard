import { useEffect, useState } from "react";
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
} from "../../redux/slices/productsSlice";
import ProductCard from "./components/ProductCard";
import moment from "moment";
import PageNavbar from "../../components/ui/PageNavbar";
import useDebounce from "../../hooks/useDebounceHook";
import NotFoundComponent from "../../components/ui/NotFound";
import CreateProduct from "./components/CreateProduct";

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
  } = useGetAllProductsQuery(debouncedSearchTerm);

  const [createProduct] = useCreateProductMutation();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!debouncedSearchTerm) {
      refetchProducts();
    }
  }, [debouncedSearchTerm, refetchProducts]);

  const handleCreateProductSuccess = async (newProduct) => {
    try {
      await createProduct(newProduct); // Call the mutation to create product
      await refetchProducts(); // Refetch products after successful creation
      console.log("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (productsLoading) return <p>Loading products...</p>;
  if (productsError) {
    const errorMessage = productsError?.message;
    return <p>Error fetching products: {errorMessage}</p>;
  }

  const displayedProducts = products;

  return (
    <div>
      <CreateProduct onCreateSuccess={handleCreateProductSuccess} />
      <PageNavbar
        searchTerm={searchTerm}
        searchOnChange={handleInputChange}
        canSearch
        title="Products"
        buttonName="Create Product"
      />
      {debouncedSearchTerm ? (
        <h1 className="text-lg text-secondary font-semibold">Search result:</h1>
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
