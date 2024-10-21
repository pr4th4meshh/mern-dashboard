import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/slices/productsSlice";
import PageNavbar from "../../components/ui/PageNavbar";
import useDebounce from "../../hooks/useDebounceHook";
import NotFoundComponent from "../../components/ui/NotFound";
import CreateProduct from "./components/CreateProduct";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/slices/configurationSlice";
import { MODAL_STATE } from "../../common/states";
import Loading from "../../components/ui/Loading";
import { List } from "antd";
import ListItemComponent from "./components/ListItemCompo";

interface ItemProps {
  _id: string;
  name: string;
  description: string;
  productImages: string[];
  createdBy?: {
    username: string;
  };
  createdAt?: string;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useGetAllProductsQuery(debouncedSearchTerm || undefined);

  console.log(products)
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!debouncedSearchTerm) {
      refetchProducts();
    }
  }, [debouncedSearchTerm, refetchProducts]);

  if (productsLoading) return <Loading />;
  if (productsError) {
    const errorMessage = (productsError as { message: string }).message;
    return <p>Error fetching products: {errorMessage}</p>;
  }

  const displayedProducts = products || [];
  if (!displayedProducts.length) {
    return <NotFoundComponent pageTitle="Products" />;
  }

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
      <List
        grid={{
          gutter: 16,
          column: 2,
          sm: 1,
          xs: 1,
        }}
        loadMore={productsLoading}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 8,
          hideOnSinglePage: true,
        }}
        locale={{ emptyText: "No products to display!" }}
        dataSource={displayedProducts}
        renderItem={(item: ItemProps) => <ListItemComponent item={item} />}
      />
    </div>
  );
};

export default Products;
