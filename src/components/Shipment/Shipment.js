import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPeyment from '../ProcessPeyment/ProcessPeyment';

const Shipment = () => {
  const [loginUser, setLoginUser] = useContext(UserContext);

  const { register, handleSubmit, watch, errors } = useForm();
  const [shippingData, setShippingData]= useState(null)

  const onSubmit = data => {
    setLoginUser(data)
   


  };
  console.log(watch("example"));

  const handlePaymentSuccess= paymentId=>{

    // console.log(data)
    const saveCart = getDatabaseCart()
    const orderDetails = {
       ...loginUser, 
       products: saveCart,
        shipment: shippingData, 
        paymentId,  
        orderTime: new Date() }
    fetch('https://calm-peak-57009.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('your order placed successfully');
        }
      })
    

  }
  return (
    <div className="row">
      <div className="col-md-6">
        <form style={{display: shippingData? 'none': 'block'}}  onSubmit={handleSubmit(onSubmit)}>

          <input className="form-control" name="name" defaultValue={loginUser.name} ref={register({ required: true })} placeholder="name" />
          {errors.name && <span>name is required</span>}

          <input className="form-control" name="email" defaultValue={loginUser.email} ref={register({ required: true })} placeholder="email" />
          {errors.email && <span>name is required</span>}

          <input className="form-control" name="address" ref={register({ required: true })} placeholder="address" />
          {errors.address && <span>name is required</span>}

          <input className="form-control" name="phone" ref={register({ required: true })} placeholder="phone number" />
          {errors.phone && <span>name is required</span>}

          <input className="bt bt-primary mt-3" type="submit" />
        </form>

      </div>
      <div style={{display: shippingData? 'block': 'none'}} className="col-md-6">
        <ProcessPeyment handlePayment={handlePaymentSuccess} ></ProcessPeyment>

      </div>
    </div>
  );
};

export default Shipment;