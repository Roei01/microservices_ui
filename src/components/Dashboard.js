import React from "react";
import { Typography } from "@mui/material"; // ייבוא Typography
import UserService from "./UserService";
import MenuService from "./MenuService";
import OrderService from "./OrderService";
import PaymentService from "./PaymentService";
import NotificationService from "./NotificationService";
import AnalyticsService from "./AnalyticsService";

const Dashboard = ({ currentTab, data }) => {
  if (!data) {
    return (
      <Typography align="center" color="text.secondary" variant="h6">
        No data available
      </Typography>
    );
  }

  switch (currentTab) {
    case "user":
      return <UserService data={data} />;
    case "menu":
      return <MenuService data={data} />;
    case "order":
      return <OrderService data={data} />;
    case "payment":
      return <PaymentService data={data} />;
    case "notification":
      return <NotificationService data={data} />;
    case "analytics":
      return <AnalyticsService data={data} />;
    default:
      return null;
  }
};

export default Dashboard;
