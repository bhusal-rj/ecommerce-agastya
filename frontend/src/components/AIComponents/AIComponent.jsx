import React, { useEffect } from "react";
import { useState } from "react";
import { getMessage } from "../../apiservices";

export function AiComponent() {
    const [msg,setMsg]=useState("");
    const [chat,setChat]=useState([]);
    const [ask,setAsk]=useState({message:""});
  useEffect(()=>{
   
  },[]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAsk({ ...ask, [name]: value});
  };
  const handleKeyPress = (e) => {
  
    if (e.key === "Enter") {
      let asked=ask.message;
      setAsk({message:""});
     getMessage(ask).then((r)=>{
      setMsg(r.data.text);
      console.log(r.data.text)
      console.log(ask.message);
      // setChat((prevChat) => [
      //   ...prevChat,
      //   { que:ask,ans:r.data.text},
      // ]);
      setChat((prevChat) => [
        ...prevChat,
        { que: asked, ans: r.data.text },
      ]);
      

     });
    }
  };
  return (
    <div className="ml-16 overflow-hidden w-full h-[600px]  overflow-scroll ">
      {chat.length>0? chat.map((c)=>{
          return(
      <div className="mt-10 overflow-x-hidden">
        
        
        <div className="w-full p-4">
          <div className="w-[35%] bg-blue-200  rounded-lg p-3 ml-auto">
          
            <p className="text-lg font-semibold pl-2">You</p>
            <p className="text-md font-normal pl-2">
              {c.que}
            </p>
         
          </div>
        </div>
        <div className="w-[65%] p-4">
          <div className="w-[60%] bg-gray-100 rounded-lg p-3">
       
            <p className="text-lg font-semibold pl-3">AI</p>
            <p className="text-md font-sans pl-3">
             {c.ans}
             </p>
          </div>
        </div>
          
      </div>
       )
     }
     )
   :""}

      <div className="w-[100%]">
        <div className="w-[98%] py-2">
          <input
            className="w-full py-4 px-3 rounded-md text-md outline-none shadow-sm border border-spacing-8 border-black hover:bg-gray-200"
            type="text"
            name="message"
            placeholder="Ask anything about your inventory"
            id="101"
            autoComplete="off" onChange={handleChangeInput} value={ask.message}  onKeyDown={handleKeyPress} 
          />
        </div>
      </div>
    </div>
  );
}
