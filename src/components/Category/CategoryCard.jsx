import React from "react";
import classes from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  return (
    <div className={classes.category}>
      <Link to={`/results/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt={data?.title || "category Image"} />
        <p className={classes.shopNow}>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
