import { Platform } from 'react-native';

export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId?: string;
  description: string;

  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface PaymentResponse {
  success: boolean;

  paymentId?: string;

  orderId?: string;

  signature?: string;

  error?: string;

  method: 'razorpay' | 'phonepe';
}

class PaymentService {
  // ===================================
  // YOUR BACKEND URL
  // ===================================
  private API_URL =
    'http://10.37.67.96:5000';

  private razorpayKeyId =
    'rzp_test_uO9KUIRRmFD0rp';

  // ===================================
  // CREATE ORDER FROM BACKEND
  // ===================================
  async createOrder(
    amount: number
  ) {
    try {
      const response = await fetch(
        `${this.API_URL}/create-order`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            amount,
            currency: 'INR',
          }),
        }
      );

      return await response.json();
    } catch (error) {
      console.log(
        'Create Order Error:',
        error
      );

      throw error;
    }
  }

  // ===================================
  // VERIFY PAYMENT
  // ===================================
  async verifyPayment(data: any) {
    try {
      const response = await fetch(
        `${this.API_URL}/verify-payment`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(data),
        }
      );

      return await response.json();
    } catch (error) {
      console.log(
        'Verify Payment Error:',
        error
      );

      throw error;
    }
  }

  // ===================================
  // SEND EMAIL
  // ===================================
  async sendConfirmationEmail(
    email: string,
    doctorName: string,
    amount: number,
    consultationType: string
  ) {
    try {
      const response = await fetch(
        `${this.API_URL}/send-confirmation-email`,
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

      throw error;
    }
  }

  // ===================================
  // RAZORPAY PAYMENT
  // ===================================
  async processRazorpayPayment(
    request: PaymentRequest
  ): Promise<PaymentResponse> {
    try {
      // WEB PAYMENT FLOW
      if (Platform.OS === 'web') {
        return await this.processRazorpayWeb(
          request
        );
      }

      // MOBILE PAYMENT FLOW
      return await this.simulateRazorpayMobile(
        request
      );
    } catch (error: any) {
      console.log(
        'Razorpay Payment Error:',
        error
      );

      return {
        success: false,

        error:
          error.message ||
          'Payment failed',

        method: 'razorpay',
      };
    }
  }

  // ===================================
  // MOBILE PAYMENT MOCK
  // ===================================
  private async simulateRazorpayMobile(
    request: PaymentRequest
  ): Promise<PaymentResponse> {
    return new Promise(
      async (resolve) => {
        try {
          const orderResponse =
            await this.createOrder(
              request.amount
            );

          const order =
            orderResponse.order;

          // Simulate payment processing
          setTimeout(() => {
            resolve({
              success: true,

              paymentId: `pay_${Date.now()}`,

              orderId: order.id,

              signature: `sig_${Date.now()}`,

              method: 'razorpay',
            });
          }, 2000);
        } catch (error: any) {
          resolve({
            success: false,

            error:
              error.message ||
              'Payment failed',

            method: 'razorpay',
          });
        }
      }
    );
  }

  // ===================================
  // WEB RAZORPAY
  // ===================================
  private async processRazorpayWeb(
    request: PaymentRequest
  ): Promise<PaymentResponse> {
    return new Promise(
      async (resolve) => {
        try {
          const orderResponse =
            await this.createOrder(
              request.amount
            );

          const order =
            orderResponse.order;

          const loadScript = () => {
            return new Promise(
              (
                scriptResolve,
                scriptReject
              ) => {
                if (
                  window.Razorpay
                ) {
                  scriptResolve(true);

                  return;
                }

                const script =
                  document.createElement(
                    'script'
                  );

                script.src =
                  'https://checkout.razorpay.com/v1/checkout.js';

                script.onload = () =>
                  scriptResolve(true);

                script.onerror = () =>
                  scriptReject(
                    new Error(
                      'Razorpay SDK failed to load'
                    )
                  );

                document.body.appendChild(
                  script
                );
              }
            );
          };

          await loadScript();

          const options = {
            key: this.razorpayKeyId,

            amount: order.amount,

            currency: 'INR',

            name: 'PsyCare',

            description:
              request.description,

            order_id: order.id,

            prefill: {
              name:
                request.customerInfo
                  .name,

              email:
                request.customerInfo
                  .email,

              contact:
                request.customerInfo
                  .phone,
            },

            theme: {
              color: '#10b981',
            },

            handler: async (
              response: any
            ) => {
              try {
                const verify =
                  await this.verifyPayment(
                    response
                  );

                if (
                  verify.success
                ) {
                  resolve({
                    success: true,

                    paymentId:
                      response.razorpay_payment_id,

                    orderId:
                      response.razorpay_order_id,

                    signature:
                      response.razorpay_signature,

                    method:
                      'razorpay',
                  });
                } else {
                  resolve({
                    success: false,

                    error:
                      'Payment verification failed',

                    method:
                      'razorpay',
                  });
                }
              } catch (error) {
                resolve({
                  success: false,

                  error:
                    'Verification failed',

                  method:
                    'razorpay',
                });
              }
            },

            modal: {
              ondismiss: () => {
                resolve({
                  success: false,

                  error:
                    'Payment cancelled',

                  method:
                    'razorpay',
                });
              },
            },
          };

          const rzp =
            new window.Razorpay(
              options
            );

          rzp.on(
            'payment.failed',
            (response: any) => {
              resolve({
                success: false,

                error:
                  response.error
                    ?.description ||
                  'Payment failed',

                method:
                  'razorpay',
              });
            }
          );

          rzp.open();
        } catch (error: any) {
          resolve({
            success: false,

            error:
              error.message ||
              'Unable to start payment',

            method: 'razorpay',
          });
        }
      }
    );
  }
}

export const paymentService =
  new PaymentService();

declare global {
  interface Window {
    Razorpay: any;
  }
}