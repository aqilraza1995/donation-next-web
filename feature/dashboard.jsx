"use client";


import { useState } from "react";
import { DashboardCustomize, Group, Paid } from "@mui/icons-material";
import { Grid, Paper, Typography, Box } from "@mui/material";
import DashboardCard from "../components/DashboardCard";
import CustomSelect from "../components/common/CustomSelect";

import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';

const Dashboard = () => {

const [selectedRange, setSelectedRange] = useState('7d');

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const options = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' }
];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
          <DashboardCard
            iconBackground="#27d095"
            icon={<Group sx={{ height: "40px", width: "40px", color: "#fff" }} />}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
          <DashboardCard
            iconBackground="#ff6b6b"
            icon={<Paid sx={{ height: "40px", width: "40px", color: "#fff" }} />}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
          <DashboardCard
            iconBackground="#4ecdc4"
            icon={<DashboardCustomize sx={{ height: "40px", width: "40px", color: "#fff" }} />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item size={{ xs: 12 }}>
          <Paper sx={{ backgroundColor: "#fff", borderRadius: "8px", px: 2, py:3, mt: 2, color: "#070707" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', fontFamily: "cursive" }}>
                Sales Overview
              </Typography>

              <CustomSelect
                options={options}
                labelKey="label"
                valueKey="value"
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                label="Time Range"
              />
            </Box>
            <AreaChart
              style={{ width: '100%',  maxHeight: '45vh', aspectRatio: 1.618 }}
              responsive
              data={data}
              onContextMenu={(_, e) => e.preventDefault()}
            >
              <XAxis dataKey="name" niceTicks="snap125" />
              <YAxis width="auto" niceTicks="snap125" />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#39bc76" />
            </AreaChart>
          </Paper>
        </Grid>
      </Grid>


    </>
  )
}

export default Dashboard;