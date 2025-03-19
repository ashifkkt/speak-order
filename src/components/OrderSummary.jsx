import React from "react";

const OrderSummary = () => {
  return (
    <div className="w-full md:w-[320px] h-full flex flex-col">
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-lg flex flex-col h-full">
        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h3>

        {/* Selected Plan */}
        <div className="mb-4 flex justify-between items-center">
          <span className="text-gray-700 text-sm">Selected Plan:</span>
          <span className="bg-[#B2C2FF] text-[#000] px-3 py-1 rounded-lg text-sm font-medium">
            Prepaid Bundle
          </span>
        </div>

        {/* Pricing Details */}
        <div className="border-t pt-4 mt-4 space-y-3 text-gray-700 text-sm">
          <div className="flex justify-between">
            <span>Price per minute:</span>
            <span className="font-medium">$0.12</span>
          </div>
          <div className="flex justify-between">
            <span>Total minutes:</span>
            <span className="font-medium">2500</span>
          </div>
          <div className="flex justify-between">
            <span>Overage charges:</span>
            <span className="font-medium">$0</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly price:</span>
            <span className="font-medium">$63</span>
          </div>
          <div className="flex justify-between">
            <span>Card details saving charge:</span>
            <span className="font-medium">$1 (Refundable)</span>
          </div>
        </div>

        {/* Subtotal & Discount */}
        <div className="border-t pt-4 mt-4 space-y-3 text-gray-700 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-medium">$300</span>
          </div>
          <div className="flex justify-between text-green-600 font-medium">
            <span>Promo discount:</span>
            <span>-10%</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 text-gray-900">
            <span>Total price:</span>
            <span className="text-xl">$271</span>
          </div>
        </div>

        {/* Proceed Button */}
        <button className="mt-auto w-full bg-[#1B223C] text-white py-3 rounded-lg font-semibold text-center transition hover:bg-[#131A2E]">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
