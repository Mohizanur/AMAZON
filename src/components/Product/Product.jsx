import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../../components/Loader/Loader";  

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products?.map((singleProduct) => (
            <ProductCard
              renderAdd={true}
              product={singleProduct}
              key={singleProduct.id}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default Product;