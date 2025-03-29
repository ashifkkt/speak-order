import React, { useState, } from "react";
import { Gem } from "lucide-react";
import apiService from "../components/api";

const PrepaidCard = ({ data, isSelected, onPlanSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle radio button selection
  const handleOptionSelect = async (optionIndex) => {
    setSelectedOption(optionIndex);
    
    // Get the selected subscription details
    const selectedSubscription = data?.subscriptions?.[optionIndex];
    
    if (selectedSubscription) {
      try {
        setLoading(true);
        setError(null);
        
        // Make API call to get subscription summary
        const subscriptionId = selectedSubscription.subscription_id;
        const summaryData = await apiService.get(`business/subscription-summary/${subscriptionId}`);
        
        // Pass selected plan information to parent component
        if (onPlanSelect) {
          onPlanSelect({
            type: "Prepaid Bundle",
            planId: subscriptionId,
            planDetails: selectedSubscription,
            summary: summaryData
          });
        }
      } catch (err) {
        console.error("Error fetching subscription summary:", err);
        setError("Failed to load plan details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle select plan button click
  const handleSelectPlan = () => {
    if (selectedOption !== null) {
      // If an option is already selected, use that
      const selectedSubscription = data?.subscriptions?.[selectedOption];
      if (selectedSubscription && onPlanSelect) {
        // We already made the API call when the radio button was selected,
        // so we don't need to do it again here
      }
    } else if (data?.subscriptions?.length > 0) {
      // If no option is selected, select the first one by default
      handleOptionSelect(0);
    }
  };

  return (
    <div
      className={`w-full min-h-[423.35px] rounded-[14.33px] border-[0.55px] shadow-custom p-5 mx-auto
      ${
        isSelected
          ? "bg-[#3C3C3C] border-gray-600 text-white"
          : "bg-white border-[#E7EBFF] text-gray-900"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="mb-4">
          <div
            className={`w-[44px] h-[44px] rounded-[14.33px] flex items-center justify-center
            ${isSelected ? "bg-white" : "bg-black"}`}
          >
            <Gem
              className={`w-5 h-5 ${isSelected ? "text-black" : "text-white"}`}
            />
          </div>
        </div>

        {/* Title and badge */}
        <div className="flex items-center justify-between mb-2">
          <h2
            className={`text-[24.24px] leading-[100%] tracking-[-0.55px] font-medium font-outfit
    ${isSelected ? "text-white" : "text-gray-900"}`}
          >
            {data?.display_name}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
    ${isSelected ? "bg-[#4A4A4A] text-white" : "bg-[#F1F2F6] text-gray-700"}`}
          >
            Most Popular
          </span>
        </div>

        {/* Subtitle */}
        <p
          className={`text-sm font-light mb-4
          ${isSelected ? "text-gray-300" : "text-gray-500"}`}
        >
          {data?.sub_title}
        </p>

        {/* Price */}
        <div
          className={`mb-6 pb-6 border-b
          ${isSelected ? "border-gray-600" : "border-[#E5E5E5]"}`}
        >
          <div
            className={`text-[33.06px] leading-[100%] tracking-[-0.55px] font-medium font-outfit
            ${isSelected ? "text-white" : "text-gray-900"}`}
          >
            {data?.price_title}
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-3 mb-6 flex-grow">
          {data?.subscriptions?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <div className="min-w-[20px] pt-0.5">
                <input
                  type="radio"
                  id={`option-${idx}`}
                  name="subscription-option"
                  value={idx}
                  checked={selectedOption === idx}
                  onChange={() => handleOptionSelect(idx)}
                  className={`w-4 h-4 cursor-pointer ${
                    isSelected 
                      ? "accent-white border-white" 
                      : "accent-[#1A1A1A] border-[#1A1A1A]"
                  }`}
                />
              </div>
              <div className="flex-1">
                <label 
                  htmlFor={`option-${idx}`}
                  className={`text-[13.22px] leading-[20px] tracking-[0%] font-outfit cursor-pointer
                    ${isSelected ? "text-white" : "text-gray-900"}`}
                >
                  {item?.display_name} : {item?.price}
                  <div
                    className={`text-[11px]
                    ${isSelected ? "text-gray-300" : "text-gray-500"}`}
                  >
                    {item?.minutes} minutes
                  </div>
                </label>
              </div>
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

        {/* Button */}
        <button
          className={`w-full py-2.5 px-6 rounded-lg font-medium transition-colors
          ${
            isSelected
              ? "bg-white text-[#3C3C3C] hover:bg-gray-100"
              : "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-gray-50"
          }`}
          onClick={handleSelectPlan}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default PrepaidCard;
