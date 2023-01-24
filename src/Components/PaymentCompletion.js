import React from "react";
import { Link } from "react-router-dom";

const PaymentCompletion = () => {
  return (
    <div className="payment-completion">
      <div className="payment-completion-container">
        Payment complete!
        <div>
          <Link className="button-large" to="/orders">
            View your Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompletion;
