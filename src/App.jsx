import React, { useState, useEffect } from "react";
import PayAsYouGoCard from "./components/Card";
import PlanHeader from "./components/PlanHeader";
import PrepaidCard from "./components/PrepaidCard";
import OrderSummary from "./components/OrderSummary";
import SubscriptionCard from "./components/SubscriptionCard";
import apiService from "./components/api";
import { CheckCircle, RefreshCw, X, Moon, Sun } from "lucide-react";

const App = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [prepaidBundle, setPrepaidBundle] = useState({});
  const [monthlyPlan, setMonthlyPlan] = useState({});
  const [payAsPlan, setPayAsPlan] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [subscriptionSummary, setSubscriptionSummary] = useState(null);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({
    isComplete: false,
    paymentId: null,
    orderId: null,
    message: "",
    responseData: null,
    error: null,
  });

  // Initialize dark mode from user preference or localStorage
  useEffect(() => {
    // Check localStorage first
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === "true");
    } else {
      // Check user preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Apply dark mode class to document when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference to localStorage
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  // Extract token from URL parameters when app loads
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = searchParams.get("token");

    if (tokenFromUrl) {
      // Store token in localStorage for future use
      localStorage.setItem("auth_token", tokenFromUrl);
      console.log("Token extracted from URL and stored");

      // Optional: Remove token from URL for security
      // This creates a new URL without the token parameter
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  // Check for saved plan selection
  useEffect(() => {
    const savedSession = localStorage.getItem("plan_selection");
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        if (sessionData.timestamp) {
          // Check if session is less than 24 hours old
          const sessionTime = new Date(sessionData.timestamp).getTime();
          const now = new Date().getTime();
          const hoursDiff = (now - sessionTime) / (1000 * 60 * 60);

          if (hoursDiff < 24) {
            // Restore session if it's fresh
            setSelectedPlan(sessionData.selectedPlan);
            setSubscriptionSummary(sessionData.summaryData);
            setSelectedPlanDetails(sessionData.planDetails);
          } else {
            // Clear old session
            localStorage.removeItem("plan_selection");
          }
        }
      } catch (e) {
        console.error("Error parsing saved plan selection", e);
        localStorage.removeItem("plan_selection");
      }
    }
  }, []);

  const fetchPlan = async () => {
    try {
      setIsLoading(true);
      const res = await apiService.get("business/subscriptions-list");
      setPrepaidBundle(res.data["Prepaid Bundle"]);
      setMonthlyPlan(res.data["Subscription Plan"]);
      setPayAsPlan(res.data["Pay As You Go"]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setIsLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await apiService.get("business/payment/business-details");
      setUserDetails(res.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchPlan();
    fetchUserDetails();
  }, []);

  // Save plan selection to localStorage
  const savePlanSelection = (planData) => {
    const sessionData = {
      selectedPlan: planData.type,
      summaryData: planData.summary,
      planDetails: planData.planDetails,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("plan_selection", JSON.stringify(sessionData));
  };

  // Handler for when a plan is selected from any card
  const handleSubscriptionSelected = (planData) => {
    // Skip if there's already an active plan with payment complete
    if (paymentStatus.isComplete) return;

    // Store the selected plan type
    setSelectedPlan(planData.type);

    // Store the subscription summary data (the entire API response)
    setSubscriptionSummary(planData.summary);

    // Store the selected plan details
    setSelectedPlanDetails(planData.planDetails);

    // Save selection to localStorage for session recovery
    savePlanSelection(planData);

    // Scroll to order summary on mobile
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.querySelector(".order-summary-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  // Handle payment success
  const handlePaymentSuccess = (paymentData) => {
    setPaymentStatus({
      isComplete: true,
      paymentId: paymentData.paymentId,
      orderId: paymentData.orderId,
      message: paymentData.message || "Payment completed successfully",
      responseData: paymentData.details?.data || null,
      error: null,
    });

    // Clear plan selection from localStorage after successful payment
    localStorage.removeItem("plan_selection");

    // Scroll to top to show the success message
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle payment failure
  const handlePaymentFailure = (errorData) => {
    const errorMessage =
      errorData.details?.message || errorData.error || "Payment failed";

    setPaymentStatus({
      ...paymentStatus,
      isComplete: false,
      error: errorMessage,
    });

    // Scroll to the error message
    setTimeout(() => {
      document.querySelector(".error-message")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  // Reset payment status (for starting over)
  const handleStartNewOrder = () => {
    setPaymentStatus({
      isComplete: false,
      paymentId: null,
      orderId: null,
      message: "",
      responseData: null,
      error: null,
    });
    setSelectedPlan(null);
    setSubscriptionSummary(null);

    // Clear any saved sessions
    localStorage.removeItem("plan_selection");
    localStorage.removeItem("payment_session");
  };

  // Handle payment initiation
  const handleBeginPayment = () => {
    // Remove currentStep update line
  };

  // Helper function for keyboard interaction with cards
  const handleCardKeyboardInteraction = (planType) => {
    const planData = {
      type: planType,
      summary:
        planType === "Pay as You Go"
          ? { data: payAsPlan }
          : planType === "Prepaid Bundle"
          ? { data: prepaidBundle }
          : { data: monthlyPlan },
      planDetails:
        planType === "Pay as You Go"
          ? payAsPlan
          : planType === "Prepaid Bundle"
          ? prepaidBundle
          : monthlyPlan,
    };

    handleSubscriptionSelected(planData);
  };

  // Handle print invoice
  const handlePrintInvoice = () => {
    // Create a printable version of the invoice
    const printContent = document.createElement("div");
    printContent.className = "invoice-print-content";

    const responseData = paymentStatus.responseData || {};
    const printDate = new Date().toLocaleString();

    printContent.innerHTML = `
      <style>
        @media print {
          .invoice-print-content {
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          .invoice-header {
            text-align: center;
            margin-bottom: 30px;
          }
          .invoice-header h1 {
            color: #333;
            margin-bottom: 5px;
          }
          .invoice-details {
            margin-bottom: 30px;
          }
          .invoice-details table {
            width: 100%;
            border-collapse: collapse;
          }
          .invoice-details th, .invoice-details td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          .invoice-footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        }
      </style>
      <div class="invoice-header">
        <h1>SpeakOrder - Invoice</h1>
        <p>Transaction Date: ${
          responseData.payment_date || new Date().toLocaleDateString()
        }</p>
        <p>Invoice Generated: ${printDate}</p>
      </div>
      <div class="invoice-details">
        <h2>Plan Details</h2>
        <table>
          <tr>
            <th>Plan Type</th>
            <td>${selectedPlan || ""}</td>
          </tr>
          ${
            responseData.plan_name
              ? `<tr>
            <th>Plan Name</th>
            <td>${responseData.plan_name}</td>
          </tr>`
              : ""
          }
          ${
            responseData.minutes
              ? `<tr>
            <th>Minutes</th>
            <td>${responseData.minutes}</td>
          </tr>`
              : ""
          }
          ${
            responseData.price
              ? `<tr>
            <th>Price</th>
            <td>${responseData.price}</td>
          </tr>`
              : ""
          }
        </table>
        
        <h2>Payment Details</h2>
        <table>
          <tr>
            <th>Payment ID</th>
            <td>${paymentStatus.paymentId || ""}</td>
          </tr>
          <tr>
            <th>Order ID</th>
            <td>${paymentStatus.orderId || ""}</td>
          </tr>
          ${
            responseData.transaction_id
              ? `<tr>
            <th>Transaction ID</th>
            <td>${responseData.transaction_id}</td>
          </tr>`
              : ""
          }
        </table>
      </div>
      <div class="invoice-footer">
        <p>Thank you for your business!</p>
        <p>For any questions, please contact support@speakorder.com</p>
      </div>
    `;

    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    printWindow.document.body.appendChild(printContent);

    // Trigger print when content is loaded
    printWindow.document.close();
    printWindow.focus();

    // Add small delay to ensure content is fully loaded
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Render payment success view
  const renderPaymentSuccess = () => {
    const responseData = paymentStatus.responseData || {};

    return (
      <div className="animate-fadeIn">
        {/* Success Header */}
        <div className="flex items-center justify-center mb-12 mt-6">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mr-4">
            <CheckCircle
              size={36}
              className="text-green-600 dark:text-green-400"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
              Payment Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {paymentStatus.message}
            </p>
          </div>
        </div>

        {/* Success Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold dark:text-white">
                Subscription Details
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                Active
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Plan Details */}
              <div className="space-y-4">
                <div className="border-b dark:border-gray-700 pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                      Plan Type
                    </span>
                    <span className="font-medium dark:text-white">
                      {selectedPlan}
                    </span>
                  </div>

                  {responseData.plan_name && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        Plan Name
                      </span>
                      <span className="font-medium dark:text-white">
                        {responseData.plan_name}
                      </span>
                    </div>
                  )}

                  {responseData.minutes && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        Minutes
                      </span>
                      <span className="font-medium dark:text-white">
                        {responseData.minutes}
                      </span>
                    </div>
                  )}

                  {responseData.overage_rate && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        Overage Rate
                      </span>
                      <span className="font-medium dark:text-white">
                        {responseData.overage_rate}
                      </span>
                    </div>
                  )}

                  {responseData.price && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        Price
                      </span>
                      <span className="font-medium dark:text-white">
                        {responseData.price}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">
                    Subscription starts
                  </p>
                  <p className="font-medium dark:text-white">
                    {responseData.activated_at
                      ? new Date(responseData.activated_at).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right Column - Payment Details */}
              <div className="space-y-4">
                <div className="border-b dark:border-gray-700 pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                      Payment ID
                    </span>
                    <span className="font-medium text-xs break-all dark:text-white">
                      {paymentStatus.paymentId}
                    </span>
                  </div>

                  {paymentStatus.orderId && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        Order ID
                      </span>
                      <span className="font-medium text-xs break-all dark:text-white">
                        {paymentStatus.orderId}
                      </span>
                    </div>
                  )}

                  {responseData.transaction_id && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        Transaction ID
                      </span>
                      <span className="font-medium text-xs break-all dark:text-white">
                        {responseData.transaction_id}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">
                    Payment Date
                  </p>
                  <p className="font-medium dark:text-white">
                    {responseData.payment_date
                      ? new Date(responseData.payment_date).toLocaleString()
                      : new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="px-8 py-3 bg-black dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleStartNewOrder}
            className="px-8 py-3 border border-gray-300 dark:border-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Start a New Order
          </button>
          <button
            onClick={handlePrintInvoice}
            className="px-8 py-3 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                clipRule="evenodd"
              />
            </svg>
            Print Invoice
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 dark:text-white font-Inter transition-colors duration-200">
      {/* <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} /> */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-10">
          <div className="mr-2">
            <svg
              className="w-8 h-8 dark:text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect x="4" y="4" width="2" height="16" fill="currentColor" />
              <rect x="8" y="8" width="2" height="8" fill="currentColor" />
              <rect x="12" y="6" width="2" height="12" fill="currentColor" />
              <rect x="16" y="10" width="2" height="4" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Speak Order</h1>
        </div>

        {/* Business Information Section - Always visible */}
        <PlanHeader data={userDetails} />

        {/* Payment Success or Plan Selection Views */}
        <div className="mt-12">
          {paymentStatus.isComplete ? (
            /* Success View - Show after payment success */
            renderPaymentSuccess()
          ) : (
            /* Plan Selection View - Show before payment */
            <>
              <h2
                className="text-2xl font-bold mb-2"
                id="plan-selection-heading"
              >
                Choose Your Plan
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Select the best payment option for your business needs
              </p>

              {/* Payment Error Message */}
              {paymentStatus.error && (
                <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4 animate-fadeIn error-message">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <X className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3 flex-grow">
                      <h3 className="text-sm font-medium text-red-800">
                        Payment Failed
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{paymentStatus.error}</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setPaymentStatus({ ...paymentStatus, error: null })
                      }
                      className="ml-auto flex-shrink-0 bg-red-50 p-1 rounded-md text-red-400 hover:text-red-500"
                    >
                      <span className="sr-only">Dismiss</span>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="h-12 w-12 text-gray-400 animate-spin mb-4" />
                  <p className="text-gray-600">Loading available plans...</p>
                </div>
              ) : (
                /* Loaded Content */
                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Container for the three plan cards */}
                  <div
                    className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-10"
                    role="radiogroup"
                    aria-labelledby="plan-selection-heading"
                  >
                    <div
                      className="w-full flex justify-center animate-fadeIn"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <div
                        className="w-full cursor-pointer"
                        onClick={() =>
                          handleCardKeyboardInteraction("Pay as You Go")
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleCardKeyboardInteraction("Pay as You Go");
                          }
                        }}
                        role="radio"
                        aria-checked={selectedPlan === "Pay as You Go"}
                        tabIndex="0"
                      >
                        <PayAsYouGoCard
                          data={payAsPlan}
                          isSelected={selectedPlan === "Pay as You Go"}
                          isPaid={paymentStatus.isComplete}
                          onPlanSelect={handleSubscriptionSelected}
                        />
                      </div>
                    </div>
                    <div
                      className="w-full flex justify-center animate-fadeIn"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <div
                        className="w-full cursor-pointer"
                        onClick={() =>
                          handleCardKeyboardInteraction("Prepaid Bundle")
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleCardKeyboardInteraction("Prepaid Bundle");
                          }
                        }}
                        role="radio"
                        aria-checked={selectedPlan === "Prepaid Bundle"}
                        tabIndex="0"
                      >
                        <PrepaidCard
                          data={prepaidBundle}
                          isSelected={selectedPlan === "Prepaid Bundle"}
                          isPaid={paymentStatus.isComplete}
                          onPlanSelect={handleSubscriptionSelected}
                        />
                      </div>
                    </div>
                    <div
                      className="w-full flex justify-center animate-fadeIn"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <div
                        className="w-full cursor-pointer"
                        onClick={() =>
                          handleCardKeyboardInteraction("Subscription")
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleCardKeyboardInteraction("Subscription");
                          }
                        }}
                        role="radio"
                        aria-checked={selectedPlan === "Subscription"}
                        tabIndex="0"
                      >
                        <SubscriptionCard
                          data={monthlyPlan}
                          isSelected={selectedPlan === "Subscription"}
                          isPaid={paymentStatus.isComplete}
                          onPlanSelect={handleSubscriptionSelected}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  {selectedPlan && (
                    <div className="w-full lg:w-1/4 flex-shrink-0 order-summary-section animate-fadeIn">
                      <OrderSummary
                        selectedPlan={selectedPlan}
                        planDetails={selectedPlanDetails}
                        summaryData={subscriptionSummary}
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentFailure={handlePaymentFailure}
                        onBeginPayment={handleBeginPayment}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
