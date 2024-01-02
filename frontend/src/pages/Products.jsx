import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { IoMdArrowDropright } from "react-icons/io";
import Product from "../components/productComponents/Product";
import {Link} from "react-router-dom"
const Orders = () => {
  const Stock_Quantity = [
    {
      product: "Iphone",
      Quantity: 20,
    },
    {
      product: "Smart Watch",
      Quantity: 45,
    },
    {
      product: "Television",
      Quantity: 67,
    },
    {
      product: "EarPhone",
      Quantity: 84,
    },
  ];

  const DataList = [
    {
      label: "S.N",
    },
    {
      label: "Product Name",
    },
    {
      label: "SKU",
    },
    {
      label: "Stock Quantity",
    },
    {
      label: "Category",
    },
    {
      label: "Actions",
    },
  ];
  const prods = [{
    id:1,
    price:200,
    title:"Iphone",
    quantity:10
  }]
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-3/4">
      <div className="mt-10 mr-20">
        <p className="text-2xl">Welcome Back, Deepak</p>
      </div>



      <div className="flex  mt-20 rounded-md w-[80%] shadow-sm border border-spacing-3 border-black hover:bg-gray-50">

        <CiSearch className="text-5xl py-3 text-gray-500 rounded-md" />
        <p className="text-slate-500 mt-[10px] mr-2 text-md">|</p>
        <input
          className=" w-[100%] outline-none text-gray-500 rounded-md"
          type="text"
          value={inputValue}
          onChange={handleChange}
          name="search"
          id="100"
          autoComplete="off"
          placeholder="Search Product"
        />
      </div>

      <div>
        <div className="mt-5 flex ">
          <div>
            <div className="flex text-gray-500 mr-8">
              <IoFilterOutline className="text-2xl mr-2" />
              <p className="text-md">Filter By</p>
            </div>
          </div>

          <div onClick={toggleDropdown} className="cursor-pointer relative">
            <div className="flex border border-black rounded-xl shadow-2xl hover:shadow-md text-gray-500 mr-2">
              <button className="pl-1 text-md">
                <option value="option">Stock Quality</option>
              </button>
              {isDropdownOpen ? (
                <IoMdArrowDropright className="mt-1 mr-1 text-center" />
              ) : (
                <IoMdArrowDropright className="mt-1 mr-1 text-center" />
              )}
            </div>
          </div>
          <Link to="/addproduct" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded ml-4">Add Product</Link>
          <div>
            {isDropdownOpen && (
              <div className="bg-gray-50 absolute rounded-md cursor-pointer  pl-6 py-1 border border-spacing-1 text-black w-[150px]">
                <div className="py-1 text-lg ">Iphone:30</div>
                <div className="py-1 text-lg ">Iphone:30</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Product products={prods}/>
    </div>
  );
};

export default Orders;
