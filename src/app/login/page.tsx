"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { userLogin } from "../service/actions/userLogin";
import { toast } from "sonner";
import { storeUserInfo } from "../service/authService";
import { useRouter } from "next/navigation";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import CustomForm from "@/components/Form/CustomForm";
import CustomInput from "@/components/Form/CustomInput";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);

      if (res?.data?.data?.accessToken) {
        toast.success("You logged in successfully");
        storeUserInfo({ accessToken: res?.data?.data?.accessToken });
        router.push("/dashboard");
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Box>
              <Image src={assets.} />
            </Box> */}
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login Ph Health Care
              </Typography>
            </Box>
          </Stack>
          <Box>
            <CustomForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid container spacing={2} my={1}>
                <Grid item xs={6}>
                  <CustomInput
                    name="email"
                    label="Email"
                    type="email"
                    fullwidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomInput
                    name="password"
                    label="Password"
                    type="password"
                    fullwidth={true}
                  />
                </Grid>
              </Grid>
              <Typography
                component="p"
                textAlign="end"
                margin="1px"
                fontWeight={600}
              >
                Forgot Password
              </Typography>
              <Button
                sx={{
                  marging: "10px  0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={600}>
                Do not have an account?
                <Link href="/register">Create an account</Link>
              </Typography>
            </CustomForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};
export default LoginPage;
