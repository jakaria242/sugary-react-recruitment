import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import Typography from "../components/Typography";

const baseImage = "https://d1wh1xji6f82aw.cloudfront.net/";

function Dashboard() {
  const { user, logout } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef(null);

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
      const newMaterials = response.data.Materials || [];

      setMaterials((prev) => [...prev, ...newMaterials]);
      setHasMore(newMaterials.length === 20); // যদি ২০ এর কম হয়, তাহলে আর কিছু নেই
    } catch (err) {
      console.error("Failed to fetch materials:", err);
      setError("Error loading materials. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [page]);

  // IntersectionObserver দিয়ে lazy load handle
  const observer = useRef();

  const lastMaterialRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-container mx-4 md:mx-6 xl:mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h2" className="text-base sm:text-xl font-bold">
            Name: {user?.FullName}
          </Typography>
          <Button
            btnText="Logout"
            className="px-4 py-2 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            onClick={logout}
          />
        </div>

        {error && (
          <Typography
            variant="h2"
            className="text-red-600 flex justify-center items-center"
          >
            {error}
          </Typography>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {materials.map((item, index) => {
            if (materials.length === index + 1) {
              // শেষ এলিমেন্টে রেফারেন্স অ্যাসাইন
              return (
                <div ref={lastMaterialRef} key={index}>
                  <ProductCard
                    src={baseImage + item.CoverPhoto}
                    title={item.Title}
                    brandName={item.BrandName}
                    price={item.SalesPrice}
                  />
                </div>
              );
            } else {
              return (
                <ProductCard
                  key={index}
                  src={baseImage + item.CoverPhoto}
                  title={item.Title}
                  brandName={item.BrandName}
                  price={item.SalesPrice}
                />
              );
            }
          })}
        </div>

        {loading && (
          <div className="flex justify-center items-center">
            <Typography variant="h2" className="text-center my-4">
              Loading...
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
