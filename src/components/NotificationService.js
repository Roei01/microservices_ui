import React from "react";
import { Typography, Box, Grid, Card, CardContent, Avatar, IconButton } from "@mui/material";
import { NotificationsActive, CheckCircle, Error, Person } from "@mui/icons-material";

const NotificationService = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Typography align="center" color="text.secondary" variant="h6">
        No notifications available
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {Object.entries(data).map(([id, notification]) => (
        <Grid item xs={12} sm={6} md={4} key={id}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ backgroundColor: "#3f51b5", mr: 2 }}>
                  <NotificationsActive />
                </Avatar>
                <Typography variant="h6" color="primary">
                  Notification #{id}
                </Typography>
              </Box>

              <Typography variant="body1" color="text.primary" gutterBottom>
                <b>Message:</b> {notification.message}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <b>Recipient:</b> {notification.recipient}
              </Typography>

              {/* אייקון מותאם לפי מצב ההודעה */}
              <Box display="flex" alignItems="center" mt={2}>
                <IconButton>
                  {notification.status === "success" ? (
                    <CheckCircle color="success" />
                  ) : notification.status === "error" ? (
                    <Error color="error" />
                  ) : (
                    <Person color="action" />
                  )}
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {notification.status === "success"
                    ? "Delivered Successfully"
                    : notification.status === "error"
                    ? "Failed to Deliver"
                    : "Pending"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default NotificationService;
