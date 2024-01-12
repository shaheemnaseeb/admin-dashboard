import * as React from "react";
import { styled, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

const drawerWidth = 270;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        display: "flex",
      }}
    >
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mr="20px"
          >
            <Typography variant="h3">Support Hub</Typography>
          </Box>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {open && (
          <Box m="25px 0 25px 0">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={`https://media.licdn.com/dms/image/D4E03AQG8YAFKS0uwzA/profile-displayphoto-shrink_200_200/0/1703021016968?e=1709164800&v=beta&t=hyEO5Utst5RK5Y9xI_RHpStscffuGeOxdvupyHErVgM`}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
                color={colors.grey[100]}
              >
                Shaheem
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[300]}>
                VP Fancy Admin
              </Typography>
            </Box>
          </Box>
        )}

        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                handleNavigation("/");
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Typography
          variant="h6"
          sx={{ m: "15px 0 5px 20px", opacity: open ? 1 : 0 }}
          color={colors.grey[300]}
        >
          Pages
        </Typography>
        <List>
          {["Profile", "Emails", "Tickets"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={
                  index === 0
                    ? () => {
                        handleNavigation("/profile");
                      }
                    : index === 1
                    ? () => {
                        handleNavigation("/email");
                      }
                    : () => {
                        handleNavigation("/ticket");
                      }
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <PersonOutlineOutlinedIcon />
                  ) : index === 1 ? (
                    <EmailOutlinedIcon />
                  ) : (
                    <BugReportOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography
          variant="h6"
          sx={{ m: "15px 0 5px 20px", opacity: open ? 1 : 0 }}
          color={colors.grey[300]}
        >
          Reports
        </Typography>
        <List>
          {["Bar Chart", "Pie Chart", "Line Chart"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={
                  index === 0
                    ? () => {
                        handleNavigation("/bar-chart");
                      }
                    : index === 1
                    ? () => {
                        handleNavigation("/pie-chart");
                      }
                    : () => {
                        handleNavigation("/line-chart");
                      }
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <BarChartOutlinedIcon />
                  ) : index === 1 ? (
                    <PieChartOutlineOutlinedIcon />
                  ) : (
                    <TimelineOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
