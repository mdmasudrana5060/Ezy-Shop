import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initPayment: build.mutation({
      query: (orderId: string) => {
        console.log(orderId);
        return {
          url: `/payment/init-payment/${orderId}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useInitPaymentMutation } = paymentApi;
