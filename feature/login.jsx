"use client"

import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, Link as MuiLink } from "@mui/material";

import { login } from "@/slice/authSlice"
import CustomInput from "@/components/common/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import AuthCardContainer from "@/components/AuthContainerCard";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth)
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Email is required"),
      password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
    }),
    onSubmit: async (values) => {
      try {
        const res = await dispatch(login(values)).unwrap()
        toast.success(res?.message)
        router.push("/dashboard");
      } catch (error) {
        toast.error(error)
      }
    }
  });

  return (
    <AuthCardContainer title="Login" imageUrl={"/images/login.png"}>
      <CustomInput
        name="email"
        outerLabel="Email"
        placeholder="Enter your email"
        size="small"
        fullWidth
        onChange={formik.handleChange}
        value={formik.values.email}
        helperText={formik?.touched?.email && formik?.errors?.email ? formik?.errors?.email : ""}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <CustomInput
          name="password"
          outerLabel="Password"
          placeholder="Enter your password"
          size="small"
          fullWidth
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          helperText={formik?.touched?.password && formik?.errors?.password ? formik?.errors?.password : ""}
        />
        <Grid sx={{ display: "flex", justifyContent: "end" }}>
          {/* <Link href="/forgot-password" passHref >
            <MuiLink variant="body2" gutterBottom sx={{ textDecoration: "none", fontSize: "14px", fontWeight: "500", color: "#ff8e29" }}>
              Forgot Password
            </MuiLink>
          </Link> */}
          <Link
            href="/forgot-password"
            style={{
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
              color: "#ff8e29",
            }}
          >
            Forgot Password
          </Link>
        </Grid>
      </Box>
      <Box>
        <CustomButton
          label="Login"
          fullWidth
          size="small"
          onClick={formik?.handleSubmit}
          loading={loading}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2">
            Don't have an account ?  <Link href="/sign-up" sx={{ textDecoration: "none", color: "#ff8e29", fontWeight: "500" }}>Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </AuthCardContainer>
  )
}

export default LoginForm;