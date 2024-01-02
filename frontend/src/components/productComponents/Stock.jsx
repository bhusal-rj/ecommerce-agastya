import React from 'react'
import { MdModeEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
const Stock = ({orders}) => {
    const SN=[1,2,3,]
    const Product_Name=["Iphone","Ipad","Smart watch"]
    const SKU=["Iphone-12-pro","xyz232","2xdyzemon"]
    const Quantity=[20,45,66]
    const Category=["Electronics","Electronics","Electronics"]
    return(
        <div className=' flex mt-6 justify-between w-[80%] shadow-inherit'>
            <div>
               <p className='text-lg font-semibold'>SN</p>
               <div>
                {
                    orders.map((order)=>{
                        return( <p className='text-gray-500 text-sm py-1'>{order.id}</p> )
                    })
                }
            </div>
            </div>

            <div>
               <p className='text-lg font-semibold'>Product Name</p>
               <div>
                {
                    orders.map((order)=>{
                        return( <p className='text-gray-500 text-sm py-1'>{order.title}</p> )
                    })
                }
            </div>
            </div>

            <div>
               <p className='text-lg font-semibold'>Price</p>
               <div>
                {
                   orders.map((order)=>{
                        return( <p className='text-gray-500 text-sm py-1'>{order.price}</p> )
                    })
                }
            </div>
            </div>

            <div>
               <p className='text-lg font-semibold'>Stock Quantity</p>
               <div>
                {
                    orders.map((order)=>{
                        return( <p className='text-gray-500 text-sm py-1'>{order.quantity}</p> )
                    })
                }
            </div>
            </div>

            {/* <div>
               <p className='text-lg font-semibold'>Category</p>
               <div>
                {
                    Category.map((CurrEle)=>{
                        return( <p className='text-gray-500 text-sm py-1'>{CurrEle}</p> )
                    })
                }
            </div>
            </div> */}

            <div>
               <p className='text-lg font-semibold'>Actions</p>
               <div>
                <div className='flex text-2xl'>
                    <MdModeEdit className='mr-4 border border-black cursor-pointer hover:bg-red-100 rounded-xl'/>
                    <IoEyeSharp className='mr-4 border border-black cursor-pointer hover:bg-red-100 rounded-xl'/>
                    <MdDelete className='border border-red-500 cursor-pointer rounded-xl text-red-500 hover:bg-red-100'/>
                </div>
                
            </div>
            </div>

            
            
   
           
    </div>
    )
}
export default Stock
