import React, { useEffect, useState } from "react";
import axios from "axios";
import { payWithRazorpay } from "./api/razorPay";

const OrderSummary = ({ selectedPlan, summaryData, planDetails, onPaymentSuccess, onPaymentFailure, onBeginPayment }) => {
  // Extract values directly from the API response data
  let apiData;

  // Handle different possible structures of summaryData
  if (summaryData && summaryData.data) {
    // Standard structure where summaryData has a data property
    apiData = summaryData.data;
  } else if (summaryData && typeof summaryData === 'object') {
    // If summaryData itself contains the data
    apiData = summaryData;
  } else {
    // Fallback to empty object
    apiData = {};
  }

  // Use the exact structure from the API response
  const displayValues = {
    selected_plan: apiData.selected_plan || selectedPlan || 'No Plan Selected',
    total_minutes: apiData.total_minutes || '0',
    price_per_minute: apiData.price_per_minute || '$0.00',
    monthly_price: apiData.monthly_price || '',
    total_price: apiData.total_price || '0.00',
    sub_total: apiData.sub_total || '$0.00',
    discount: apiData.discount || '$0',
    card_save_charge: apiData.card_save_charge || '',
    overage_rate: apiData.overage_rate || null
  };


  const [orderDetails, setOrderDetails] = useState({});
  const [orderResponse, setOrderResponse] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({
    isComplete: false,
    isPending: false,
    isFailed: false,
    error: ""
  });

  // Check for saved payment session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('payment_session');
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        // If we have a saved session with this subscription ID, restore it
        if (sessionData.subscription_id === apiData?.subscription_id) {
          setOrderDetails(sessionData.orderDetails || {});
          if (sessionData.orderResponse &&
            sessionData.orderResponse.razorpay_payment_id &&
            sessionData.orderResponse.razorpay_order_id &&
            sessionData.orderResponse.razorpay_signature) {
            // If we have a complete response, process it
            setOrderResponse(sessionData.orderResponse);
          }
        }
      } catch (e) {
        console.error("Error parsing saved payment session", e);
        localStorage.removeItem('payment_session');
      }
    }
  }, [apiData?.subscription_id]);

  // Save current payment session
  const savePaymentSession = (data = {}) => {
    if (apiData?.subscription_id) {
      const sessionData = {
        subscription_id: apiData.subscription_id,
        selectedPlan,
        orderDetails: data.orderDetails || orderDetails,
        orderResponse: data.orderResponse || orderResponse,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('payment_session', JSON.stringify(sessionData));
    }
  };

  const fetchOrderId = async () => {
    if (apiData?.subscription_id) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("subscription_id", apiData.subscription_id);

        // Add debug log for order creation
        console.log('Creating order with subscription data:', {
          subscription_id: apiData.subscription_id,
          plan_details: apiData,
          total_price: displayValues.total_price
        });

        const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
        const token = localStorage.getItem("auth_token") || import.meta.env.VITE_BASE_TOKEN;

        const response = await axios.post(
          `${API_BASE_URL}business/make-payment`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Add debug log for order creation response
        console.log('Order creation response:', response.data);

        if (response.data?.status) {
          const newOrderDetails = response.data?.data;
          setOrderDetails(newOrderDetails);
          // Save session after getting order details
          savePaymentSession({ orderDetails: newOrderDetails });
        } else {
          throw new Error(response.data?.message || "Failed to create order");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setIsLoading(false);

        // Handle failure with appropriate error message
        setPaymentStatus({
          ...paymentStatus,
          isFailed: true,
          error: error.response?.data?.message || error.message || "Failed to create order"
        });

        if (onPaymentFailure) {
          onPaymentFailure({
            error: error.response?.data?.message || error.message || "Failed to create order",
            details: error.response?.data || error
          });
        }
      }
    }
  };

  // Submit payment response to backend
  const submitResponse = async () => {
    if (orderResponse) {
      try {
        setIsLoading(true);
        setPaymentStatus({ ...paymentStatus, isPending: true });

        const formData = new FormData();
        formData.append("order_id", orderResponse.razorpay_order_id);
        formData.append("payment_id", orderResponse.razorpay_payment_id);
        formData.append("razorpay_signature", orderResponse.razorpay_signature);

        // Add debug log for payment verification
        console.log('Verifying payment with response:', {
          order_id: orderResponse.razorpay_order_id,
          payment_id: orderResponse.razorpay_payment_id,
          signature: orderResponse.razorpay_signature
        });

        const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
        const token = localStorage.getItem("auth_token") || import.meta.env.VITE_BASE_TOKEN;

        const response = await axios.patch(
          `${API_BASE_URL}business/payment-completed`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Add debug log for payment verification response
        console.log('Payment verification response:', response.data);

        if (response.data.status) {
          setSuccessMessage(response.data.message || "Payment successful");
          setPaymentStatus({
            isComplete: true,
            isPending: false,
            isFailed: false,
            error: ""
          });

          // Clear the payment session after successful payment
          localStorage.removeItem('payment_session');

          // Notify parent component about successful payment with complete response data
          if (onPaymentSuccess) {
            onPaymentSuccess({
              paymentId: orderResponse.razorpay_payment_id,
              orderId: orderResponse.razorpay_order_id,
              signature: orderResponse.razorpay_signature,
              message: response.data.message || "Payment successful",
              details: response.data
            });
          }
        } else {
          const errorMessage = response.data.message || "Payment verification failed";

          setPaymentStatus({
            isComplete: false,
            isPending: false,
            isFailed: true,
            error: errorMessage
          });

          if (onPaymentFailure) {
            onPaymentFailure({
              error: errorMessage,
              details: response.data
            });
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error submitting payment response:", error);
        setIsLoading(false);

        const errorMessage = error.response?.data?.message || error.message || "Payment verification failed";

        setPaymentStatus({
          isComplete: false,
          isPending: false,
          isFailed: true,
          error: errorMessage
        });

        if (onPaymentFailure) {
          onPaymentFailure({
            error: errorMessage,
            details: error.response?.data || error
          });
        }
      }
    }
  };

  useEffect(() => {
    // Only fetch if we don't already have order details
    if (apiData?.subscription_id && !orderDetails.order_id) {
      fetchOrderId();
    }
  }, [apiData?.subscription_id]);

  useEffect(() => {
    if (orderResponse.razorpay_payment_id && orderResponse.razorpay_order_id && orderResponse.razorpay_signature) {
      // Save order response before submitting
      savePaymentSession({ orderResponse });
      submitResponse();
    }
  }, [orderResponse]);

  // Handle Razorpay payment errors
  const handlePaymentError = (errorData) => {
    console.error("Payment error:", errorData);

    // Special handling for pending payments
    if (errorData.isPending) {
      setPaymentStatus({
        isComplete: false,
        isPending: true,
        isFailed: false,
        error: errorData.error
      });
      return;
    }

    // Handle other errors
    setPaymentStatus({
      isComplete: false,
      isPending: false,
      isFailed: true,
      error: errorData.error
    });

    if (onPaymentFailure) {
      onPaymentFailure({
        error: errorData.error,
        code: errorData.code,
        details: errorData.details
      });
    }
  };

  // Handle retry payment
  const handleRetryPayment = () => {
    setPaymentStatus({
      ...paymentStatus,
      isFailed: false,
      error: ""
    });
    fetchOrderId();
  };

  // Pay with razorpay
  const handleProceedToCheckout = () => {
    if (orderDetails && (orderDetails.order_id || orderDetails.subscription_id)) {
      setPaymentStatus({ ...paymentStatus, isPending: true, error: "" });
      if (onBeginPayment) {
        onBeginPayment();
      }
      // Prepare payload for Razorpay based on plan type
      let paymentPayload = {};
      if (
        displayValues.selected_plan === "Subscription Plan" &&
        orderDetails.subscription_id
      ) {
        paymentPayload = {
          subscription_id: orderDetails.subscription_id,
          plan_type: selectedPlan,
          ...orderDetails
        };
      } else {
        paymentPayload = {
          order_id: orderDetails.order_id,
          plan_type: selectedPlan,
          ...orderDetails
        };
      }
      // Log for verification
      console.log('Razorpay orderDetails:', paymentPayload);
      payWithRazorpay(
        paymentPayload,
        (response) => {
          setOrderResponse(response);
        },
        handlePaymentError
      );
    } else {
      fetchOrderId();
    }
  };

  return (
    <div className="w-full min-h-[423.35px] bg-white rounded-[14.33px] border-[0.55px] border-[#E5E5E5] shadow-custom p-6 mx-auto">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="text-xl font-medium mb-6">Order Summary</h2>

          <div className="flex justify-between items-center mb-4">
            <span className="text-[14px] leading-[18px] text-[#1B223C]">
              Selected Plan:
            </span>
            <span className="bg-[#343434] text-white px-2 py-1 rounded-[8px] text-[14px] leading-[18px] font-medium">
              {displayValues.selected_plan}
            </span>
          </div>

          <div className="space-y-4 mt-6">
            {/* Plan details section */}
            <div className="border-t border-gray-100 pt-4">
              {/* Minutes */}
              {displayValues.total_minutes && (
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-black">Minutes</span>
                  <span className="font-medium text-black">
                    {displayValues.total_minutes}
                  </span>
                </div>
              )}

              {/* Price per minute */}
              {displayValues.price_per_minute && (
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-black">Price per minute</span>
                  <span className="font-medium text-black">
                    {displayValues.price_per_minute}
                  </span>
                </div>
              )}

              {/* Monthly price - only show if available */}
              {displayValues.monthly_price && (
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-black">Monthly price</span>
                  <span className="font-medium text-black">
                    {displayValues.monthly_price}
                  </span>
                </div>
              )}

              {/* Overage rate - only show if available */}
              {displayValues.overage_rate && (
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-black">Overage rate</span>
                  <span className="font-medium text-black">
                    {displayValues.overage_rate}
                  </span>
                </div>
              )}
            </div>

            {/* Payment summary section */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-black">Subtotal</span>
                <span className="font-medium text-black">
                  {displayValues.sub_total}
                </span>
              </div>

              {/* Discount - only show if available */}
              <div className="flex justify-between mb-2">
                <span className="text-sm text-black">Discount</span>
                <span className="font-medium text-green-600">
                  {displayValues.discount}
                </span>
              </div>

              {/* Card fee - only show if available */}
              {displayValues.card_save_charge && (
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-black">Card fee</span>
                  <span className="font-medium text-black">
                    {displayValues.card_save_charge}
                  </span>
                </div>
              )}

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-black">Total</span>
                  <span className="font-bold text-lg text-black">
                    ${displayValues.total_price.toString().replace('$', '').trim()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {paymentStatus.isPending || isLoading ? (
          <button
            disabled
            className="w-full py-2.5 px-6 bg-gray-500 text-white rounded-[8px] font-medium flex items-center justify-center gap-2 mt-6"
          >
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Payment...
          </button>
        ) : paymentStatus.isComplete ? (
          <button
            disabled
            className="w-full py-2.5 px-6 bg-green-600 text-white rounded-[8px] font-medium flex items-center justify-center gap-2 mt-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Payment Successful
          </button>
        ) : paymentStatus.isFailed ? (
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={handleRetryPayment}
              className="w-full py-2.5 px-6 bg-red-600 text-white rounded-[8px] font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        ) : (
          <button
            onClick={handleProceedToCheckout}
            className="w-full py-2.5 px-6 bg-black text-white rounded-[8px] font-medium hover:bg-gray-800 transition-colors mt-6"
          >
            Proceed to Checkout
          </button>
        )}

        {successMessage && !paymentStatus.isFailed && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md animate-fadeIn">
            <p>{successMessage}</p>
          </div>
        )}

        {paymentStatus.isFailed && (
          <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md animate-fadeIn">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{paymentStatus.error || "Payment failed. Please try again."}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
