import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const [loginUser, setLoginUser]= useContext (UserContext);

    const { register, handleSubmit, watch, errors } = useForm ();
    const onSubmit = data => {
        console.log(data)

    };
    console.log(watch("example"));
    return (
      <form onSubmit={handleSubmit(onSubmit)}>

        <input name="name" defaultValue={loginUser.name} ref={register({ required: true })} placeholder="name" />
        {errors.name && <span>name is required</span>}

        <input name="email" defaultValue={loginUser.email} ref={register({ required: true })} placeholder="email" />
        {errors.email && <span>name is required</span>}

        <input name="address" ref={register({ required: true })} placeholder="address" />
        {errors.address && <span>name is required</span>}

        <input name="phone" ref={register({ required: true })} placeholder="phone number" />
        {errors.phone && <span>name is required</span>}

        <input type="submit" />
      </form>
    );
};

export default Shipment;