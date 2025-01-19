import React from "react";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";

const OrderService = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Typography
        align="center"
        color="text.secondary"
        variant="h6"
        sx={{ mt: 4, fontStyle: "italic" }}
      >
        No orders available
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#f8f9fa", borderRadius: 3 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 3, fontWeight: "bold", color: "#007bff" }}
      >
        Orders Overview
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(data).map(([id, order]) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card
              sx={{
                boxShadow: 4,
                borderLeft: "5px solid #007bff",
                backgroundColor: "#ffffff",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Order #{id}
                </Typography>
                <Typography variant="body1" sx={{ color: "#495057" }}>
                  Customer: <b>{order.customer_name}</b>
                </Typography>
                <Typography variant="body2" sx={{ color: "#6c757d" }}>
                  Menu ID: {order.menu_id}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6c757d" }}>
                  Quantity: {order.quantity || "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: order.status === "Completed" ? "green" : "orange",
                    fontWeight: "bold",
                  }}
                >
                  Status: {order.status || "Pending"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrderService;
