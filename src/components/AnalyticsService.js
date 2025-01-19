import React from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// צבעים לגרף
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AnalyticsService = ({ data }) => {
  if (!data) {
    return (
      <Typography align="center" color="text.secondary" variant="h6">
        No analytics data available
      </Typography>
    );
  }

  // נתונים עבור הגרף
  const pieData = [
    { name: "Total Users", value: data.total_users },
    { name: "Total Orders", value: data.total_orders },
    { name: "Total Revenue", value: data.total_revenue },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Analytics Overview
      </Typography>

      <Grid container spacing={4}>
        {/* גרף עוגה */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" align="center">
              Data Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* טקסט נתונים */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Key Metrics
            </Typography>
            <Typography>Total Users: {data.total_users}</Typography>
            <Typography>Total Orders: {data.total_orders}</Typography>
            <Typography>Total Revenue: ${data.total_revenue}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsService;
