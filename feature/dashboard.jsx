"use client";


import { useState } from "react";
import { DashboardCustomize, Group, Paid } from "@mui/icons-material";
import { Grid, Paper, Typography, Box } from "@mui/material";
import DashboardCard from "../components/DashboardCard";
import CustomSelect from "../components/common/CustomSelect";

import { Area, AreaChart, Tooltip, XAxis, YAxis, Pie, PieChart } from 'recharts';

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

  const userData = [
    { name: 'Male', value: 2, fill: '#0088FE' },
    { name: 'Female', value: 2, fill: '#00C49F' },
    { name: 'Other', value: 0, fill: '#FFBB28' },
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


        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper sx={{ backgroundColor: "#fff", borderRadius: "8px", px: 2, py: 3, mt: 2, color: "#070707" }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }} alignItems="center" >
              <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                  Sales Overview
                </Typography>
              </Box>
              <Box sx={{ minWidth: 120, mt: { xs: 2, sm: 0 } }}>
                <CustomSelect
                  options={options}
                  labelKey="label"
                  valueKey="value"
                  value={selectedRange}
                  onChange={(e) => setSelectedRange(e.target.value)}
                  label="Time Range"
                />
              </Box>
            </Grid>
            <AreaChart
              style={{ width: '100%', maxHeight: '45vh', aspectRatio: 1.618 }}
              responsive
              data={data}
              onContextMenu={(_, e) => e.preventDefault()}
            >
              <XAxis dataKey="name" niceTicks="snap125" />
              <YAxis width="auto" niceTicks="snap125" />
              <Tooltip
               contentStyle={{
                  // backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  // border: 'none',
                  // color: '#fff'
                }}
              />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#39bc76" />
            </AreaChart>
          </Paper>
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper sx={{ backgroundColor: "#fff", borderRadius: "8px", px: 2, py: 3, mt: 2, color: "#070707" }}>
            <Box sx={{ mt: { xs: 2, sm: 0, } }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Users
              </Typography>
            </Box>
            <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '47vh', aspectRatio: 1 }} responsive>
              <Pie
                data={userData}
                innerRadius="80%"
                outerRadius="100%"
                // Corner radius is the rounded edge of each pie slice
                cornerRadius="50%"
                fill="#8884d8"
                // padding angle is the gap between each pie slice
                paddingAngle={5}
                dataKey="value"
                isAnimationActive={true}
              />
              <Tooltip
                contentStyle={{
                  // backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  // border: 'none',
                  // color: '#fff'
                }}
                // itemStyle={{ color: '#a7f3d0' }}
                // cursor={{ fill: 'transparent' }}
              />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>


    </>
  )
}

export default Dashboard;