import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  useEffect(() => {
    dispatch(getCloset());
  }, [cart]);

  const deleteFromCart = (garment, quantityToRemove) => {
    console.log(quantityToRemove);
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

  const total = cart.lineItems.reduce((acc, curr) => {
    return acc + curr["totalPrice"];
  }, 0);

  if (cart) {
    console.log(cart);
    return (
      <div className="cart-container">
        <h1>Cart</h1>
        <ol className="cart-items">
          {cart.lineItems.length
            ? cart.lineItems.map((lineItem) => {
                console.log("lineItemPrice: ", lineItem.totalPrice);
                console.log(lineItem.id);
                const hoodie = hoodies.find(
                  (hoodie) => hoodie.id === lineItem.hoodieId
                );
                {
                  /* console.log(hoodies); */
                }
                {
                  /* console.log(cart.lineItems[0].quantity); */
                }
                {
                  /* console.log(cart.lineItems); */
                }
                return (
                  <li key={hoodie?.id}>
                    <h5>
                      {hoodie?.name}
                      <br></br>
                      <span className="line-item-info">${hoodie?.price}</span>
                      <br></br>
                      <span className="line-item-info">
                        Quantity: {lineItem.quantity}
                      </span>
                      <br></br>
                      <span className="line-item-info">
                        Size: {lineItem.size}
                      </span>
                      <br></br>
                      <button
                        className="removeButton"
                        onClick={() => {
                          dispatch(deleteCart(hoodie, lineItem.quantity));
                        }}
                      >
                        remove
                      </button>
                      <label>Quantity</label>
                      <select
                        name="Quantity"
                        value={lineItem.quantity}
                        onChange={(e) => {
                          console.log(lineItem.quantity, "->", e.target.value);
                          changeQuantity(
                            hoodie,
                            lineItem.quantity,
                            e.target.value
                          );
                        }}
                      >
                        {createOptions()}
                      </select>
                    </h5>

                    <img src={hoodie?.image}></img>
                  </li>
                );
              })
            : "Cart is Empty"}
        </ol>
        <h1 className="order-total-message">
          Your Cart Order Total is ${total}
        </h1>
        {/* <button className="button-large">Place Order</button> */}
        <Link to="/payment" className="button-large">
          Check Out
        </Link>
      </div>
    );
  }
};

export default Cart;
