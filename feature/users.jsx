"use client"

import { useEffect } from "react";
import { useFormik } from "formik";
import { Box, IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import CustomTable from "../components/common/CustomTable";
import { getUsers } from "@/slice/userSlice";

const Users = () => {

  const dispatch = useDispatch()
  const { users } = useSelector(state => state?.user)
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
    { label: "Donor Name", id: "name" },
    { label: "Last Donation", id: "lastDonationAmount", align: "center" },
    { label: "Last Donation", id: "lastDonationDate", stopSort: false },
    { label: "Total Donation", id: "totalDonation", align: "center" },
    {
      label: "Action",
      id: "action",
      stopSort: true,
      align: "center",
      render: (elm) => <IconButton sx={{ p: "0px" }} onClick={() => console.log("elm ===>", elm)}><Visibility sx={{ color: "orange" }} /></IconButton>
    }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(getUsers()).unwrap();
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      }
    }
    fetchUsers()
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
      <CustomTable
        columns={columns}
        rows={users}
        onRequestSort={handleRequestSort}
        orderBy={orderBy}
        order={order}
      />
    </Box>
  )
}

export default Users;