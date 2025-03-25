import React from "react";
import { BadgeCheck, Target } from "lucide-react";

const SubscriptionCard = ({ data, isSelected }) => {
  return (
    <div
      className={`w-full min-h-[423.35px] rounded-[14.33px] border-[0.55px] shadow-custom p-6 mx-auto
      ${
        isSelected
          ? "bg-[#3C3C3C] border-gray-600 text-white"
          : "bg-white border-[#E7EBFF] text-gray-900"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="mb-6">
          <div
            className={`w-[44px] h-[44px] rounded-[14.33px] flex items-center justify-center
            ${isSelected ? "bg-white" : "bg-black"}`}
          >
            <Target
              className={`w-5 h-5 ${isSelected ? "text-black" : "text-white"}`}
            />
          </div>
        </div>

        {/* Title */}
        <h2
          className={`text-[24.24px] leading-[100%] tracking-[-0.55px] font-medium font-outfit mb-2
          ${isSelected ? "text-white" : "text-[#1A1A1A]"}`}
        >
          {data?.display_name}
        </h2>

        {/* Subtitle */}
        <p
          className={`text-[13.22px] leading-[20px] font-light mb-6
          ${isSelected ? "text-gray-300" : "text-[#666666]"}`}
        >
          {data?.sub_title}
        </p>

        {/* Price */}
        <div
          className={`mb-8 mt-2 pb-6 border-b
          ${isSelected ? "border-gray-600" : "border-[#E5E5E5]"}`}
        >
          <div className="flex items-baseline">
            <span
              className={`text-[33.06px] leading-[100%] tracking-[-0.55px] font-medium font-outfit
              ${isSelected ? "text-white" : "text-[#1A1A1A]"}`}
            >
              {data?.price_title}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6 flex-grow">
          {data?.description_points?.map((item, idx) => {
            return (
              <li key={idx} className="flex items-start gap-2">
                <div className="min-w-[18px] mt-1">
                  <BadgeCheck />
                </div>
                <span
                  className={`text-[13.22px] leading-[20px] font-normal
                ${isSelected ? "text-white" : "text-[#1A1A1A]"}`}
                >
                  {item}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Button */}
        <button
          className={`w-full py-2.5 px-6 rounded-[8px] font-medium transition-colors
          ${
            isSelected
              ? "bg-white text-[#3C3C3C] hover:bg-gray-100"
              : "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-gray-50"
          }`}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
