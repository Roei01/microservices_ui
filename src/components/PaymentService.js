import React from "react";
import { Typography, Grid, Card, CardContent, Chip, Box } from "@mui/material";

const PaymentService = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Typography
        align="center"
        color="text.secondary"
        variant="h6"
        sx={{ mt: 4, fontStyle: "italic" }}
      >
        No payments available
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#f7faff", borderRadius: 3 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 3, fontWeight: "bold", color: "#28a745" }}
      >
        Payments Summary
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(data).map(([id, payment]) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card
              sx={{
                border: "1px solid #28a745",
                borderRadius: 3,
                boxShadow: 3,
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#28a745",
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  Payment #{id}
                </Typography>
                <Typography variant="body1" sx={{ color: "#495057" }}>
                  Order ID: {payment.order_id || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6c757d" }}>
                  Amount: $
                  {typeof payment.amount === "number"
                    ? payment.amount.toFixed(2)
                    : "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color:
                      payment.status === "Completed"
                        ? "green"
                        : payment.status === "Failed"
                        ? "red"
                        : "orange",
                  }}
                >
                  Status: {payment.status || "Unknown"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6c757d" }}>
                  Method: {payment.method || "N/A"}
                </Typography>
                <Chip
                  label={payment.status || "Unknown"}
                  color={
                    payment.status === "Completed"
                      ? "success"
                      : payment.status === "Failed"
                      ? "error"
                      : "warning"
                  }
                  sx={{
                    mt: 2,
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PaymentService;
