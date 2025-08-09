import { useEffect, useState } from "react";
import { API_ROUTES } from "../../utilities/Constants";
import ProductList from "../product/ProductList";
import { ApiRequestUtils } from "../../shared/api/ApiRequestUtils";

const Home = () => {
  const [productList, setProductList] = useState([]);

  // const getUserData = async () => {
  //   let data = await ApiRequestUtils.get(API_ROUTES.PRODUCT_DETAILS);
  // };

  // useEffect(() => {
  //   getUserData();
  // }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Home Page</h1>
        <ProductList />
    </div>
  )
};

export default Home;
