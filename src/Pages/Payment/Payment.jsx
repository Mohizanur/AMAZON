import classes from "./Payment.module.css";
import Layout from "../../components/Layout/Layout";
import React, { useContext, useState } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard"; // Ensure correct path
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios"; // Updated axios import
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );
  const totalItem = Array.isArray(basket)
    ? basket.reduce((amount, item) => amount + (item.amount || 0), 0)
    : 0;

  const handleChange = (event) => {
    setCardError(event.error ? event.error.message : "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);

      // Backend request to get client secret
      const response = await axiosInstance.post(
        `/payment/create`,
        { total: Math.round(total * 100) } // Ensure it's an integer (cents)
      );
      const clientSecret = response.data?.clientSecret;

      if (!clientSecret)
        throw new Error("Client secret not received from the backend.");

      // Confirm payment using Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: elements.getElement(CardElement) },
        }
      );

      if (error) {
        console.error("Payment failed:", error.message);
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      console.log("Payment successful:", paymentIntent);

      // Save order in Firestore
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders") // Make sure it's `orders` (plural)
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({ type: Type.EMPTY_BASKET });

      navigate("/orders", { state: { msg: "You have placed an order" } });
    } catch (error) {
      console.error("Error processing payment:", error.message);
      setCardError(error.message);
    }
    setProcessing(false);
  };

  return (
    <Layout>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Ethiopia, Addis Ababa</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement
                  onChange={handleChange}
                  className={classes.CardElement}
                />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total order</p> | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <clipLoader color="grey" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
