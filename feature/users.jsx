"use client"

import { useCallback, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation"
import { Search, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";

import CustomTable from "../components/common/CustomTable";
import { getUsers } from "@/slice/userSlice";
import { useDebounce } from "@/hooks/useDebounce"
import CustomInput from "@/components/common/CustomInput";

const Users = () => {

  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { users } = useSelector(state => state?.user)
  const formik = useFormik({
    initialValues: {
      order: "asc",
      orderBy: "",
      page: 1,
      rowPerPage: 2,
      search: ""
    },
  })

  const { order, orderBy, rowPerPage, page, search } = formik?.values;

  const debouncedSearch = useDebounce(search, 500);

  const apiParams = useCallback(() => {
    const params = {
      page,
      rowPerPage,
    };

    if (debouncedSearch?.trim()) {
      params.search = debouncedSearch.trim();
    }

    if (orderBy) {
      params.order = order;
      params.orderBy = orderBy;
    }

    return params;
  }, [page, rowPerPage, order, orderBy, debouncedSearch]);

  const handleSearch = useCallback((evt) => {
    formik.setFieldValue("search", evt.target.value)
    formik.setFieldValue("page", 1)
  }, [formik]);



  const handleRequestSort = useCallback((event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    formik?.setFieldValue("order", isAsc ? 'desc' : 'asc')
    formik.setFieldValue("orderBy", property)
    formik.setFieldValue("page", 1)
  }, [formik, order, orderBy])

  const handleChangePage = useCallback((evt, newPage) => {
    formik.setFieldValue("page", newPage + 1);
  }, [formik])

  const handleChangeRowsPerPage = useCallback((evt) => {
    formik?.setFieldValue("rowPerPage", +evt.target.value)
    formik?.setFieldValue("page", 1)
  }, [formik])


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
      render: (elm) => <IconButton sx={{ p: "0px" }} onClick={() => router?.push(`/users/${elm?._id}`)}><Visibility sx={{ color: "orange" }} /></IconButton>
    }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const params = apiParams();
        await dispatch(getUsers(params)).unwrap();

      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    fetchUsers();
  }, [dispatch, apiParams]);


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
        <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: isMobile ? "start" : "end" }}>
          <CustomInput
            placeholder={"Search..."}
            icon={<Search />}
            position="start"
            fullWidth={isMobile ? true : false}
            onChange={handleSearch}
            value={search}
          />
        </Grid>
      </Grid>



      <CustomTable
        columns={columns}
        rows={users?.data || []}
        onRequestSort={handleRequestSort}
        orderBy={orderBy}
        order={order}
        count={users?.pagination?.totalRecords || 0}
        rowsPerPage={rowPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default Users;