import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const UserService = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Typography
        align="center"
        color="text.secondary"
        variant="h6"
        sx={{
          mt: 4,
          fontStyle: "italic",
        }}
      >
        No users available
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: "90%",
        margin: "auto",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "#3f51b5",
        }}
      >
        User List
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#3f51b5" }}>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}
              >
                #
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}
              >
                Username
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}
              >
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(([id, user], index) => (
              <TableRow
                key={id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f3f3f3",
                  },
                  "&:hover": {
                    backgroundColor: "#f5f5ff",
                  },
                }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserService;
