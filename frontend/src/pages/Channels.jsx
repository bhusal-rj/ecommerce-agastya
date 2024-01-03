import React from "react";
import { getChannels } from "../apiservices/index";
import {useState, useEffect} from "react";

const ChannelPage = () => {

  const [channels, setChannels] = useState([]);
  useEffect(() =>{
    getChannels().then(data =>{
      setChannels(data.channels)
    })
  },[])

  return (
    <div className="container mt-11">
     <h3 className="text-xl font-bold">Channels List</h3>
     <div className="flex flex-col mt-4">
      {channels ? channels.map(channel =>{
        return(
        <div className="bg-black p-4 w-1/3 mb-4 rounded-3xl">
        <h3 className="text-lg font-bold text-white">{channel.title}</h3>
      </div>
      )}):""}
     </div>
    </div>
  );
};

export default ChannelPage;
