import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  addCart,
  removeCart,
  deleteCart,
  getCloset,
} from "../store";

const Cart = () => {
  const { cart, hoodies } = useSelector((state) => state);
  const dispatch = useDispatch();
  const orderButton = document.getElementById("orderButton");
  //   cart.lineItems.map((lineItem) => {
  //     return;
  //   });

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  useEffect(() => {
    dispatch(getCloset());
  }, [cart]);

  const deleteFromCart = (garment, quantityToRemove) => {
    dispatch(deleteCart(garment, quantityToRemove));
  };

  const createOptions = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
      return <option key={el}>{el}</option>;
    });
  };

  const changeQuantity = (garment, oldQuantity, newQuantity) => {
    let quantity = newQuantity - oldQuantity;
    if (quantity > 0) {
      dispatch(addCart(garment, quantity));
    } else if (quantity < 0) {
      quantity = -1 * quantity;
      dispatch(removeCart(garment, quantity));
    }
  };

  if (cart) {
    return (
      <div className="cart-container">
        <h1>
          Cart - {cart.lineItems.length ? `Total: $${cart.totalPrice}` : ""}
        </h1>
        <ol>
          {cart.lineItems.length
            ? cart.lineItems.map((lineItem) => {
                console.log("lineItemPrice: ", lineItem.totalPrice);
                const hoodie = hoodies.find(
                  (hoodie) => hoodie.id === lineItem.productId
                );
                return (
                  <li key={hoodie?.id}>
                    <h5>
                      {hoodie?.name} (${hoodie?.price})
                    </h5>
                  </li>
                );
              })
            : "Cart is Empty"}
        </ol>
      </div>
    );
  }
};

export default Cart;
