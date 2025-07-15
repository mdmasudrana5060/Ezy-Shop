"use server";

export const register = async (formData: FormData) => {
  const res = await fetch(`http://localhost:5001/api/v1/user/create-customer`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });
  const customerInfo = res.json();
  console.log(customerInfo, "customer info");
  return customerInfo;
};
