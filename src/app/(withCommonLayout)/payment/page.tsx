"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "@/redux/api/orderApi";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [createOrder] = useCreateOrderMutation();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) setOrderData(JSON.parse(decodeURIComponent(data)));
  }, [searchParams]);

  const handlePayment = async () => {
    // simulate payment success (you’ll integrate gateway here)
    const fakePaymentId = "BKASH123456"; // from gateway response

    const newOrder = {
      ...orderData,
      paymentId: fakePaymentId,
      status: "processing",
    };

    await createOrder(newOrder);

    alert("Payment successful! Order placed.");
    router.push("/order-success");
  };

  if (!orderData) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Complete Your Payment</h1>
      <p>Total: {orderData.total}৳</p>
      <p>Method: {orderData.paymentMethod}</p>
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
