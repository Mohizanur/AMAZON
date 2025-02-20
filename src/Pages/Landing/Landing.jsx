import React from "react";
import Layout from "../../components/Layout/Layout";
import Product from "../../components/Product/Product";
import CarouselEffect from "../../components/Carousel/CarouselEffect";
import Category from "../../components/Category/Category";

function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing;
