"use client";


import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { DashboardCustomize, Group, Paid } from "@mui/icons-material";
import { Area, AreaChart, Tooltip, XAxis, YAxis, Pie, PieChart, Legend } from 'recharts';

import DashboardCard from "../components/DashboardCard";
import CustomSelect from "../components/common/CustomSelect";
import { getDashboard, getDonationChartData } from "@/slice/dashboardSlice";
import CustomTable from "@/components/common/CustomTable";


const Dashboard = () => {
  const { role = "" } = useSelector(state => state?.auth?.loggedUser)
  const { dashboard } = useSelector(state => state?.dashboard)
  const [selectedRange, setSelectedRange] = useState(90);
  const dispatch = useDispatch();

  const columns = [
    { label: "Donor Name", id: "donorName" },
    { label: "Amount", id: "amount" },
    { label: "Date", id: "date", stopSort: true },
  ];


  const areaChartData = dashboard?.donationChartData ?? [];

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
    { label: 'Last 7 days', value: 7 },
    { label: 'Last 30 days', value: 30 },
    { label: 'Last 90 days', value: 90 }
  ];


  const hanldeChange = async (evt) => {
    console.log("evt.target.value ====>", evt.target.value)
    setSelectedRange(evt.target.value)
    const res = await dispatch(getDonationChartData(evt.target.value)).unwrap()
    console.log("component res ===> ", res)
  }

  const pieChartData = useMemo(() => {
    const userCount = dashboard?.userCount
    return [
      { name: 'Male', value: userCount?.male ?? 0, fill: '#0088FE' },
      { name: 'Female', value: userCount?.female ?? 0, fill: '#00C49F' },
      { name: 'Other', value: userCount?.other ?? 0, fill: '#FFBB28' },
    ]
  }, [dashboard])

  const cards = useMemo(() => {
    const totalUsersCard = {
      title: "Total Users",
      value: dashboard?.userCount?.total || 0,
      iconBackground: "#27d095",
      icon: <Group sx={{ height: "40px", width: "40px", color: "#fff" }} />,
    };
    const totalDonationsCard = {
      title: "Total Donations",
      value: dashboard?.totalDonationAmount || 0,
      iconBackground: "#ff6b6b",
      icon: <Paid sx={{ height: "40px", width: "40px", color: "#fff" }} />,
    };
    const notPaidUsersCard = {
      title: "Not Paid Users",
      value: dashboard?.zeroDonationUser || 0,
      iconBackground: "#4ecdc4",
      icon: <DashboardCustomize sx={{ height: "40px", width: "40px", color: "#fff" }} />,
    };

    return role === "admin" ? [totalUsersCard, totalDonationsCard, notPaidUsersCard] : [totalUsersCard, totalDonationsCard];
  }, [role, dashboard]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        await dispatch(getDashboard()).unwrap();
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      }
    }
    fetchDashboard()
  }, [])


  return (
    <>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item size={{ xs: 12, md: 6, lg: role === "admin" ? 4 : 6 }}>
            <DashboardCard
              key={index}
              iconBackground={card.iconBackground}
              icon={card.icon}
              title={card.title}
              value={card.value}
            />
          </Grid>
        ))}
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
                  // onChange={(e) => setSelectedRange(e.target.value)}
                  onChange={hanldeChange}
                  label="Time Range"
                />
              </Box>
            </Grid>
            <AreaChart
              style={{
                width: "100%",
                maxHeight: "45vh",
                aspectRatio: 1.618,
              }}
              data={areaChartData}
            >
              <XAxis dataKey="date" niceTicks="snap125" />

              <YAxis />

              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                }}
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#39bc76"
                fill="#39bc76"
              />
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
                data={pieChartData}
                innerRadius="80%"
                outerRadius="100%"
                cornerRadius="50%"
                paddingAngle={5}
                dataKey="value"
                isAnimationActive={true}
              />
              <Tooltip contentStyle={{ borderRadius: '8px', }} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  paddingTop: "20px",
                }}
              />
            </PieChart>
          </Paper>
        </Grid>

        <Grid item size={{ xs: 12 }} sx={{ mt: 2 }}>
          <Paper sx={{ backgroundColor: "#fff", borderRadius: "8px", px: 2, py: 3, mt: 2, color: "#070707" }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: "black" }}>
                Last 10 Donation
              </Typography>
            </Box>

            <CustomTable
              columns={columns}
              rows={[]}
            // onRequestSort={handleRequestSort}
            // orderBy={orderBy}
            // order={order}
            />
          </Paper>

        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard;