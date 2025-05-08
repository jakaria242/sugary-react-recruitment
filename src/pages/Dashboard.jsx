import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import Typography from "../components/Typography";

const baseImage = "https://d1wh1xji6f82aw.cloudfront.net/";

function Dashboard() {
  const { user, logout } = useAuth();
  // console.log(user);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchMaterials = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    const filter = btoa(
      JSON.stringify({ Skip: (page - 1) * 20, Limit: 20, Types: [1] })
    );
    try {
      const response = await axios.get(
        "https://sugarytestapi.azurewebsites.net/Materials/GetAll/",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { filter },
        }
      );
        
      setMaterials((prevMaterials) => [
        ...prevMaterials,
        ...response.data.Materials,
      ]);
    } catch (err) {
      console.error("Failed to fetch materials:", err);
      setError('Error loading materials. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // console.log(materials);
  

  const loadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [page]);

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-container mx-4 md:mx-6  xl:mx-auto">
        <div className="flex justify-between items-center  mb-4">
          <Typography variant="h2" className="text-base sm:text-xl font-bold ">
            Name: {user?.FullName}
          </Typography>
          <Button
          btnText="Logout"
            className=" px-4 py-2 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            onClick={logout}
          />
        </div>
          {error && <Typography variant="h2" className="text-red-600 flex justify-center items-center">{error}</Typography>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {materials.map((item,index) => (
            <ProductCard
              key={index}
              src={baseImage + item.CoverPhoto}
              title={item.Title}
              brandName={item.BrandName}
              price={item.SalesPrice}
            />
          ))}
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Typography variant="h2" className="text-center my-4">
              Loading...
            </Typography>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Button
              btnText="Load More"
              className="px-4 py-3 bg-blue-500 hover:bg-blue-900 text-white rounded mt-4 transition duration-300"
              onClick={loadMore}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
