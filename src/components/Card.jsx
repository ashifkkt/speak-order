import React from "react";

const PayAsYouGoCard = () => {
  return (
   
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm p-8">
        <div className="flex flex-col">
          {/* Icon */}
          <div className="mb-6">
            <div className="bg-black w-12 h-12 rounded-2xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-medium leading-tight tracking-tight text-gray-900 mb-2">
            Pay as You Go
          </h2>

          {/* Subtitle */}
          <p className="text-sm font-light leading-tight tracking-normal text-gray-500 mb-6">
            Perfect for occasional users
          </p>

          {/* Price */}
          <div className="mb-8 mt-2 border-b pb-8">
            <span className="text-3xl font-medium text-gray-900">
              $0.126
            </span>
            <span className="text-gray-500 font-light ml-1">
              per Minute
            </span>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <div className="mt-1 mr-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" stroke="#333" strokeWidth="2" />
                  <circle cx="10" cy="10" r="3" fill="#333" />
                </svg>
              </div>
              <span className="text-gray-900 text-sm font-normal leading-relaxed">
                Pay only for what you use
              </span>
            </li>

            <li className="flex items-start">
              <div className="mt-1 mr-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" stroke="#333" strokeWidth="2" />
                  <circle cx="10" cy="10" r="3" fill="#333" />
                </svg>
              </div>
              <span className="text-gray-900 text-sm font-normal leading-relaxed">
                Free Starter Minutes (10 min)
              </span>
            </li>

            <li className="flex items-start">
              <div className="mt-1 mr-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" stroke="#333" strokeWidth="2" />
                  <circle cx="10" cy="10" r="3" fill="#333" />
                </svg>
              </div>
              <span className="text-gray-900 text-sm font-normal leading-relaxed">
                Simple Pricing
              </span>
            </li>

            <li className="flex items-start">
              <div className="mt-1 mr-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" stroke="#333" strokeWidth="2" />
                  <circle cx="10" cy="10" r="3" fill="#333" />
                </svg>
              </div>
              <div className="text-gray-900 text-sm font-normal leading-relaxed">
                <span>Invoice generated in every</span>
                <div>90 min ($11.34 for 90 min)</div>
              </div>
            </li>
          </ul>

          {/* Button */}
          <button className="w-full py-3 px-6 border border-gray-900 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors">
            Select Plan
          </button>
        </div>
      </div>
   
  );
};

export default PayAsYouGoCard;