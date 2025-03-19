import React from "react";

const PrepaidCard = () => {
  return (
    <div
      className="w-full max-w-md rounded-3xl shadow-sm p-8 relative overflow-hidden 
                bg-gradient-to-b from-[rgba(106,138,255,0.50)] to-[rgba(106,138,255,0.08)]"
    >
      {/* Background gradient overlay */}
      {/* <div className="absolute top-0 right-0 w-3/4 h-full bg-blue-300 rounded-full transform translate-x-1/3 translate-y-1/4 opacity-50"></div> */}

      <div className="flex flex-col relative z-10">
        {/* Icon */}
        <div className="mb-6">
          <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title and badge */}
        <div className="flex items-center mb-2">
          <h2 className="text-[24.242px] font-medium text-[#1B223C] leading-normal tracking-[-0.551px] font-outfit mr-7">
            Prepaid Bundle
          </h2>
          <span className=" text-white px-4 py-1 rounded-lg text-sm font-medium border border-white shadow-md">
            Most Popular
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-sm font-normal text-gray-700 mb-6">
          Best value for regular users
        </p>

        {/* Price */}
        <div className="mb-8 mt-2 border-b border-blue-300 pb-8">
          <span className="text-4xl font-medium text-gray-900">From $63</span>
        </div>

        {/* Plan options */}
        <ul className="space-y-6 mb-8">
          <li className="flex items-start">
            <div className="mt-1 mr-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10" r="9" stroke="#666" strokeWidth="2" />
                <circle cx="10" cy="10" r="3" fill="#666" />
              </svg>
            </div>
            <div>
              <div className="text-gray-900 text-sm font-medium">
                500-Minute bundle : $63.00
              </div>
              <div className="text-gray-600 text-xs">($0.126 per minute)</div>
            </div>
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
                <circle cx="10" cy="10" r="9" stroke="#666" strokeWidth="2" />
                <circle cx="10" cy="10" r="3" fill="#666" />
              </svg>
            </div>
            <div>
              <div className="text-gray-900 text-sm font-medium">
                1,000-minute bundle : $126.00
              </div>
              <div className="text-gray-600 text-xs">($0.126 per minute)</div>
            </div>
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
                <circle cx="10" cy="10" r="9" stroke="#666" strokeWidth="2" />
                <circle cx="10" cy="10" r="3" fill="#666" />
              </svg>
            </div>
            <div>
              <div className="text-gray-900 text-sm font-medium">
                2,500-minute bundle : $300.00
              </div>
              <div className="text-gray-600 text-xs">
                ($0.12 per minute, 10% discount)
              </div>
            </div>
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
                <circle cx="10" cy="10" r="9" stroke="#666" strokeWidth="2" />
                <circle cx="10" cy="10" r="3" fill="#666" />
              </svg>
            </div>
            <div>
              <div className="text-gray-900 text-sm font-medium">
                5,000-minute bundle : $550.00
              </div>
              <div className="text-gray-600 text-xs">
                ($0.11 per minute, best value)
              </div>
            </div>
          </li>
        </ul>

        {/* Button */}
        <button className="w-full py-4 px-6 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default PrepaidCard;
