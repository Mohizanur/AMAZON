import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endpoints";
import ProductCard from "../../components/Product/ProductCard";
import classes from "./ProductDetail.module.css";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        console.log("Product data:", res.data);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setIsLoading(false);
      });
  }, [productId]); // Ensure useEffect runs when productId changes

  if (isLoading) return <Loader />;
  if (!product) return <p>Product not found</p>; // Prevent rendering empty state

  return (
    <Layout>
      <ProductCard
        product={product}
        flex={true}
        renderDesc={true}
        renderAdd={true}
      />
    </Layout>
  );
}

export default ProductDetail;
