import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
const AddProductSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [zIndex, setZIndex] = useState(1);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(100);
  const [sku, setsku] = useState(0);
  const [stock, setStock] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [description, setdescription] = useState("");
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
    setZIndex(isDropdownOpen ? 1 : 2);
  };

  const captureData = async (e) => {
    e.preventDefault();
    try {
      console.log(price);
      console.log(productName);
      console.log(stock);
      console.log(costPrice);
      const response = await fetch("http://localhost:3000/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          description,
          price,
          stock,
          sku,
          costPrice,
          shopA: checkbox1,
          shopB: checkbox2,
        }),
      });

      if (response.ok) {
        toast.success("Product Added Successfully!! !", {
          position: toast.POSITION.TOP_LEFT
        });
        setIsDropdownOpen((prevState) => !prevState);
        setZIndex(isDropdownOpen ? 1 : 2);
        console.log("Data submitted successfully");
        setProductName("");
        setPrice(100);
        setStock("");
        setCostPrice("");
        setCheckbox1(false);
        setCheckbox2(false);
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div
      className={`${
        isDropdownOpen ? "fixed" : ""
      } inset-0 flex items-center justify-center z-${zIndex}`}
    >
      {isDropdownOpen && (
        <div
          className={`bg-gray-950 bg-opacity-30 absolute inset-0 z-${zIndex}`}
        ></div>
      )}

      <div
        className={`mt-8 ml-20 mx-auto rounded-md absolute top-0 w-[500px] z-${zIndex}`}
      >
        <button
          onClick={toggleDropdown}
          className="border ml-4 mt-2 px-2 py-2 rounded-full hover:bg-gray-100 hover:shadow-md"
        >
          Add Product
        </button>

        {isDropdownOpen && (
          <div
            className={`mt-18 p-4 mr-4 rounded-md shadow-md border bg-gray-50 z-${zIndex}`}
          >
            <form onSubmit={captureData}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  className="mt-1 p-2 w-full outline-none rounded-md border"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                 Description
                </label>
                <input
                  type="text"
                  name="description"
                  className="mt-1 p-2 w-full outline-none rounded-md border"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  className="mt-1 p-2 w-full outline-none rounded-md border"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                 SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  className="mt-1 p-2 w-full outline-none rounded-md border"
                  value={sku}
                  onChange={(e) => setsku(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Stock
                </label>
                <input
                  type="text"
                  name="stock"
                  className="mt-1 p-2 w-full outline-none rounded-md border"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">
                  Cost Price
                </label>
                <input
                  type="text"
                  name="costPrice"
                  className="mt-1 p-2 w-full outline-none rounded-md border"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="101">Shop A</label>
                <input
                  type="checkbox"
                  name="box1"
                  id="101"
                  checked={checkbox1}
                  onChange={() => setCheckbox1(!checkbox1)}
                />
                <label htmlFor="102">Shop B</label>
                <input
                  type="checkbox"
                  name="box2"
                  id="102"
                  checked={checkbox2}
                  onChange={() => setCheckbox2(!checkbox2)}
                />
              </div>
              <button
                type="submit"
                className="px-2 py-2 rounded-full border shadow-sm hover:bg-gray-100"
              >
                Submit
              </button>
            </form>
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductSection;
