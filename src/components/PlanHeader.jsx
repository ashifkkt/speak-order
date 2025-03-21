import React from "react";

const PlanHeader = () => {
  return (
    <div
      className="w-full bg-white rounded-md border border-gray-200 mx-auto mt-8 sm:mt-12 lg:mt-16"
      style={{
        maxWidth: "1280px",
        border: "0.8px solid #D6D6D6",
        borderRadius: "7px",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 py-6">
        <div className="flex flex-col justify-center items-center text-center p-4">
          <h3 className="text-[16.1px] leading-[18.4px] font-medium text-black font-inter">
            Business Name
          </h3>
          <p className="text-gray-500 text-[16.1px] leading-[23px] font-medium font-inter">
            Jhon Doe
          </p>
        </div>

        <div className="flex flex-col justify-center items-center text-center p-4">
          <h3 className="text-[16.1px] leading-[18.4px] font-medium text-black font-inter">
            Email
          </h3>
          <p className="text-gray-500 text-[16.1px] leading-[23px] font-medium font-inter">
            jhondoe99@gmail.com
          </p>
        </div>

        <div className="flex flex-col justify-center items-center text-center p-4">
          <h3 className="text-[16.1px] leading-[18.4px] font-medium text-black font-inter">
            Address
          </h3>
          <p className="text-gray-500 text-[16.1px] leading-[23px] font-medium font-inter">
            RJ Street, Washington, <br /> New York 654785
          </p>
        </div>

        <div className="flex flex-col justify-center items-center text-center p-4">
          <h3 className="text-[16.1px] leading-[18.4px] font-medium text-black font-inter">
            Contact Number
          </h3>
          <p className="text-gray-500 text-[16.1px] leading-[23px] font-medium font-inter">
            +91 7347 838 749
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanHeader;
