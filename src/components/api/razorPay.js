const loadScript = src => {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};


export const payWithRazorpay = async (order, nextFunc, errorCallback) => {

    const url = import.meta.env.VITE_RAZORPAY_SCRIPT_URL
    const res = await loadScript(url);

    if (!res) {
        if (errorCallback) {
            errorCallback({
                error: 'Razorpay SDK failed to load. Please check your internet connection and try again.',
                code: 'SCRIPT_LOAD_ERROR'
            });
        }
        return;
    }

    try {
        // Add debug log for order details
        console.log('Razorpay orderDetails:', order);

        // Step 2: Call the Razorpay checkout form
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // This is Api key. you will get it from razorpay dashboard > account and settings > API keys

            name: 'SpeakOrder',
            order_id: order.order_id,
            subscription_id: order.subscription_id,
            description: 'SpeakOrder Subscription',
            customer_id: order.customer_id,
            save: 1,
            image: 'https://admin.dev.vanforces.com/static/media/VF_logo.8cdeffd1304416f59e86.png', // your project logo
            handler: function (response) {
                // Fix: Check if nextFunc exists and is a function before calling
                if (typeof nextFunc === 'function') {
                    nextFunc(response);
                } else if (order.onSuccess && typeof order.onSuccess === 'function') {
                    // Fallback to onSuccess if provided in order object
                    order.onSuccess(response);
                } else {
                    console.error('No success callback provided for Razorpay payment');
                }
                return response;
            },

            // prefill: {
            //     name: 'Customer',
            //     email: 'customer@example.com',
            //     contact: '1234567890',
            // },

            notes: {
                address: 'India',
                plan_type: order.plan_type || '',
                order_reference: order.order_id || order.subscription_id
            },
            theme: {
                color: '#158993',
            },
            modal: {
                ondismiss: function () {
                    if (errorCallback) {
                        errorCallback({
                            error: 'Payment window was closed. You can try again when ready.',
                            code: 'PAYMENT_CANCELLED'
                        });
                    }
                }
            }
        };

        // Add debug log for Razorpay options
        console.log('Razorpay options:', options);

        // Step 4: Open Razorpay payment popup
        const rzp = new window.Razorpay(options);
        rzp.open();

        //Handle payment failure
        rzp.on('payment.failed', response => {
            if (errorCallback) {
                errorCallback({
                    error: response.error.description || 'Payment failed. Please try again.',
                    code: response.error.code,
                    source: 'razorpay',
                    details: response
                });
            }
        });

        // Handle payment pending (optional)
        rzp.on('payment.pending', response => {
            if (errorCallback) {
                errorCallback({
                    error: 'Payment is pending. Please complete the payment process.',
                    code: 'PAYMENT_PENDING',
                    source: 'razorpay',
                    details: response,
                    isPending: true
                });
            }
        });
    } catch (error) {
        console.error('Error during payment:', error);
        if (errorCallback) {
            errorCallback({
                error: error.message || 'An unexpected error occurred during payment setup.',
                code: 'PAYMENT_SETUP_ERROR',
                details: error
            });
        }
    }
};
