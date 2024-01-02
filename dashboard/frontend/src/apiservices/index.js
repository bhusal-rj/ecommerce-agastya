import { deleteRequest, getRequest, postRequest, putRequest } from "./fetch";

export const getOrders = async () => {
    const res = await getRequest("/orders/all");
    return res.data;
  };