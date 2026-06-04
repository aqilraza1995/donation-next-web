"use client"

import Link from "next/link";
import * as yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { Box, Typography, Link as MuiLink } from "@mui/material";

import CustomInput from "@/components/common/CustomInput";
import CustomButton from "@/components/common/CustomButton";
import AuthCardContainer from "@/components/AuthContainerCard";
import CustomSelect from "@/components/common/CustomSelect";

const SignUpForm = () => {

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: " Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      gender: "",
      email: "",
      password: ""
    },
    validationSchema: yup.object({
      name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
      phone: yup.string().matches(/^[0-9]{10}$/, "Invalid phone number").required("Phone number is required"),
      gender: yup.string().required("Gender is required"),
      email: yup.string().email("Invalid email address").required("Email is required"),
      password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <AuthCardContainer title="Sign Up" imageUrl={"/images/signup.png"}>
      <CustomInput
        name="name"
        outerLabel="Name"
        placeholder="Enter your name"
        size="small"
        fullWidth
        onChange={formik.handleChange}
        value={formik.values.name}
        helperText={formik?.touched?.name && formik?.errors?.name ? formik?.errors?.name : ""}
      />
      <CustomInput
        name="phone"
        outerLabel="Phone"
        placeholder="Enter your phone number"
        size="small"
        fullWidth
        onChange={formik.handleChange}
        value={formik.values.phone}
        helperText={formik?.touched?.phone && formik?.errors?.phone ? formik?.errors?.phone : ""}
      />
      {console.log("genderOptions :", genderOptions)}
      <CustomSelect
        name="gender"
        outerLabel="Gender"
        size="small"
        labelKey="label"
        valueKey="value"
        fullWidth
        options={genderOptions}
        onChange={formik.handleChange}
        value={formik.values.gender}
        helperText={formik?.touched?.gender && formik?.errors?.gender ? formik?.errors?.gender : ""}
      />
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
      </Box>
      <Box sx={{ mt: 2 }}>
        <CustomButton
          label="Sign Up"
          fullWidth
          size="small"
          onClick={formik?.handleSubmit}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2">
            Already have an account ?  <Link href="/login" passHref><MuiLink sx={{ textDecoration: "none", color: "#ff8e29", fontWeight: "500" }}>Login</MuiLink></Link>
          </Typography>
        </Box>
      </Box>
    </AuthCardContainer>
  )
}

export default SignUpForm;