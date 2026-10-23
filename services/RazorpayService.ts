export interface RazorpayOrderRequest {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, any>;
}

// =====================================
// YOUR BACKEND URL
// =====================================
const BASE_URL =
  'http://10.37.67.96:5000';

class RazorpayService {
  // =====================================
  // HEALTH CHECK
  // =====================================
  async checkServerHealth() {
    try {
      const res = await fetch(
        `${BASE_URL}/health`
      );

      const data = await res.json();

      return data.success === true;
    } catch (err) {
      console.error(
        'Health check failed:',
        err
      );

      return false;
    }
  }

  // =====================================
  // CREATE ORDER
  // =====================================
  async createOrder(
    orderRequest: RazorpayOrderRequest
  ) {
    try {
      const res = await fetch(
        `${BASE_URL}/create-order`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(
            orderRequest
          ),
        }
      );

      return await res.json();
    } catch (err: any) {
      console.error(
        'Create order error:',
        err
      );

      return {
        success: false,

        error: err.message,
      };
    }
  }

  
  async sendConfirmationEmail(
    email: string,
    doctorName: string,
    amount: number,
    consultationType: string
  ) {
    try {
      const response = await fetch(
        `${BASE_URL}/send-confirmation-email`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            email,
            doctorName,
            amount,
            consultationType,
          }),
        }
      );

      return await response.json();
    } catch (error) {
      console.log(
        'Email Error:',
        error
      );
    }
  }

  // =====================================
  // PROCESS PAYMENT
  // =====================================
  async processPayment(
    order: any,
    customerInfo: any
  ) {
    return new Promise(
      async (resolve) => {
        console.log(
          'Opening Fake Razorpay Checkout...'
        );

        // =====================================
        // SIMULATED PAYMENT SCREEN DELAY
        // =====================================
        setTimeout(async () => {
          try {
            // =================================
            // VERIFY PAYMENT
            // =================================
            const verifyRes =
              await fetch(
                `${BASE_URL}/verify-payment`,
                {
                  method: 'POST',

                  headers: {
                    'Content-Type':
                      'application/json',
                  },

                  body: JSON.stringify(
                    {
                      razorpay_order_id:
                        order.id,

                      razorpay_payment_id:
                        'pay_' +
                        Date.now(),

                      razorpay_signature:
                        'fake_signature',
                    }
                  ),
                }
              );

            const verifyData =
              await verifyRes.json();

            if (
              verifyData.success
            ) {
              resolve({
                success: true,

                verified: true,

                orderId: order.id,

                paymentId:
                  'pay_' +
                  Date.now(),

                signature:
                  'fake_signature',
              });
            } else {
              resolve({
                success: false,

                verified: false,

                error:
                  'Payment verification failed',
              });
            }
          } catch (error: any) {
            resolve({
              success: false,

              error:
                error.message,
            });
          }
        }, 2500);
      }
    );
  }
}

export const razorpayService =
  new RazorpayService();