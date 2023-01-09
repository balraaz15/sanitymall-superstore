import Link from 'next/link';
import React, { useEffect } from 'react';
import {BsBagCheckFill} from 'react-icons/bs';
import { useStateContext } from '../context/StateContext'

const PaymentSuccess = () => {
  const {setCartItems, setTotalPrice, setTotalQuantities}: any = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">
          Check your email inbox for email recipt.
        </p>
        <p className="description">
          If you have any queries please email <a href="mailto:orders@sanitysuperstore.com" className="email">orders@sanitysuperstore.com</a>
        </p>
        <Link href="/">
          <button type="button" className="btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess;