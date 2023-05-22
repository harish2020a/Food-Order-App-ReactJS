import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import React, { useContext, useState } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const [ordered, setOrdered] = useState(false);

  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setOrdered(true);
  };

  const clearHandler = () => {
    cartCtx.removeAll();
    props.onHide();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            ordered={ordered}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  return (
    <React.Fragment>
      {!ordered && (
        <Modal onHide={props.onHide}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onHide}>
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </Modal>
      )}
      {ordered && (
        <Modal onHide={props.onHide}>
          <div className={classes.total}>
            <span>Ordered Items</span>
          </div>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount: {totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={clearHandler}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Cart;
