"use client"

import { useState } from "react";
import CustomTable from "../components/common/CustomTable";
import { Box, IconButton } from "@mui/material";
import CustomButton from "@/components/common/CustomButton";
import { Visibility } from "@mui/icons-material";

const Users = () => {

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const columns = [
    { label: "Donor Name", id: "donorName" },
    { label: "Total Donation", id: "amount" },
    { label: "Last Donation", id: "date", stopSort: true },
    {label:"Action", id: "action", stopSort:true, render:(elm)=> <IconButton sx={{p:"0px"}} onClick={()=> console.log("elm ===>", elm)}><Visibility sx={{color:"orange"}}/></IconButton>}
  ];

  const data = [
    { donorName: "John Doe", amount: 100, date: "2024-01-01" },
    { donorName: "Jane Smith", amount: 50, date: "2024-01-02" },
    { donorName: "Alice Johnson", amount: 75, date: "2024-01-03" },
  ];

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
      {/* <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }} >
        <CustomButton label="Donate Now" />
      </Box> */}

      <CustomTable
        columns={columns}
        rows={data}
        onRequestSort={handleRequestSort}
        orderBy={orderBy}
        order={order}
      />
    </Box>
  )
}

export default Users;