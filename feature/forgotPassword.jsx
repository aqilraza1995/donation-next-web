"use client"

import Link from "next/link";
import * as yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { Box, Typography, Link as MuiLink } from "@mui/material";

import CustomInput from "@/components/common/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import AuthCardContainer from "@/components/AuthContainerCard";

const ForgotPasswordForm = () => {

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Email is required")
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <AuthCardContainer title="Forgot Password" imageUrl={"/images/forgot-password.png"}>
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
      <Box sx={{mt:2}}>
        <CustomButton
          label="Send Reset Link"
          fullWidth
          size="small"
          onClick={formik.handleSubmit}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2">
           Back to <Link href="/login" passHref><MuiLink sx={{ textDecoration: "none", color: "#ff8e29", fontWeight:"500" }}>Login</MuiLink></Link>
          </Typography>
        </Box>
      </Box>
    </AuthCardContainer>
  )
}

export default ForgotPasswordForm;