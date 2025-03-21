import React from "react";

const OrderSummary = ({ selectedPlan }) => {
  return (
    <div className="w-full min-h-[423.35px] bg-white rounded-[14.33px] border-[0.55px] border-[#E5E5E5] shadow-custom p-6 mx-auto">
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Title */}
          <h2 className="text-[24.24px] leading-[100%] tracking-[-0.55px] font-medium font-outfit text-[#1A1A1A] mb-4">
            Order Summary
          </h2>

          {/* Selected Plan */}
          <div className="mb-4 flex justify-between items-center">
            <span className="text-[14px] leading-[18px] text-[#1B223C]">Selected Plan:</span>
            <span className="bg-[#343434] text-white px-2 py-1 rounded-[8px] text-[14px] leading-[18px] font-medium">
              {selectedPlan}
            </span>
          </div>

          {/* Pricing Details */}
          <div className="border-t border-[#E5E5E5] pt-4 mt-4 space-y-3">
            <div className="flex justify-between text-[14px] leading-[20px]">
              <span className="text-[#666666]">Price per minute:</span>
              <span className="text-[#1A1A1A] font-medium">$0.12</span>
            </div>
            <div className="flex justify-between text-[14px] leading-[20px]">
              <span className="text-[#666666]">Total minutes:</span>
              <span className="text-[#1A1A1A] font-medium">2500</span>
            </div>
            <div className="flex justify-between text-[14px] leading-[20px]">
              <span className="text-[#666666]">Overage charges:</span>
              <span className="text-[#1A1A1A] font-medium">$0</span>
            </div>
            <div className="flex justify-between text-[14px] leading-[20px]">
              <span className="text-[#666666]">Monthly price:</span>
              <span className="text-[#1A1A1A] font-medium">$63</span>
            </div>
            <div className="flex justify-between text-[14px] leading-[20px]">
              <span className="text-[#666666]">Card details saving charge:</span>
              <span className="text-[#1A1A1A] font-medium">$1 (Refundable)</span>
            </div>
          </div>

          {/* Subtotal & Discount */}
          <div className="border-t border-[#E5E5E5] pt-4 mt-4 space-y-3">
            <div className="flex justify-between text-[14px] leading-[20px]">
              <span className="text-[#666666]">Subtotal:</span>
              <span className="text-[#1A1A1A] font-medium">$300</span>
            </div>
            <div className="flex justify-between text-[14px] leading-[20px] text-[#1B223C] font-medium">
              <span>Promo discount:</span>
              <span>-10%</span>
            </div>
            <div className="flex justify-between items-baseline mt-4">
              <span className="text-[14px] leading-[20px] text-[#1A1A1A] font-medium">Total price:</span>
              <span className="text-[33.06px] leading-[100%] tracking-[-0.55px] font-medium font-outfit text-[#1A1A1A]">$271</span>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <button className="w-full py-3 bg-[#1A1A1A] text-white rounded-[8px] font-medium hover:bg-[#333333] transition-colors mt-6">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
