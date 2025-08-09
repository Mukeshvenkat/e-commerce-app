import { useEffect, useState } from "react";
import { ApiRequestUtils } from "../../shared/api/ApirequestUtils";
import { API_ROUTES } from "../../utilities/Constants";

const Home = () => {
  const [productList, setProductList] = useState([]);

  const getUserData = async () => {
    let data = await ApiRequestUtils.get(API_ROUTES.PRODUCT_DETAILS);
    setUser(JSON.parse(userData));
  };

  useEffect(() => {
    getUserData();
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Home Page</h1>
    </div>
  )
};

export default Home;
