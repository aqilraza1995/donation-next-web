"use client"

import * as yup from "yup";
import moment from "moment";
import { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyRupee, Search } from "@mui/icons-material";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

import CustomTable from "../components/common/CustomTable";
import CustomButton from "@/components/common/CustomButton";
import CustomDialog from "@/components/common/CustomDialog";
import CustomInput from "@/components/common/CustomInput";
import { createDonation, getUserDonations } from "@/slice/donationSlice";

const Donation = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { donationData, loading } = useSelector(state => state.donation);

  const columns = [
    { label: "Date", id: "createdAt", render: (elm) => moment(elm?.createdAt).format("DD/MM/YYYY") },
    { label: "Amount", id: "amount" },
  ];

  const formik = useFormik({
    initialValues: {
      amount: "",
      order: "asc",
      orderBy: "",
      open: false
    },
    validationSchema: yup.object({
      amount: yup.number().required("Amount is required").positive("Amount must be positive").max(10000, "Amount cannot exceed 10,000"),
    }),
    onSubmit: async (values) => {
      try {
        formik?.setFieldValue('open', false);

        const res = await dispatch(createDonation(values.amount)).unwrap();
        if (res?.url) {
          window.location.href = res.url; // Isko lagaiye
        }
        toast.success(res?.message || "Donation successful!");
      } catch (error) {
        toast.error(error?.message || "An error occurred while processing the donation.");
      }
    }
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    formik?.setFieldValue('order', isAsc ? 'desc' : 'asc');
    formik?.setFieldValue('orderBy', property);
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        await dispatch(getUserDonations()).unwrap();
      } catch (error) {
        toast.error(error?.message || "An error occurred while fetching donations.");
      }
    };

    fetchDonations();
  }, [dispatch]);

  const { amount, order, orderBy, open } = formik?.values;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Grid container sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomButton
            label="Donate Now"
            onClick={() => formik?.setFieldValue('open', true)}
            fullWidth={isMobile ? true : false}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", justifyContent: isMobile ? "start" : "end", mt: isMobile ? 2 : 0 }}>
          <CustomInput
            placeholder={"Search..."}
            icon={<Search />}
            position="start"
            fullWidth={isMobile ? true : false}
          />
        </Grid>
      </Grid>

      <CustomTable
        columns={columns}
        rows={donationData}
        onRequestSort={handleRequestSort}
        orderBy={orderBy}
        order={order}
      />

      <CustomDialog
        open={open}
        handleClose={() => formik.resetForm()}
        title="Make a Donation"
        submitLabel="Donate now"
        handleSubmit={formik?.handleSubmit}
      >
        <CustomInput
          placeholder={"Amount"}
          fullWidth
          size="small"
          type="number"
          position="start"
          value={amount}
          onChange={(e) => formik?.setFieldValue('amount', e.target.value)}
          icon={<CurrencyRupee />}
          helperText={formik?.touched?.amount && formik?.errors?.amount ? formik?.errors?.amount : ""}
        />
      </CustomDialog>
    </Box>
  )
}

export default Donation;