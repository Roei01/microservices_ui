// src/App.js
import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dashboard from "./components/Dashboard";
import MainHeader from "./components/MainHeader";

/**
 * The main App component. It handles switching between microservices
 * (User, Menu, Order, etc.) and fetching data from the corresponding endpoints.
 */
const App = () => {
  const [currentTab, setCurrentTab] = useState("user");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // We'll store either an empty string (no error) or a message:
  const [error, setError] = useState("");

  // Define the service endpoints
  const tabs = {
    user: {
      title: "User Service",
      endpoint: "http://13.61.137.163:30001/users",
    },
    menu: {
      title: "Menu Service",
      endpoint: "http://13.61.137.163:30002/menus",
    },
    order: {
      title: "Order Service",
      endpoint: "http://13.61.137.163:30003/orders",
    },
    payment: {
      title: "Payment Service",
      endpoint: "http://13.61.137.163:30004/payments",
    },
    notification: {
      title: "Notification Service",
      endpoint: "http://13.61.137.163:30005/notifications",
    },
    analytics: {
      title: "Analytics Service",
      endpoint: "http://13.61.137.163:30006/analytics",
    },
  };

  /**
   * Fetch data from the selected tab’s endpoint.
   * If it succeeds, store the JSON result in 'data'.
   * If it fails, set an error message.
   */
  const fetchData = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(tabs[currentTab].endpoint);
      if (!response.ok) {
        throw new Error(`Service returned status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      // Provide a more user-friendly error message
      setError(
        "The service is not available right now. Please try again later."
      );
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * useEffect will re-run fetchData whenever 'currentTab' changes.
   */
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Always show the header at the top */}
      <MainHeader />

      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Microservices Dashboard
      </Typography>

      {/* Tabs (service buttons) */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        {Object.keys(tabs).map((tab) => (
          <Button
            key={tab}
            variant={currentTab === tab ? "contained" : "outlined"}
            color="primary"
            onClick={() => setCurrentTab(tab)}
          >
            {tabs[tab].title}
          </Button>
        ))}
      </Box>

      {/* Show a loading spinner, an error alert, or the fetched data */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        // If there's an error, display a friendly message in an Alert component
        <Box display="flex" justifyContent="center" mt={4}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError("");
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ maxWidth: 600 }}
          >
            {error}
          </Alert>
        </Box>
      ) : (
        // If no loading or error, show the main Dashboard
        <Dashboard currentTab={currentTab} data={data} />
      )}
    </Box>
  );
};

export default App;
