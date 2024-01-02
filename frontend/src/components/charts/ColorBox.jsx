// import React, { useState } from 'react'

const ColorBox = () => {
  const Colors=[
    {
    color:"red",
    width:400
  },
  {
    color:"green",
    width:520
  },
  {
    color:"gray",
    width:200
  },
  {
    color:"brown",
    width:275
  },
  {
    color:"blue",
    width:320
  },
  {
    color:"yellow",
    width:100
  },
  {
    color:"orange",
    width:470
  },
]

// const [Data,setData]=useState(Colors)
   
 return (
  <div className='flex-col ml-1 mr-4 mt-2'>
   {Colors.map((currentData, index) => (
        <div
        className="mt-4 mb-1 pl-4 rounded-r-xl"
          key={index}
          style={{
            width: `${(currentData.width / 520) * 100}%`,
            backgroundColor: currentData.color,
            height: "19px",
          }}
        ></div>
      ))}
  </div>
);
  }
export default ColorBox
