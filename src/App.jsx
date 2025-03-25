import React, { useEffect, useState } from "react";
import PayAsYouGoCard from "./components/Card";
import PlanHeader from "./components/PlanHeader";
import PrepaidCard from "./components/PrepaidCard";
import OrderSummary from "./components/OrderSummary";
import SubscriptionCard from "./components/SubscriptionCard";
import apiService from "./components/api";

const App = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [prepaidBundle, setPrepaidBundle] = useState({});
  const [monthlyPlan, setMonthlyPlan] = useState({});
  const [payAsPlan, setPayAsPlan] = useState({});
  const [userDetails, setUserDetails] = useState({});

  const fetchPlan = () => {
    apiService.get("business/subscriptions-list").then((res) => {
      setPrepaidBundle(res.data["Prepaid Bundle"]);
      setMonthlyPlan(res.data["Subscription Plan"]);
      setPayAsPlan(res.data["Pay As You Go"]);
    });
  };

  const fetchUserDetails = () => {
    apiService.get("business/payment/business-details").then((res) => {
      setUserDetails(res.data);
    });
  };

  useEffect(() => {
    fetchPlan();
    fetchUserDetails();
  }, []);

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
  };

  return (
    <div className="min-h-screen w-full bg-white font-Inter">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-10">
          <div className="mr-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="2" height="16" fill="black" />
              <rect x="8" y="8" width="2" height="8" fill="black" />
              <rect x="12" y="6" width="2" height="12" fill="black" />
              <rect x="16" y="10" width="2" height="4" fill="black" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Speak Order</h1>
        </div>

        {/* Business Information Section */}
        <PlanHeader data={userDetails} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-gray-600 text-sm mb-6">
            Select the best payment option for your business needs
          </p>

          {/* Flex container to position cards and order summary */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Container for the three plan cards */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-10">
              <div
                className="w-full flex justify-center cursor-pointer"
                onClick={() => handleSelectPlan("Pay as You Go")}
              >
                <PayAsYouGoCard
                  data={payAsPlan}
                  isSelected={selectedPlan === "Pay as You Go"}
                />
              </div>
              <div
                className="w-full flex justify-center cursor-pointer"
                onClick={() => handleSelectPlan("Prepaid Bundle")}
              >
                <PrepaidCard
                  data={prepaidBundle}
                  isSelected={selectedPlan === "Prepaid Bundle"}
                />
              </div>
              <div
                className="w-full flex justify-center cursor-pointer"
                onClick={() => handleSelectPlan("Subscription")}
              >
                <SubscriptionCard
                  data={monthlyPlan}
                  isSelected={selectedPlan === "Subscription"}
                />
              </div>
            </div>

            {/* Order Summary on the right side, only when a plan is selected */}
            {selectedPlan && (
              <div className="w-full lg:w-1/4 flex-shrink-0">
                <OrderSummary selectedPlan={selectedPlan} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
