import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  TextField,
} from "@mui/material";
import Header from "../../components/Header";
import { mockTicketEmails, mockDataTickets } from "../../data/mockData";
import { useParams } from "react-router";
import { tokens } from "../../theme";

const EmailDetail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { emailId } = useParams();
  const [email, setEmail] = useState({});
  const [ticket, setTicket] = useState({});
  useEffect(() => {
    const foundEmail = mockTicketEmails.find(
      (email) => email.id === Number(emailId)
    );
    setEmail(foundEmail);

    if (foundEmail) {
      const foundTicket = mockDataTickets.find(
        (ticket) => ticket.id === Number(foundEmail.ticketId)
      );
      setTicket(foundTicket);
    }
  }, [emailId]);

  return (
    <Box m="20px">
      <Header title={email.subject} subtitle={`Ticket ID: ${ticket.id}`} />

      <Box
        p={2}
        height="82vh"
        overflow="auto"
        bgcolor={colors.primary[400]}
        borderRadius={4}
      >
        <Grid mt={2} container spacing={2} alignItems="flex-start">
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Ticket Priority
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box
              bgcolor={
                ticket.priority === "low"
                  ? "#808080"
                  : ticket.priority === "medium"
                  ? "#ff9800"
                  : "#f44336"
              }
              width="80px"
              p={1}
              borderRadius="15px"
              textAlign="center"
            >
              {ticket.priority}
            </Box>
          </Grid>
        </Grid>
        <Grid mt={2} container spacing={2} alignItems="flex-start">
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Ticket Assignee
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">{ticket.assignee}</Typography>
          </Grid>
        </Grid>
        <Grid mt={2} container spacing={2} alignItems="flex-start">
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Customer Name
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">{ticket.customer}</Typography>
          </Grid>
        </Grid>
        <Grid mt={2} container spacing={2} alignItems="flex-start">
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Email creation
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={new Date(email.created).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
              readOnly
            />
          </Grid>
        </Grid>
        <Grid mt={2} container spacing={2} alignItems="flex-start">
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Email Body
            </Typography>
          </Grid>
          <Grid item xs={8} sx={{ overflow: "auto", maxHeight: "150px" }}>
            <Box
              p={2}
              sx={{
                borderRadius: 4,
                border: "2px solid",
                borderColor: colors.greenAccent[400],
              }}
              variant="h5"
            >
              {email.body}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EmailDetail;
