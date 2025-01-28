// src/components/MainHeader.js
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

// URLs for the two new services:
const DATE_TIME_URL = "http://13.61.137.163:30007/current-datetime";
const PENDING_ORDERS_URL = "http://13.61.137.163:30009/pending-orders-count";

const MainHeader = () => {
  // States for date/time and pending orders
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [pendingOrdersCount, setPendingOrdersCount] = useState("");

  // Function to fetch the current date/time
  const fetchCurrentDateTime = async () => {
    try {
      const res = await fetch(DATE_TIME_URL);
      if (!res.ok) {
        throw new Error("Failed to fetch current date/time");
      }
      const result = await res.json();
      setCurrentDateTime(result.currentDateTime);
    } catch (err) {
      console.error("Error fetching date/time:", err);
      // Display a fallback message
      setCurrentDateTime("Not available right now. Please try again later.");
    }
  };

  // Function to fetch the pending orders count
  const fetchPendingOrdersCount = async () => {
    try {
      const res = await fetch(PENDING_ORDERS_URL);
      if (!res.ok) {
        throw new Error("Failed to fetch pending orders count");
      }
      const result = await res.json();
      // We can store the numeric count, or convert it to a string
      setPendingOrdersCount(String(result.pendingOrders));
    } catch (err) {
      console.error("Error fetching pending orders:", err);
      // Display a fallback message
      setPendingOrdersCount("Not available right now. Please try again later.");
    }
  };

  // useEffect: run on mount + refresh every 30 seconds
  useEffect(() => {
    // Initial fetch
    fetchCurrentDateTime();
    fetchPendingOrdersCount();

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchCurrentDateTime();
      fetchPendingOrdersCount();
    }, 30000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // Gradient background
        background: "linear-gradient(to right, #3F51B5, #2196F3)",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px",
        mb: 3,
        boxShadow: 3,
      }}
    >
      {/* Left side - Pending Orders */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PendingActionsIcon sx={{ color: "#FFC107" }} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Pending Orders: {pendingOrdersCount}
        </Typography>
      </Box>

      {/* Right side - Date/Time */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <AccessTimeIcon sx={{ color: "#FFC107" }} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {currentDateTime}
        </Typography>
      </Box>
    </Box>
  );
};

export default MainHeader;
