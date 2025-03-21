import React from "react";

const PayAsYouGoCard = ({ isSelected }) => {
  return (
    <div className={`w-full min-h-[423.35px] rounded-[14.33px] border-[0.55px] shadow-custom p-6 mx-auto
      ${isSelected 
        ? "bg-[#3C3C3C] border-gray-600 text-white" 
        : "bg-white border-[#E7EBFF] text-gray-900"}`}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Icon */}
          <div className="mb-6">
            <div className="bg-black w-[44px] h-[44px] rounded-[14.33px] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8V12L15 15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className={`text-[24.24px] leading-[100%] tracking-[-0.55px] font-medium font-outfit mb-2 
            ${isSelected ? "text-white" : "text-gray-900"}`}>
            Pay as You Go
          </h2>

          {/* Subtitle */}
          <p className={`text-sm font-light leading-tight tracking-normal mb-6
            ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
            Perfect for occasional users
          </p>

          {/* Price */}
          <div className={`mb-8 mt-2 pb-8 border-b ${isSelected ? "border-gray-600" : "border-[#E5E5E5]"}`}>
            <span className={`text-[33.06px] leading-[100%] tracking-[-0.55px] font-medium font-outfit
              ${isSelected ? "text-white" : "text-gray-900"}`}>
              $0.126
            </span>

            <span className={`font-light ml-1 ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
              per Minute
            </span>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <div className="mt-1 mr-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="10" r="9" stroke={isSelected ? "white" : "#333"} strokeWidth="2" />
                  <circle cx="10" cy="10" r="3" fill={isSelected ? "white" : "#333"} />
                </svg>
              </div>
              <span className={`text-[13.22px] leading-[22.04px] tracking-[0%] font-normal font-outfit
                ${isSelected ? "text-white" : "text-[#1B223C]"}`}>
                Pay only for what you use
              </span>
            </li>

            <li className="flex items-start">
              <div className="mt-1 mr-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="10" r="9" stroke={isSelected ? "white" : "#333"} strokeWidth="2" />
                  <circle cx="10" cy="10" r="3" fill={isSelected ? "white" : "#333"} />
                </svg>
              </div>
              <span className={`text-[13.22px] leading-[22.04px] tracking-[0%] font-normal font-outfit
                ${isSelected ? "text-white" : "text-[#1B223C]"}`}>
                Free Starter Minutes (10 min)
              </span>
            </li>

            <li className="flex items-start">
              <div className="mt-1 mr-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="10" r="9" stroke={isSelected ? "white" : "#333"} strokeWidth="2" />
                  <circle cx="10" cy="10" r="3" fill={isSelected ? "white" : "#333"} />
                </svg>
              </div>
              <span className={`text-[13.22px] leading-[22.04px] tracking-[0%] font-normal font-outfit
                ${isSelected ? "text-white" : "text-gray-900"}`}>
                Simple Pricing
              </span>
            </li>

            <li className="flex items-start gap-2">
              <div className="mt-1 mr-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="10" r="9" stroke={isSelected ? "white" : "#333"} strokeWidth="2" />
                  <circle cx="10" cy="10" r="3" fill={isSelected ? "white" : "#333"} />
                </svg>
              </div>
              <div className={`text-[13.22px] leading-[22.04px] tracking-[0%] font-normal font-outfit 
                ${isSelected ? "text-white" : "text-gray-900"}`}>
                <span>Invoice generated in every</span>
                <div>90 min ($11.34 for 90 min)</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Button */}
        <button className={`w-full py-2.5 px-6 rounded-[8px] font-medium transition-colors
          ${isSelected 
            ? "bg-white text-[#3C3C3C] hover:bg-gray-100" 
            : "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-gray-50"}`}>
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default PayAsYouGoCard;
