import React from "react";
import { CategoryInfos } from "./CategoryFullinfos";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
  return (
    <section className={classes.category__container}>
      {CategoryInfos.map((infos) => (
        <CategoryCard key={infos.name} data={infos} /> 
      ))}
    </section>
  );
}

export default Category;
