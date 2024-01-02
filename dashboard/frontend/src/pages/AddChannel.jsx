import React from 'react';

const AddChannel = () => {
  return (
    <div className="flex items-center justify-center h-screen" >
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg" style={{marginLeft:'250px'}}>
        
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
          Add channel
        </h1>
        <form>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="url"
              className="block mb-2 text-sm text-gray-600"
            >
              URL
            </label>
            <input
              type="text"
             
              name="url"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            
          </div>
          <button
            type="submit"
            className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
          >
            Submit
          </button>
        </form>
      
   
      </div>
    </div>
  );
};

export default AddChannel;
