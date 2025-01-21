import React, { useState, useEffect } from "react";
import { Button, Typography, CircularProgress, Box } from "@mui/material";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [currentTab, setCurrentTab] = useState("user");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // הגדר את כתובות ה-URL של השירותים ישירות
  const tabs = {
    user: {
      title: "User Service",
      endpoint: "http://13.61.3.70:5001/users",
    },
    menu: {
      title: "Menu Service",
      endpoint: "http://13.61.3.70:5002/menus",
    },
    order: {
      title: "Order Service",
      endpoint: "http://13.61.3.70:5003/orders",
    },
    payment: {
      title: "Payment Service",
      endpoint: "http://13.61.3.70:5004/payments",
    },
    notification: {
      title: "Notification Service",
      endpoint: "http://13.61.3.70:5005/notifications",
    },
    analytics: {
      title: "Analytics Service",
      endpoint: "http://13.61.3.70:5006/analytics",
    },
  };

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(tabs[currentTab].endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentTab]);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
        Microservices Dashboard
      </Typography>

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

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          Error: {error}
        </Typography>
      ) : (
        <Dashboard currentTab={currentTab} data={data} />
      )}
    </Box>
  );
};

export default App;
