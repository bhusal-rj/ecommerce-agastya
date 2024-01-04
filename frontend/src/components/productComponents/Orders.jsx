import React from "react";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
const Orders = ({ orders }) => {
  orders.forEach((order) => {
    let total = 0;
    order.products.forEach((prod) => {
      total += prod.price * prod.qty;
    });
    order.totalPrice = total;
  });
  return (
    <div className='mt-6 flex flex-col'>
      <div className='flex flex-row'>
        <h3 className='basis-1/6 font-bold'>S.N.</h3>
        <h3 className='basis-1/6 font-bold'>OrderId</h3>
        <h3 className='basis-1/6 font-bold'>Shipping Location</h3>
        <h3 className='basis-1/6 font-bold'>Total Price</h3>
        <h3 className='basis-2/6 font-bold'>Actions</h3>
      </div>
      {orders.map((order, i) => {
        return (
          <div className='flex flex-row mt-6'>
            <h3 className='basis-1/6'>{i + 1}</h3>
            <h3 className='basis-1/6'>{order.orderId}</h3>
            <h3 className='basis-1/6'>{order.shipAddress1}</h3>
            <h3 className='basis-1/6'>{order.totalPrice}</h3>
            <h3 className='basis-2/6'>
              <div className='flex text-2xl'>
                <Link to={`/orders/${order.id}`}>
                  <IoEyeSharp className='mr-4 border border-black cursor-pointer hover:bg-red-100 rounded-xl' />
                </Link>
              </div>
            </h3>
          </div>
        );
      })}
    </div>
  );
};
export default Orders;
