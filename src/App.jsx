import React, { useState } from "react";
import PayAsYouGoCard from "./components/Card";
import PlanHeader from "./components/PlanHeader";
import PrepaidCard from "./components/PrepaidCard";
import OrderSummary from "./components/OrderSummary";

const App = () => {
  const [selectedPlan, setSelectedPlan] = useState("prepaid");

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "linear-gradient(to right, #EFF2FF, #DDE5FF)" }}
    >
      <div className="max-w-8xl mx-auto p-8 font-sans">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="mr-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="2" height="16" fill="black" />
              <rect x="8" y="8" width="2" height="8" fill="black" />
              <rect x="12" y="6" width="2" height="12" fill="black" />
              <rect x="16" y="10" width="2" height="4" fill="black" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Speak Order</h1>
        </div>
        {/* <PlanHeader/> */}

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left Section: Plan Cards */}
          <div className="md:w-2/3">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
              <p className="text-gray-600 mb-6">
                Select the best payment option for your business needs
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PayAsYouGoCard />
                <PrepaidCard />
                <PayAsYouGoCard />
              </div>
            </div>
          </div>

          {/* Right Section: Order Summary - Now Aligned */}
          <div className="md:w-1/3 flex-none">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
