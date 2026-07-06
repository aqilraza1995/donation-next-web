"use client"

import * as yup from "yup";
import { useEffect } from "react";
import {useRouter} from "next/navigation";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { CurrencyRupee } from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";

import CustomTable from "../components/common/CustomTable";
import CustomButton from "@/components/common/CustomButton";
import CustomDialog from "@/components/common/CustomDialog";
import CustomInput from "@/components/common/CustomInput";
import { createDonation, getUserDonations } from "@/slice/donationSlice";

const Donation = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const {donationData, loading} = useSelector(state => state.donation);
  const columns = [
    { label: "Donor Name", id: "donorName" },
    { label: "Amount", id: "amount" },
    { label: "Date", id: "date", stopSort: true },
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
    onSubmit: async(values) => {
      try {
          console.log("Donation submitted", values.amount);
      formik?.setFieldValue('open', false);

      const res = await dispatch(createDonation(values.amount)).unwrap();
        console.log("Donation response URL", res);
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


  const data = [
    { donorName: "John Doe", amount: 100, date: "2024-01-01" },
    { donorName: "Jane Smith", amount: 50, date: "2024-01-02" },
    { donorName: "Alice Johnson", amount: 75, date: "2024-01-03" },
  ];

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await dispatch(getUserDonations()).unwrap();
        console.log("Fetched donations", res);
      } catch (error) {
        toast.error(error?.message || "An error occurred while fetching donations.");
      }
    };

    fetchDonations();
  }, [dispatch]);

  console.log("Donation component state", { donationData, loading, formikValues: formik.values });

  const {amount, order, orderBy, open} = formik?.values;

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
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }} >
        <CustomButton label="Donate Now" onClick={() => formik?.setFieldValue('open', true)} />
      </Box>

      <CustomTable
        columns={columns}
        rows={data}
        onRequestSort={handleRequestSort}
        orderBy={orderBy}
        order={order}
      />

      <CustomDialog
        open={open}
        handleClose={()=> formik.resetForm()}
        title="Make a Donation"
        submitLabel="Donate now"
        handleSubmit={formik?.handleSubmit}
      >
        <CustomInput
          label="Amount"
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