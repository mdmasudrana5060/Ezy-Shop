"use server";

export const register = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-customer`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );
  const customerInfo = res.json();
  console.log(customerInfo, "customer info");
  return customerInfo;
};
