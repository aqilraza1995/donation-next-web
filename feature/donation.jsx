"use client"

import { useState } from "react";
import CustomTable from "../components/common/CustomTable";
import { Box } from "@mui/material";
import CustomButton from "@/components/common/CustomButton";
import CustomDialog from "@/components/common/CustomDialog";
import CustomInput from "@/components/common/CustomInput";
import { CurrencyRupee } from "@mui/icons-material";

const Donation = () => {

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [open, setOpen] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const columns = [
    { label: "Donor Name", id: "donorName" },
    { label: "Amount", id: "amount" },
    { label: "Date", id: "date", stopSort: true },
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }} >
        <CustomButton label="Donate Now" onClick={() => setOpen(true)} />
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
        handleClose={() => setOpen(false)}
        title="Make a Donation"
        submitLabel="Donate now"
      >
        <CustomInput label="Amount" fullWidth size="small" type="number" position="start" icon={<CurrencyRupee />} />
        </CustomDialog>
    </Box>
  )
}

export default Donation;