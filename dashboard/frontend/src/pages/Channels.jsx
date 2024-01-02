import React from "react";
import { Link } from "react-router-dom";

const ChannelPage = () => {
  const availableChannels = [
    { id: 1, name: "Daraz" },
    { id: 2, name: "Sasto Deal" },
  ];

  const handleAddChannel = (channelId) => {};

  return (
    <div className="container flex-col mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 mt-12 ml-8">
        Available Channels
      </h1>

      <div className="flex flex-wrap mx-4">
        {availableChannels.map((channel) => (
          <div
            key={channel.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4"
          >
            <div className="p-5 border border-black rounded-sm border-spacing-0 h-full flex flex-col">
              <h2 className="text-2xl font-semibold text-blue-900  mb-8">
                {channel.name}
              </h2>
              <div className="flex-grow"></div>
              <Link to={`/confirmation/${channel.id}`}>
                <button
                  className="bg-gray-100  px-4 py-2  rounded-md border border-spacing-0 text-orange-700 hover:bg-gray-200 hover:border-orange-400"
                  onClick={() => handleAddChannel(channel.id)}
                >
                  Add Channel
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
