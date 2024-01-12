import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { mockTicketEmails, mockDataTickets } from "../../data/mockData";
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const calculateSentEmailOnTicketPercentage = () => {
    let list = mockTicketEmails.filter(
      (email, index, self) =>
        index === self.findIndex((t) => t.ticketId === email.ticketId)
    );
    return list.length / mockDataTickets.length;
  };

  const calculateTicketsBasedOnStatus = (status) => {
    return mockDataTickets.filter((ticket) => ticket.status === status).length;
  };

  // Sort the tickets by the created date in descending order
  let recentTickets = [...mockDataTickets]
    .sort((a, b) => new Date(b.updated) - new Date(a.updated))
    .slice(0, 10);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={mockTicketEmails.length}
            subtitle="Emails Sent on Tickets"
            progress={calculateSentEmailOnTicketPercentage()}
            increase={calculateSentEmailOnTicketPercentage() * 100 + "%"}
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={calculateTicketsBasedOnStatus("open")}
            subtitle="Open Tickets"
            progress={
              calculateTicketsBasedOnStatus("open") / mockDataTickets.length
            }
            increase={
              (calculateTicketsBasedOnStatus("open") / mockDataTickets.length) *
                100 +
              "%"
            }
            icon={
              <PlayCircleFilledWhiteIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={calculateTicketsBasedOnStatus("closed")}
            subtitle="Closed Tickets"
            progress={
              calculateTicketsBasedOnStatus("closed") / mockDataTickets.length
            }
            increase={
              (calculateTicketsBasedOnStatus("closed") /
                mockDataTickets.length) *
                100 +
              "%"
            }
            icon={
              <CheckCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={calculateTicketsBasedOnStatus("pending")}
            subtitle="Pending Tickets"
            progress={
              calculateTicketsBasedOnStatus("pending") / mockDataTickets.length
            }
            increase={
              (calculateTicketsBasedOnStatus("pending") /
                mockDataTickets.length) *
                100 +
              "%"
            }
            icon={
              <PendingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Ticket Status Overview
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {mockDataTickets.length}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Tickets
            </Typography>
          </Box>
          {recentTickets.map((ticket, i) => (
            <Box
              key={`${ticket.id}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {ticket.title}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {ticket.customer}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{ticket.created}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {ticket.status}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Ticket Priority
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChart />
          </Box>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Ticket Priority & Status
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
