import React from "react";

const SubscriptionCard = ({ isSelected }) => {
  return (
    <div className={`w-full min-h-[423.35px] rounded-[14.33px] border-[0.55px] shadow-custom p-6 mx-auto
      ${isSelected 
        ? "bg-[#3C3C3C] border-gray-600 text-white" 
        : "bg-white border-[#E7EBFF] text-gray-900"}`}>
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="mb-6">
          <div className="bg-black w-[44px] h-[44px] rounded-[14.33px] flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12L12 22M12 22L16 18M12 22L8 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className={`text-[24.24px] leading-[100%] tracking-[-0.55px] font-medium font-outfit mb-2
          ${isSelected ? "text-white" : "text-[#1A1A1A]"}`}>
          Subscription Plans
        </h2>

        {/* Subtitle */}
        <p className={`text-[13.22px] leading-[20px] font-light mb-6
          ${isSelected ? "text-gray-300" : "text-[#666666]"}`}>
          Ideal for heavy users
        </p>

        {/* Price */}
        <div className={`mb-8 mt-2 pb-6 border-b
          ${isSelected ? "border-gray-600" : "border-[#E5E5E5]"}`}>
          <div className="flex items-baseline">
            <span className={`text-[33.06px] leading-[100%] tracking-[-0.55px] font-medium font-outfit
              ${isSelected ? "text-white" : "text-[#1A1A1A]"}`}>
              $30
            </span>
            <span className={`text-[13.22px] leading-[20px] font-light ml-2
              ${isSelected ? "text-gray-300" : "text-[#666666]"}`}>
              per month
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6 flex-grow">
          <li className="flex items-start gap-2">
            <div className="min-w-[18px] mt-1">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke={isSelected ? "white" : "#1A1A1A"} strokeWidth="2"/>
                <circle cx="10" cy="10" r="3" fill={isSelected ? "white" : "#1A1A1A"}/>
              </svg>
            </div>
            <span className={`text-[13.22px] leading-[20px] font-normal
              ${isSelected ? "text-white" : "text-[#1A1A1A]"}`}>
              Monthly Billing
            </span>
          </li>

          <li className="flex items-start gap-2">
            <div className="min-w-[18px] mt-1">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke={isSelected ? "white" : "#1A1A1A"} strokeWidth="2"/>
                <circle cx="10" cy="10" r="3" fill={isSelected ? "white" : "#1A1A1A"}/>
              </svg>
            </div>
            <div>
              <div className={`text-[13.22px] leading-[20px] font-normal
                ${isSelected ? "text-white" : "text-[#1A1A1A]"}`}>
                Included Minutes ( 250 minutes
              </div>
              <div className={`text-[13.22px] leading-[20px] font-normal
                ${isSelected ? "text-white" : "text-[#1A1A1A]"}`}>
                for $30/month).
              </div>
            </div>
          </li>

          <li className="flex items-start gap-2">
            <div className="min-w-[18px] mt-1">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke={isSelected ? "white" : "#1A1A1A"} strokeWidth="2"/>
                <circle cx="10" cy="10" r="3" fill={isSelected ? "white" : "#1A1A1A"}/>
              </svg>
            </div>
            <span className={`text-[13.22px] leading-[20px] font-normal
              ${isSelected ? "text-white" : "text-[#1A1A1A]"}`}>
              Overage Charges ($0.12 per min)
            </span>
          </li>

          <li className="flex items-start gap-2">
            <div className="min-w-[18px] mt-1">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke={isSelected ? "white" : "#1A1A1A"} strokeWidth="2"/>
                <circle cx="10" cy="10" r="3" fill={isSelected ? "white" : "#1A1A1A"}/>
              </svg>
            </div>
            <span className={`text-[13.22px] leading-[20px] font-normal
              ${isSelected ? "text-white" : "text-[#1A1A1A]"}`}>
              Automatic Invoicing
            </span>
          </li>
        </ul>

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

export default SubscriptionCard; 