import React from "react";
import { useNavigate } from "react-router-dom";

const InvoiceSummary = ({ invoiceData = {} }) => {
  // Default data in case no props are passed
  const {
    invoiceNumber = "2125920",
    invoiceDate = "05-03-25",
    dueDate = "15-03-25",
    subscriptionPlan = "Pay as you go",
    paymentStatus = "Completed",
    overageMinutes = "25 min",
    overageRate = "$10",
    subtotalAmount = "$300",
    discountAmount = "$10",
    taxAmount = "$5",
    lateFeeAmount = "$2",
    totalAmount = "$317"
  } = invoiceData;

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Invoice Details</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Invoice information */}
          <div className="flex-1 space-y-6">
            <div className="flex">
              <div className="w-44 font-medium">Invoice Number</div>
              <div className="text-gray-700">: {invoiceNumber}</div>
            </div>

            <div className="flex">
              <div className="w-44 font-medium">Invoice Date</div>
              <div className="text-gray-700">: {invoiceDate}</div>
            </div>

            <div className="flex">
              <div className="w-44 font-medium">Due Date</div>
              <div className="text-gray-700">: {dueDate}</div>
            </div>

            <div className="flex">
              <div className="w-44 font-medium">Subscription Plan</div>
              <div className="text-gray-700">: {subscriptionPlan}</div>
            </div>

            <div className="flex">
              <div className="w-44 font-medium">Payment Status</div>
              <div className="text-green-600 font-medium">: {paymentStatus}</div>
            </div>

            <div className="flex">
              <div className="w-44 font-medium">Overage Minutes</div>
              <div className="text-gray-700">: {overageMinutes}</div>
            </div>

            <div className="flex">
              <div className="w-44 font-medium">Overage Rate</div>
              <div className="text-gray-700">: {overageRate}</div>
            </div>
          </div>

          {/* Right side - Payment summary */}
          <div className="md:w-[350px] border border-gray-200 rounded-lg p-5">
            <div className="space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Subtotal amount</span>
                <span className="font-medium">{subtotalAmount}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-700">Discount amount</span>
                <span className="font-medium">{discountAmount}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-700">Tax amount</span>
                <span className="font-medium">{taxAmount}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-700">Late fee amount</span>
                <span className="font-medium">{lateFeeAmount}</span>
              </div>

              <div className="border-t pt-4 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total amount</span>
                  <span>{totalAmount}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 px-4 rounded mt-4 hover:bg-gray-800 transition-colors">
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;
