import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  addCart,
  removeCart,
  deleteCart,
  getCloset,
  createOrder,
} from "../store";

const Cart = () => {
  const { cart, hoodies } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  //   const data = [
  //     { key1: 1, key2: 2 },
  //     { key1: 3, key2: 4 },
  //     { key1: 5, key2: 6 },
  //   ];
  //   const key = "key1";

  const total = cart.lineItems.reduce((acc, curr) => {
    return acc + curr["totalPrice"];
  }, 0);

  if (cart) {
    return (
      <div className="cart-container">
        <h1>Cart - {cart.lineItems.length ? `Total: $${total}` : ""}</h1>
        <ol>
          {cart.lineItems.length
            ? cart.lineItems.map((lineItem) => {
                console.log("lineItemPrice: ", lineItem.totalPrice);
                console.log(lineItem.id);
                const hoodie = hoodies.find(
                  (hoodie) => hoodie.id === lineItem.hoodieId
                );
                console.log(hoodies);
                console.log(cart.lineItems[0].quantity);
                console.log(cart.lineItems);
                return (
                  <li key={hoodie?.id}>
                    <h5>
                      {hoodie?.name} (${hoodie?.price})
                    </h5>
                    <img src={hoodie?.image}></img>
                  </li>
                );
              })
            : "Cart is Empty"}
        </ol>
        <h1>Your Cart Order Total is ${total}</h1>
        <button
          className="button-large"
          onClick={() => {
            dispatch(createOrder(navigate));
          }}
        >
          Place Order
        </button>
      </div>
    );
  }
};

export default Cart;
