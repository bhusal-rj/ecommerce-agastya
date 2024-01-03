import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrders } from "../apiservices/index";

export default function ProductView() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrders()
      .then((data) => {
        data.orders.forEach((order) => {
          let total = 0;
          order.products.forEach((prod) => {
            total += prod.price * prod.qty;
          });
          order.totalPrice = total;
        });
        console.log(data.orders);
        const prd = data.orders.filter((p) => p.orderId == orderId)[0];
        setOrder(prd);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div class='2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-20'>
      <div class='flex flex-col'>
        <div class='flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full'>
          <h3 class='text-3xl xl:text-4xl dark:text-white font-semibold leading-7 xl:leading-9 w-full md:text-left text-gray-800'>
            Order Summary
          </h3>
          <h3 class='text-lg dark:text-white w-full font-semibold leading-6 text-gray-500 mt-4'>
            OrderId : {orderId}
          </h3>
          <div class='flex justify-center items-center w-full mt-8 flex-col space-y-4'>
            {order
              ? order.products.map((product) => {
                  return (
                    <div class='flex md:flex-row justify-start items-start md:items-center border border-gray-200 w-full'>
                      <div class='-m-px w-40 md:w-32'>
                        <img
                          class='hidden md:block'
                          src='https://random.imagecdn.app/500/150'
                          alt='girl-in-red-dress'
                        />
                      </div>
                      <div class='flex justify-start md:justify-between items-start md:items-center flex-col md:flex-row w-full p-4 md:px-8'>
                        <div class='flex flex-col md:flex-shrink-0 justify-start items-start'>
                          <h3 class='text-lg md:text-xl dark:text-white w-full font-semibold leading-6 md:leading-5 text-gray-800'>
                            {product.title}
                          </h3>
                          <div class='flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-4'>
                            <p class='text-sm leading-none dark:text-gray-300 text-gray-600'>
                              Price:{" "}
                              <span class='text-gray-800 dark:text-white'>
                                {" "}
                                {product.price}
                              </span>
                            </p>
                            <p class='text-sm leading-none dark:text-gray-300 text-gray-600'>
                              Quantity:{" "}
                              <span class='text-gray-800 dark:text-white'>
                                {product.qty}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div class='flex mt-4 md:mt-0 md:justify-end items-center w-full'>
                          <p class='text-xl dark:text-white lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800'>
                            ${product.price * product.qty}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          <div class='flex flex-col flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full'>
            <div class='flex justify-start items-start flex-col md:flex-row w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8 lg:w-full'>
              <div class='flex jusitfy-start items-start flex-col space-y-2'>
                <p class='text-base dark:text-white font-semibold leading-4 text-gray-800'>
                  Billing Address
                </p>
                <p class='text-sm leading-5 dark:text-gray-300 text-gray-600'>
                  180 North King Street, Northhampton MA 1060
                </p>
              </div>
              <div class='flex jusitfy-start items-start flex-col space-y-2'>
                <p class='text-base dark:text-white font-semibold leading-4 text-gray-800'>
                  Shipping Address
                </p>
                <p class='text-sm leading-5 dark:text-gray-300 text-gray-600'>
                  180 North King Street, Northhampton MA 1060
                </p>
              </div>
              <div class='flex jusitfy-start items-start flex-col space-y-2'>
                <p class='text-base dark:text-white font-semibold leading-4 text-gray-800'>
                  Shipping Method
                </p>
                <p class='text-sm leading-5 dark:text-gray-300 text-gray-600'>
                  DHL - Takes up to 3 working days
                </p>
              </div>
            </div>
            <div class='flex flex-col w-full space-y-4 w-full'>
              <div class='flex justify-between items-center w-full'>
                <p class='text-base dark:text-white font-semibold leading-4 text-gray-800'>
                  Total
                </p>
                <p class='text-base dark:text-gray-300 font-semibold leading-4 text-gray-600'>
                  ${order ? order.totalPrice : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
