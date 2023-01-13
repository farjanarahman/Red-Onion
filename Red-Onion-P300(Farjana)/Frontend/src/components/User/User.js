import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../Authentication/useAuth";
import OrdersTable from "./Orders/OrdersTable";

const User = () => {
  const [orders, setOrders] = useState([]);
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const auth = useAuth();

  useEffect(() => {
    if (auth.user && admin) {
      fetch(`http://localhost:5000/orders`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    } else if (auth.user) {
      fetch(`http://localhost:5000/userOrders/${auth.user.email}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [auth.user]);

  const getPaymentStatus = (status, id) => {
    fetch(`http://localhost:5000/updatePaymentStatus/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paid: status }),
    }).then((res) => {
      if (res.ok) {
        alert("Payment status updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };
  const getDeliveryStatus = (status, id) => {
    console.log(status, id);
    fetch(`http://localhost:5000/updateDeliveryStatus/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ delivered: status }),
    }).then((res) => {
      if (res.ok) {
        alert("Delivery status updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };
  const getCloseStatus = (status, id) => {
    console.log(status, id);
    fetch(`http://localhost:5000/updateCloseStatus/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ closed: status }),
    }).then((res) => {
        if (res.ok) {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      });
  };
  const deleteOrder = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/deleteOrder/${id}`,{
        method: "DELETE"
    })
    .then((res) =>  {
        if (res.ok) {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    );
  };
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-12">
          {orders.length > 0 ? (
            <OrdersTable
              orders={orders}
              admin={admin}
              getPaymentStatus={getPaymentStatus}
              getDeliveryStatus={getDeliveryStatus}
              getCloseStatus={getCloseStatus}
              deleteOrder={deleteOrder}
            />
          ) : (
            <div>
              {" "}
              <h2>No orders found</h2>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
