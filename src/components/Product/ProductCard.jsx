import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import React, { useContext, useState } from "react";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  if (!product) return null;

  const [isExpanded, setIsExpanded] = useState(false);
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`} className={classes.image_wrapper}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>
      <div className={classes.product_info}>
        <h3 className={classes.product_title}>{title}</h3>
        {renderDesc && (
          <div>
            <p
              className={`${classes.product_description} ${
                isExpanded ? classes.expanded : ""
              }`}
            >
              {description}
            </p>
            <button
              onClick={toggleDescription}
              className={classes.toggle_button}
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
        <div className={classes.rating_container}>
          <Rating
            value={rating?.rate || 0}
            precision={0.1}
            className={classes.rating}
          />
          <small className={classes.review_count}>
            {rating?.count || 0} reviews
          </small>
        </div>
        <div className={classes.price_container}>
          <CurrencyFormat amount={price} className={classes.price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
