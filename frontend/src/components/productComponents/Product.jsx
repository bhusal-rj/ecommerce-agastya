import React from 'react'
import {Link} from 'react-router-dom'
import { MdModeEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
const Product = ({products}) => {
    const SN=[1,2,3,]
    const Product_Name=["Iphone","Ipad","Smart watch"]
    const SKU=["Iphone-12-pro","xyz232","2xdyzemon"]
    const Quantity=[20,45,66]
    const Category=["Electronics","Electronics","Electronics"]
    return(
        <div className='mt-6 flex flex-col'>
        <div className='flex flex-row'>
            <h3 className='basis-1/6 font-bold'>SN</h3>
            <h3 className='basis-1/6 font-bold'>Product Name</h3>
            <h3 className='basis-1/6 font-bold'>Price</h3>
            <h3 className='basis-1/6 font-bold'>Stock Quantity</h3>
            <h3 className='basis-2/6 font-bold'>Actions</h3>
        </div>
        {products.map(product => { return(
        <div className='flex flex-row mt-6'>
            <h3 className='basis-1/6'>{product.id}</h3>
            <h3 className='basis-1/6'>{product.title}</h3>
            <h3 className='basis-1/6'>{product.price}</h3>
            <h3 className='basis-1/6'>{product.stock}</h3>
            <h3 className='basis-2/6'>
            <div className='flex text-2xl'>
                <MdModeEdit className='mr-4 border border-black cursor-pointer hover:bg-red-100 rounded-xl'/>
                <Link to={`/product/${product.id}`}>
                <IoEyeSharp className='mr-4 border border-black cursor-pointer hover:bg-red-100 rounded-xl'/>
                </Link>
                <MdDelete className='border border-red-500 cursor-pointer rounded-xl text-red-500 hover:bg-red-100'/>
            </div>
            </h3>
        </div>
        )})}
        </div>
    )
}
export default Product;
