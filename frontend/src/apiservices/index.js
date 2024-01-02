import { deleteRequest, getRequest, postRequest, putRequest } from "./fetch";

export const getProducts = async() =>{
  const res = await getRequest("/products");
  return res.data;
}

export const getOrders = async () => {
    const res = await getRequest("/orders/");
    return res.data;
  };
  export const getChannels = async () => {
    const res = await getRequest(`/channels/`);
    return res.data;
  };

  export const getChannel = async (id) => {
    const res = await getRequest(`/channel/${id}`);
    return res.data;
  };

  export const AddProduct=async()=>{
    console.log("added product");
  }