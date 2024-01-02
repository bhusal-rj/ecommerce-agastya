import axios from "axios";

const requester = axios.create({
  baseURL: "http://localhost:3002/api/v1/"
})

export const getRequest = async (url, token) => {
  const res = await requester.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const postRequest = async (url, post) => {
  const res = await requester.post(url, post);
  return res;
};

export const putRequest = async (url, post, token) => {
  const res = await requester.put(url, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const deleteRequest = async (url, token) => {
  const res = await requester.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};