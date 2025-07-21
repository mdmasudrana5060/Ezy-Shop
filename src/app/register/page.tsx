"use client";
import { modifyPayload } from "@/utils/modifyPayload";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { register } from "../service/actions/register";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { userLogin } from "../service/actions/userLogin";
import { storeUserInfo } from "../service/authService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "@/components/Form/CustomForm";
import CustomInput from "@/components/Form/CustomInput";

export const customerValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a valid gender",
  }),
  contactNumber: z
    .string()
    .regex(
      /^(\+88)?01[0-9]{9}$/,
      "Phone number must be in the format +8801XXXXXXXXX"
    ),
  address: z.string().min(1, "Please enter your address"),
});
export const validationSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  customer: customerValidationSchema,
});
export const defaultValues = {
  password: "",
  customer: {
    name: "",
    email: "",
    gender: "",
    contactNumber: "",
    address: "",
  },
};
const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);

    try {
      const res = await register(data);
      console.log(res, "res");

      if (res?.data?._id) {
        toast.success(res?.message);
        const response = await userLogin({
          email: values.customer.email,
          password: values.password,
        });
        console.log(response, "from response");

        if (response?.data?.accessToken) {
          toast.success("You logged in successfully");
          storeUserInfo({ accessToken: response?.data?.accessToken });
          // router.push("/dashboard");
        }
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
                Register
              </Typography>
            </Box>
          </Stack>
          <Box>
            <CustomForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item xs={12}>
                  <CustomInput
                    name="customer.name"
                    label="Name"
                    fullwidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomInput
                    name="customer.email"
                    label="Email"
                    fullwidth={true}
                    type="email"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomInput
                    name="password"
                    label="Password"
                    fullwidth={true}
                    type="password"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomInput
                    name="customer.gender"
                    label="Gender"
                    fullwidth={true}
                    select={true}
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other", value: "other" },
                    ]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomInput
                    name="customer.contactNumber"
                    label="Contact No"
                    fullwidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomInput
                    name="customer.address"
                    label="Address"
                    fullwidth={true}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  marging: "10px  0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={600}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </CustomForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};
export default RegisterPage;
