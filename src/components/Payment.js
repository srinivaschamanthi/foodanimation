import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import logo from '../assets/logo.png'


const Payment = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  function itemsTotal() {
    let sum = 0;
    cartItems.forEach(
      (element) =>
        (sum =
          sum +
          (element.inStock *
            (element.card.info.price
              ? element.card.info.price
              : element.card.info.defaultPrice)) /
            100)
    );
    return sum;
  }
  let itemTotal = itemsTotal();
  let finalBill = itemTotal + 59 + Math.round((itemTotal * 12) / 100);

  const openCheckout = () => {
    const options = {
      key: "rzp_test_ybx9RQ74YuV0U4",
      amount: finalBill * 100, // 2000 paise = INR 20, amount in paisa
      name: "Srinivas Chamanthi",
      description: "Purchase Description",
      image: logo,
      handler: function (response) {
        toast.success(
          `Order placed successfully! Your order ID is ${response.razorpay_payment_id}`,
          {
            autoClose: 10000, // 10000 milliseconds = 10 seconds
          }
        );
        dispatch(clearCart());
      },
      prefill: {
        name: "Srinivas Chamanthi",
        email: "srinivas@razorpay.com",
      },
      notes: {
        address: "pithapuram- - 533450,East Godavari,Andhra Pradesh,India",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div className="billdetails">
      <h2>Bill details</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Item Total</h3>
        <h3>₹{itemTotal}</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Delivery Charges</h3>
        <h3>₹59</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>GST and Restaurant Charges</h3>
        <h3>₹{Math.round((itemTotal * 12) / 100)}</h3>
      </div>
      <div className="_1_jO5"></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>To Pay</h3>
        <h3>₹{finalBill}</h3>
      </div>
      <div className="billpaybutton" onClick={openCheckout}>
        Pay Rs. {finalBill}
      </div>
    </div>
  );
};

export default Payment;
