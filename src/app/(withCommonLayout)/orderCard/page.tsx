"use client";

import { Box, Grid } from "@mui/material";
import { useGetAllCartQuery } from "@/redux/api/cartApi";
import { useAppSelector } from "@/redux/hook";
import PaymentMethods from "./paymentMethod";
import ItemList from "./itemList";
import Summary from "./summary";
import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import DeliveryOptions from "./deliveryOptions";

type TUser = {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
};

const OrderPage = () => {
  const [user, setUser] = useState<TUser>({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  });

  const [items, setItems] = useState([]);
  const [location, setLocation] = useState("Inside Dhaka");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [paymentId] = useState();

  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const { data: cartsData, isLoading } = useGetAllCartQuery(
    accessToken as string,
    {
      skip: !accessToken,
    }
  );

  useEffect(() => {
    if (cartsData && cartsData.length > 0) {
      const [{ name, email, contactNo, address, items }] = cartsData;

      setUser({
        name: name ?? "",
        email: email ?? "",
        contactNumber: contactNo ?? "",
        address: address ?? "",
      });

      setItems(items);
    }
  }, [cartsData]);
  console.log(user, "user from ordercard page");
  console.log(items, "items from ordercard page");

  if (isLoading) return <p>Loading...</p>;

  if (!items.length) {
    return (
      <Box className="p-4 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </Box>
    );
  }

  return (
    <Box className="p-4">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              p: 3,
              bgcolor: "white",
              mb: 3,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <UserCard
              user={user}
              setUser={setUser}
              location={location}
              setLocation={setLocation}
            />
          </Box>

          <Box sx={{ mb: 3 }} mt={3}>
            <DeliveryOptions
              location={location}
              deliveryOption={deliveryOption}
              setDeliveryOption={setDeliveryOption}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 3 }}>
            <PaymentMethods
              paymentOption={paymentOption}
              setPaymentOption={setPaymentOption}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <ItemList items={items} />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Summary
              items={items}
              deliveryOption={deliveryOption}
              user={user}
              location={location}
              paymentOption={paymentOption}
              paymentId={paymentId}
              cartsData={cartsData}
              accessToken={accessToken}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderPage;
