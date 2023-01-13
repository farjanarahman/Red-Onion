import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/useAuth";

const OrderForm = ({ getCustomerInfo }) => {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.paid = false;
    data.delivered = false
    data.closed = false
    data.orderdate = new Date().toDateString();
    
    getCustomerInfo(data);
  };
  return (
    <>
      <h3>Edit Delivery Address</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Deliver to:"
          {...register("customername", { required: true })}
        />
        {errors.customername && (
          <span className="text-danger">This field is required</span>
        )}

        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-danger">This field is required</span>
        )}

        <input
          className="form-control mb-2"
          type="text"
          placeholder="Contact No."
          {...register("contact", { required: true })}
        />
        {errors.contact && (
          <span className="text-danger">This field is required</span>
        )}

        <input
          className="form-control mb-2"
          type="text"
          placeholder="House No./Flat/floor no."
          {...register("house", { required: true })}
        />
        {errors.house && (
          <span className="text-danger">This field is required</span>
        )}

        <input
          className="form-control mb-2"
          type="text"
          placeholder="Street Name:"
          {...register("street", { required: true })}
        />
        {errors.street && (
          <span className="text-danger">This field is required</span>
        )}

        {auth.user ? (
          <input type="submit" className="btn btn-danger" value="Submit" />
        ) : (
          <Link
            to="/login"
            className="btn btn-danger marginTop10px"
            type="button"
          >
            Login To Proceed
          </Link>
        )}
      </form>
    </>
  );
};

export default OrderForm;
