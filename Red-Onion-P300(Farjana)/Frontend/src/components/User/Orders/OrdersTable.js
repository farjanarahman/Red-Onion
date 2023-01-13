import React from 'react';
import OrderData from './OrderData/OrderData';

const OrdersTable = ({orders, admin, getPaymentStatus, getDeliveryStatus, getCloseStatus, deleteOrder}) => {
    return (
        <table className="table">
            <thead>
                <th scope="col">
                    Date
                </th>
                <th scope="col">
                    Email
                </th>
                <th scope="col"> 
                    Contact no
                </th>
                <th scope="col">
                    Delivery Address
                </th>
                <th scope="col">
                    Status (Payment, Delivery)
                </th>
                <th scope="col">
                    Items
                </th>
                { admin === true ? <th scope="col">
                    Actions
                 </th> : null
                }
            </thead>
            <tbody>
                {
                    orders.map(order => <OrderData key={order._id} order={order} admin={admin} getPaymentStatus={getPaymentStatus} getDeliveryStatus={getDeliveryStatus} getCloseStatus={getCloseStatus} deleteOrder={deleteOrder}/>)
                }
            </tbody>
        </table>
    );
};

export default OrdersTable;