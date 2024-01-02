import React from "react";

export function AiComponent() {
  return (
    <div className="ml-16 overflow-hidden">
      <div className="mt-10 w-full h-[600px] overflow-scroll overflow-x-hidden border border-[#e5e7eb] rounded-md">
        <div className="w-full p-4">
          <div className="w-[35%] bg-blue-200  rounded-lg p-3 ml-auto">
            <p className="text-lg font-semibold pl-2">You</p>
            <p className="text-md font-normal pl-2">
              What was the product that sold out in large numbers?
            </p>
          </div>
        </div>

        <div className="w-[65%] p-4">
          <div className="w-[60%] bg-gray-100 rounded-lg p-3">
            <p className="text-lg font-semibold pl-3">AI</p>
            <p className="text-md font-sans pl-3">
              Smartwatch of Apple was the product that sold out in large numbers
              within the Electronics category. I suggest you consider restocking
              smartwatches and other electronic products.
            </p>
          </div>
        </div>
        <div className="w-full p-4">
          <div className="w-[35%] bg-blue-200  rounded-lg p-3 ml-auto">
            <p className="text-lg font-semibold pl-2">You</p>
            <p className="text-md font-normal pl-2">
              What was the product that sold out in large numbers?
            </p>
          </div>
        </div>

        <div className="w-[65%] p-4">
          <div className="w-[60%] bg-gray-100 rounded-lg p-3">
            <p className="text-lg font-semibold pl-3">AI</p>
            <p className="text-md font-sans pl-3">
              Smartwatch of Apple was the product that sold out in large numbers
              within the Electronics category. I suggest you consider restocking
              smartwatches and other electronic products.
            </p>
          </div>
        </div>
        <div className="w-full p-4">
          <div className="w-[35%] bg-blue-200  rounded-lg p-3 ml-auto">
            <p className="text-lg font-semibold pl-2">You</p>
            <p className="text-md font-normal pl-2">
              What was the product that sold out in large numbers?
            </p>
          </div>
        </div>

        <div className="w-[65%] p-4">
          <div className="w-[60%] bg-gray-100 rounded-lg p-3">
            <p className="text-lg font-semibold pl-3">AI</p>
            <p className="text-md font-sans pl-3">
              Smartwatch of Apple was the product that sold out in large numbers
              within the Electronics category. I suggest you consider restocking
              smartwatches and other electronic products.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[100%]">
        <div className="w-[98%] py-2">
          <input
            className="w-full py-4 px-3 rounded-md text-md outline-none shadow-sm border border-spacing-8 border-black hover:bg-gray-200"
            type="text"
            name="text"
            placeholder="Ask anything about your inventory"
            id="101"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
