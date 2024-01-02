import React from "react";
import Items from "../charts/Items";
import Numbers from "../charts/Numbers";
import ColorBox from "../charts/ColorBox";
import Piechart from "../charts/Pie_Chart";

const Card = () => {

  const Products=[
    {
      products:"Iphone",
     
    },
    {
      products:"Smartwatch",
     
    },
    {
      products:"Acer Nitro 5",
     
    },
    {
      products:"Headphone",
     
    },
    {
      products:"Gaming mouse",
     
    },
    {
      products:"Keyboard",
   
    },
    {
      products:"Ipad",
     
    },
  ]

  const Demands=[
    {
      label:0
    },
    {
      label:100
    },
    {
      label:200
    },
    {
      label:300
    },
    {
      label:400
    },
    {
      label:500
    },
    {
      label:600
    },
    {
      label:700
    },
    {
      label:800
    },
    {
      label:900
    },
    {
      label:1000
    },
  ]


  
  return (
    <>
      <div className="flex-col mt-6 mb-6">
        <div className="mb-4">
            <p className="text-2xl font-md py-2">Products</p>
          </div>
        <div className="flex">
        <div className="flex w-[60%] mr-6 rounded-lg shadow-md bg-white">
          <div className=" w-[190px] mt-1 pl-4">
          <p className="text-lg font-semibold ">Products</p>
          <div className="mt-2 bg-white">
            {
              Products.map((currentData,index)=>{
                return (<Items key={index} Data={currentData}/>)
              })
            }
          </div>
          
          </div>
           <div className=" flex-col w-[550px] ml-4 mt-1">
              <div className="inline-flex">
                {
                  Demands.map((currentData,index)=>{
                    return(<Numbers key={index} Data={currentData}/>)
                  })

                }
              </div>
              <ColorBox/>
          </div>
        </div>

        <div className=" w-[380px] rounded-md shadow-md">
          <Piechart/>
        </div>
      </div>
      </div>
    </>
  );
};

export default Card;
