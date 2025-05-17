import React, { useState } from "react";
import { BadgeCheck, Target } from "lucide-react";
import apiService from "../components/api";

const PayAsYouGoCard = ({ data, isSelected, onPlanSelect }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectPlan = async () => {
    // Check if there's a subscription to select
    if (data?.subscriptions && data.subscriptions.length > 0) {
      try {
        setLoading(true);
        setError(null);

        // Get the subscription ID (there should be only one option for this card)
        const subscriptionId = data.subscriptions[0]?.subscription_id;

        // Make API call to get subscription summary
        const response = await apiService.get(`business/subscription-summary/${subscriptionId}`);

        // Pass the selected plan information to parent component with proper data structure
        if (onPlanSelect) {
          // Use the data directly from the API response
          const planDetails = response?.data || {};

          // Add any additional details from the subscription data
          planDetails.subscription_id = subscriptionId;
          planDetails.selected_plan = "Pay as You Go";

          onPlanSelect({
            type: "Pay as You Go",
            planId: subscriptionId,
            planDetails: planDetails,
            summary: response
          });
        }
      } catch (err) {
        setError("Failed to load plan details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className={`w-full h-[560px] rounded-[14.33px] border-[0.55px] shadow-custom p-6 mx-auto
      ${isSelected
          ? "bg-[#3C3C3C] border-gray-600 text-white"
          : "bg-white border-[#E7EBFF] text-gray-900"
        }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex-grow">
          {/* Icon */}
          <div className="mb-4">
            <div
              className={`w-[44px] h-[44px] rounded-[14.33px] flex items-center justify-center
            ${isSelected ? "bg-white" : "bg-black"}`}
            >
              <Target className={`w-5 h-5 ${isSelected ? "text-black" : "text-white"}`} />
            </div>
          </div>

          {/* Title */}
          <h2
            className={`text-[24.24px] leading-[100%] tracking-[-0.55px] font-medium font-outfit mb-2 
            ${isSelected ? "text-white" : "text-gray-900"}`}
          >
            {data?.display_name}
          </h2>

          {/* Subtitle */}
          <p
            className={`text-sm font-light leading-tight tracking-normal mb-6
            ${isSelected ? "text-gray-300" : "text-gray-500"}`}
          >
            {data?.sub_title}
          </p>

          {/* Price */}
          <div
            className={`mb-8 mt-2 pb-8 border-b ${isSelected ? "border-gray-600" : "border-[#E5E5E5]"
              }`}
          >
            <span
              className={`text-[33.06px] leading-[100%] tracking-[-0.55px] font-medium font-outfit
              ${isSelected ? "text-white" : "text-gray-900"}`}
            >
              {data?.price_title}
            </span>
          </div>

          {/* Features - Reverting to original Badge Check icons */}
          <ul className="space-y-4 mb-8">
            {data?.description_points?.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <div className="mt-1 mr-3">
                  <BadgeCheck className={isSelected ? "text-white" : "text-gray-900"} size={18} />
                </div>
                <span
                  className={`text-[13.22px] leading-[22.04px] tracking-[0%] font-normal font-outfit
                  ${isSelected ? "text-white" : "text-[#1B223C]"}`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Loading and Error States */}
          {loading && (
            <div className={`text-sm mb-2 ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
              Loading plan details...
            </div>
          )}

          {error && (
            <div className="text-sm text-red-500 mb-2">
              {error}
            </div>
          )}
        </div>

        {/* Button */}
        <button
          className={`w-full py-2.5 px-6 rounded-[8px] font-medium transition-colors mt-6
          ${isSelected
              ? "bg-white text-[#3C3C3C] hover:bg-gray-100"
              : "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-gray-50"
            }`}
          onClick={handleSelectPlan}
          style={{ marginTop: 'auto' }}
        >
          {isSelected ? "Selected" : "Select Plan"}
        </button>
      </div>
    </div>
  );
};

export default PayAsYouGoCard;
