import { deleteRequest, getRequest, postRequest, putRequest } from "./fetch";

export const getOrders = async () => {
    const res = await getRequest("/orders/all");
    return res.data;
  };
  export const getChannels = async () => {
    const res = await getRequest("/channels");
    return res.data;
  };
  export const AddProduct=async(payload)=>{
    const res= await postRequest("/products",payload);
    return res;
  }