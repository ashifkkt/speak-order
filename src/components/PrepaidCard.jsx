import React from "react";

const PrepaidCard = ({ isSelected }) => {
  return (
    <div className={`w-full min-h-[423.35px] rounded-[14.33px] border-[0.55px] shadow-custom p-5 mx-auto
      ${isSelected 
        ? "bg-[#3C3C3C] border-gray-600 text-white" 
        : "bg-white border-[#E7EBFF] text-gray-900"}`}>
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="mb-4">
          <div className={`w-[44px] h-[44px] rounded-[14.33px] flex items-center justify-center
            ${isSelected ? "bg-white" : "bg-black"}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path 
                d="M12 2L2 7L12 12L22 7L12 2Z" 
                stroke={isSelected ? "#3C3C3C" : "white"} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
              <path 
                d="M2 17L12 22L22 17" 
                stroke={isSelected ? "#3C3C3C" : "white"} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
              <path 
                d="M2 12L12 17L22 12" 
                stroke={isSelected ? "#3C3C3C" : "white"} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Title and badge */}
        <div className="flex items-start flex-col gap-2 mb-2">
          <h2 className={`text-[24.24px] leading-[100%] tracking-[-0.55px] font-medium font-outfit
            ${isSelected ? "text-white" : "text-gray-900"}`}>
            Prepaid Bundle
          </h2>
          <span className={`px-3 py-1 rounded-full text-xs font-medium
            ${isSelected ? "bg-[#4A4A4A] text-white" : "bg-[#F1F2F6] text-gray-700"}`}>
            Most Popular
          </span>
        </div>

        {/* Subtitle */}
        <p className={`text-sm font-light mb-4
          ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
          Best value for regular users
        </p>

        {/* Price */}
        <div className={`mb-6 pb-6 border-b
          ${isSelected ? "border-gray-600" : "border-[#E5E5E5]"}`}>
          <div className={`text-[33.06px] leading-[100%] tracking-[-0.55px] font-medium font-outfit
            ${isSelected ? "text-white" : "text-gray-900"}`}>
            From $63
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-3 mb-6 flex-grow">
          <li className="flex items-start gap-2">
            <div className="min-w-[18px] mt-1">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle 
                  cx="10" cy="10" r="9" 
                  stroke={isSelected ? "white" : "#1A1A1A"} 
                  strokeWidth="2"/>
                <circle 
                  cx="10" cy="10" r="3" 
                  fill={isSelected ? "white" : "#1A1A1A"}/>
              </svg>
            </div>
            <div>
              <div className={`text-[13.22px] leading-[20px] tracking-[0%] font-normal font-outfit
                ${isSelected ? "text-white" : "text-gray-900"}`}>
                500-Minute bundle : $63.00
              </div>
              <div className={`text-[11px]
                ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                ($0.126 per minute)
              </div>
            </div>
          </li>

          <li className="flex items-start gap-2">
            <div className="min-w-[18px] mt-1">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle 
                  cx="10" cy="10" r="9" 
                  stroke={isSelected ? "white" : "#1A1A1A"} 
                  strokeWidth="2"/>
                <circle 
                  cx="10" cy="10" r="3" 
                  fill={isSelected ? "white" : "#1A1A1A"}/>
              </svg>
            </div>
            <div>
              <div className={`text-[13.22px] leading-[20px] tracking-[0%] font-normal font-outfit
                ${isSelected ? "text-white" : "text-gray-900"}`}>
                1,000-minute bundle : $126.00
              </div>
              <div className={`text-[11px]
                ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                ($0.126 per minute)
              </div>
            </div>
          </li>

          <li className="flex items-start gap-2">
            <div className="min-w-[18px] mt-1">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle 
                  cx="10" cy="10" r="9" 
                  stroke={isSelected ? "white" : "#1A1A1A"} 
                  strokeWidth="2"/>
                <circle 
                  cx="10" cy="10" r="3" 
                  fill={isSelected ? "white" : "#1A1A1A"}/>
              </svg>
            </div>
            <div>
              <div className={`text-[13.22px] leading-[20px] tracking-[0%] font-normal font-outfit
                ${isSelected ? "text-white" : "text-gray-900"}`}>
                2,500-minute bundle : $300.00
              </div>
              <div className={`text-[11px]
                ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                ($0.12 per minute, 10% discount)
              </div>
            </div>
          </li>

          <li className="flex items-start gap-2">
            <div className="min-w-[18px] mt-1">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle 
                  cx="10" cy="10" r="9" 
                  stroke={isSelected ? "white" : "#1A1A1A"} 
                  strokeWidth="2"/>
                <circle 
                  cx="10" cy="10" r="3" 
                  fill={isSelected ? "white" : "#1A1A1A"}/>
              </svg>
            </div>
            <div>
              <div className={`text-[13.22px] leading-[20px] tracking-[0%] font-normal font-outfit
                ${isSelected ? "text-white" : "text-gray-900"}`}>
                5,000-minute bundle : $550.00
              </div>
              <div className={`text-[11px]
                ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                ($0.11 per minute, best value)
              </div>
            </div>
          </li>
        </ul>

        {/* Button */}
        <button className={`w-full py-2.5 px-6 rounded-lg font-medium transition-colors
          ${isSelected 
            ? "bg-white text-[#3C3C3C] hover:bg-gray-100" 
            : "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-gray-50"}`}>
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default PrepaidCard;
