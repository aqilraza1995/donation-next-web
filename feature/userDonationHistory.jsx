"use client"

import moment from "moment";
import { useEffect } from "react";
import { useFormik } from "formik";
import { Search } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

import { getUserById } from "@/slice/userSlice";
import CustomTable from "../components/common/CustomTable";
import CustomButton from "@/components/common/CustomButton";
import CustomInput from "@/components/common/CustomInput";

const UserDonationHistory = () => {

  const dispatch = useDispatch()
  const { id } = useParams();
  const router = useRouter()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { selectedUser } = useSelector(state => state?.user)
  const { userDetails, donations } = selectedUser

  const formik = useFormik({
    initialValues: {
      order: "asc",
      orderBy: "",
    },
  })

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    formik?.setFieldValue("order", isAsc ? 'desc' : 'asc')
    formik.setFieldValue("orderBy", property)
  };

  const columns = [
    { label: "Donation Date", id: "createdAt", render: (elm) => moment(elm?.createdAt).format("DD/MM/YYYY") },
    { label: "Donation Amount", id: "amount" },
  ];


  const DetailItem = ({ label, value }) => (
    <Grid size={{ xs: 12, md: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600, minWidth: { xs: "auto", sm: "140px" } }} >
          {label}
        </Typography>

        <Typography sx={{ color: "text.secondary", wordBreak: "break-word", flex: 1 }} >
          {value || "-"}
        </Typography>
      </Box>
    </Grid>
  );

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        await dispatch(getUserById(id)).unwrap();
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      }
    }
    fetchUserDetails()
  }, [])

  const { order, orderBy } = formik?.values;

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
      <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
        <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: 2 }} >
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}> User Details </Typography>
            <CustomButton label={"Back"} size="small" onClick={() => router.push("/users")} />
          </Box>
          <Grid container spacing={3}>
            <DetailItem label="Name :" value={userDetails?.name} />
            <DetailItem  label="Gender :" value={userDetails?.gender} />
            <DetailItem label="Mobile :" value={userDetails?.mobile} />
            <DetailItem label="Email :" value={userDetails?.email} />
            <DetailItem  label="Total Donation :" value={`₹${userDetails?.totalDonation || 0}`} />
            <DetailItem  label="Role :" value={userDetails?.role} />
          </Grid>
        </Paper>
      </Grid>

      <Grid container sx={{ width: "100%" }}>
        <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: isMobile ? "start" : "end" }}>
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
        rows={donations ?? []}
        onRequestSort={handleRequestSort}
        orderBy={orderBy}
        order={order}
      />
    </Box>
  )
}

export default UserDonationHistory;