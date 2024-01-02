import React from "react";
import { useParams } from "react-router-dom";

const ConfirmationPage = () => {
  const { channelId } = useParams();

  return (
    <div className="container bg-slate-50 h-[170px] mx-4 w-[500px] mt-8">
      <div className="text-gray-700 p-8 rounded-md">
        <h1 className="text-4xl font-bold mb-4">Channel Added Successfully!</h1>
        <p className="text-lg">
          You've successfully added Channel with ID {channelId}.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
