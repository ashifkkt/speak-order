import React from "react";

const PlanHeader = () => {
  return (
    <div className="bg-gray-50 p-8">
      <div className="max-w-6xl ">
        <h2 className="text-3xl font-bold text-black mb-6">
          Business Plan
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Business Name
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700"
                          defaultValue="Jhon Doe"
                          disabled
            />
          </div>
          
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700"
                          defaultValue="jhondoe99@gmail.com"
                          disabled
            />
          </div>
          
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700"
                          defaultValue="+91 5652 666 994"
                          disabled
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-600 text-sm mb-2">
            Addresss
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700"
                      defaultValue="RJ Street,Washington,Newyork"
                      disabled
          />
        </div>
      </div>
    </div>
  );
};

export default PlanHeader;