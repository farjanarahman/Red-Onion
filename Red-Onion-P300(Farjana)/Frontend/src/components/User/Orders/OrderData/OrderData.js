import React from "react";
import { Link } from "react-router-dom";

const OrderData = ({ order, admin, getPaymentStatus, getDeliveryStatus, getCloseStatus, deleteOrder }) => {
  const {
    _id,
    email,
    contact,
    house,
    street,
    orderdate,
    cart,
    paid,
    delivered,
  } = order;

  const alertForPaymentStatus = (status, id) => {
      if(status){
          if(window.confirm('Are you sure want to update payment status?')){
            getPaymentStatus(status, id)
          }
      }else{
        if(window.confirm('Are you sure want to update payment status as undo?')){
            getPaymentStatus(status, id)
          }
      }
  };
  const alertForDeliverytStatus = (status, id) => {
      if(status){
          if(window.confirm('Are you sure want to update delivery status?')){
              getDeliveryStatus(status, id)
          }
      }else{
        if(window.confirm('Are you sure want to update delivery status as undo?')){
            getDeliveryStatus(status, id)
        }
      }
  };

  const alertForCloseStatus = (status, id) => {
    if(status){
        if(window.confirm('Are you sure want to update closed status?')){
            getCloseStatus(status, id)
        }
    }
  }

  const alertForDelete = (id) => {
      if(window.confirm("Are you sure want to delete this order?")){
          deleteOrder(id)
      }
  };


  return (
    <tr>
      <td>{orderdate}</td>
      <td>{email}</td>
      <td>{contact}</td>
      <td>
        {house}, {street}
      </td>
      <td>
        {paid ? "paid" : "pending"}, {delivered ? "delivered" : "pending"}
      </td>
      <td>
        <table className="table table-striped table-bordered">
          <thead>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr>
                <td>{item.title}</td>
                <td>
                  {item.price * item.quantity} ({item.price})
                </td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
     {
         admin &&  <td>
         <div className="dropdown">
           <button
             className="btn btn-dark dropdown-toggle"
             type="button"
             id="dropdownMenuButton1"
             data-bs-toggle="dropdown"
             aria-expanded="false"
           >
             Actions
           </button>
           <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
             <li>
               <Link
                 href=""
                 className="dropdown-item pe-auto"
                 onClick={() => alertForPaymentStatus(true, _id)}
               >
                 Paid
               </Link>
             </li>
             <li>
               <Link
                 href=""
                 className="dropdown-item pe-auto"
                 onClick={() => alertForDeliverytStatus(true, _id)}
               >
                 Delivered
               </Link>
             </li>
             <li>
               <Link
                 href=""
                 className="dropdown-item pe-auto"
                 onClick={() =>alertForCloseStatus(true, _id)}
               >
                 Close
               </Link>
             </li>
             <li>
               <Link
                 href=""
                 className="dropdown-item pe-auto"
                 onClick={() => alertForDelete(_id)}
               >
                 Delete
               </Link>
             </li>
             <hr />
             <li>
               <Link
                 href=""
                 className="dropdown-item pe-auto"
                 onClick={() => alertForPaymentStatus(false, _id)}
               >
                 Undo Paid
               </Link>
             </li>
             <li>
               <Link
                 href=""
                 className="dropdown-item pe-auto"
                 onClick={() => alertForDeliverytStatus(false, _id)}
               >
                 Undo Delivered
               </Link>
             </li>
           </ul>
         </div>
       </td>
     }
    </tr>
  );
};

export default OrderData;
