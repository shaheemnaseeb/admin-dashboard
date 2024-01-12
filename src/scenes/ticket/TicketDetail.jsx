import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import Header from "../../components/Header";
import { mockDataTickets, mockTicketEmails } from "../../data/mockData";
import { useParams } from "react-router";
import { tokens } from "../../theme";
import TicketForm from "./TicketForm";
import EmailForm from "../email/EmailForm";

const TicketDetail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isUpdateItemPanelOpen, setOpenUpdateItemPanel] = useState(false);
  const handleUpdateTicketPanel = (panelState) => {
    setOpenUpdateItemPanel(panelState);
  };
  const [isAddEmailPanelOpen, setOpenAddEmailPanel] = useState(false);
  const handleAddEmailPanel = (panelState) => {
    setOpenAddEmailPanel(panelState);
  };
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({});
  const [emails, setEmails] = useState([]);
  useEffect(() => {
    setTicket(mockDataTickets.find((ticket) => ticket.id === Number(ticketId)));
    setEmails(
      mockTicketEmails.filter((email) => email.ticketId === Number(ticketId))
    );
  }, [ticketId]);

  return (
    <Box m="20px" height="65vh">
      <Header title={ticket.title} subtitle={`Ticket ID: ${ticket.id}`} />

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
              Description
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
              {ticket.description}
            </Box>
          </Grid>
        </Grid>
        <Grid mt={2} container spacing={2} alignItems="flex-start">
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Status
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box
              bgcolor={colors.greenAccent[400]}
              width="80px"
              p={1}
              borderRadius="15px"
              textAlign="center"
            >
              {ticket.status}
            </Box>
          </Grid>
        </Grid>
        <Grid mt={2} container spacing={2} alignItems="flex-start">
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Priority
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
              Assignee
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">{ticket.assignee}</Typography>
          </Grid>
        </Grid>
        <Grid mt={2} container spacing={2} alignItems="flex-start">
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Created
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={new Date(ticket.created).toLocaleDateString("en-CA", {
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
              Updated
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={new Date(ticket.updated).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
              readOnly
            />
          </Grid>
        </Grid>
        <Grid mt={2} container spacing={2} alignItems="flex-start">
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleUpdateTicketPanel(true)}
            >
              Update Ticket
            </Button>
          </Grid>
        </Grid>
        <Box
          p={2}
          mt={4}
          sx={{
            borderRadius: 4,
            border: "2px solid",
            borderColor: colors.greenAccent[400],
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h4">
            Email History
          </Typography>
          <Box
            sx={{
              overflow: "auto",
              maxHeight: "250px",
            }}
          >
            {emails.map((email) => (
              <Card key={email.id} sx={{ p: 2, mt: 2, borderRadius: 4 }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    From: {email.from}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2" component="div">
                    To: {email.to}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Subject: {email.subject}
                  </Typography>
                  <Typography variant="body2">{email.body}</Typography>
                </CardContent>
                <CardActionArea>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="div"
                    align="right"
                    pr={2}
                    color={colors.greenAccent[400]}
                  >
                    {new Date(email.created).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </Typography>
                </CardActionArea>
              </Card>
            ))}
          </Box>
          <Box mt={2} align="right">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleAddEmailPanel(true)}
            >
              Add Email
            </Button>
          </Box>
        </Box>
      </Box>
      <TicketForm
        handleClosePanel={handleUpdateTicketPanel}
        isPanelOpen={isUpdateItemPanelOpen}
        initialValues={ticket}
      />
      <EmailForm
        handleClosePanel={handleAddEmailPanel}
        isPanelOpen={isAddEmailPanelOpen}
        initialValues={ticket}
      />
    </Box>
  );
};

export default TicketDetail;
