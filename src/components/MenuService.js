import React from "react";
import { Grid, Card, CardContent, Typography, CardMedia, Box } from "@mui/material";

// מאגר תמונות סטטי עם קישורים פעילים
const imageMap = {
  pizza: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
  burger: "https://upload.wikimedia.org/wikipedia/commons/8/89/RedDot_Burger.jpg",
  pasta: "https://upload.wikimedia.org/wikipedia/commons/d/d5/A_better_homemade_pasta.jpg",
  salad: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Rocket_lettuce%2C_Butternut_squash%2C_Beetroot%2C_Green_beans%2C_whipped_cream_salad.jpg",
  sushi: "https://upload.wikimedia.org/wikipedia/commons/5/56/Golden_Maki_Vegetarian_Dragon_sushi_roll.jpg",
  default: "https://via.placeholder.com/200x150?text=No+Image",
};

const MenuService = ({ data }) => {
  const menuData = Array.isArray(data) ? data : [];

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {menuData.map((menuItem, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              backgroundColor: "#fffdf7",
              borderRadius: 2,
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={menuItem.image || "https://via.placeholder.com/200x150?text=No+Image"}
              alt={menuItem.name || "Menu item"}
              sx={{
                borderRadius: "8px 8px 0 0",
                objectFit: "cover",
              }}
            />
            <CardContent>
              <Typography
                variant="h6"
                color="primary"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                {menuItem.name || "Unnamed Item"}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.1rem", textAlign: "center" }}
              >
                Price: <b>${menuItem.price || "N/A"}</b>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {menuData.length === 0 && (
        <Typography
          align="center"
          color="text.secondary"
          variant="h6"
          sx={{ width: "100%", mt: 4 }}
        >
          No menu items available.
        </Typography>
      )}
    </Grid>
  );
};

export default MenuService;
