"use client"

import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Typography, Link as MuiLink } from "@mui/material";

import CustomInput from "@/components/common/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import AuthCardContainer from "@/components/AuthContainerCard";

const ResetPasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: yup.object({
      password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required")
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });
  
  return (
    <AuthCardContainer title="Reset Password" imageUrl={"/images/reset-password.png"}>
      <CustomInput
        name="password"
        outerLabel="Password"
        placeholder="Enter your password"
        size="small"
        type="password"
        fullWidth
        onChange={formik.handleChange}
        value={formik.values.password}
        helperText={formik?.touched?.password && formik?.errors?.password ? formik?.errors?.password : ""}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <CustomInput
          name="confirmPassword"
          outerLabel="Confirm Password"
          placeholder="Confirm your password"
          size="small"
          fullWidth
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          helperText={formik?.touched?.confirmPassword && formik?.errors?.confirmPassword ? formik?.errors?.confirmPassword : ""}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <CustomButton
          label="Reset Password"
          fullWidth
          size="small"
          onClick={formik.handleSubmit}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2">
            Back to <Link href="/login" passHref><MuiLink sx={{ textDecoration: "none", color: "#ff8e29", fontWeight: "500" }}>Login</MuiLink></Link>
          </Typography>
        </Box>
      </Box>
    </AuthCardContainer>
  )
}

export default ResetPasswordForm;