import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from '@mui/icons-material/Logout';
import { ColorModeContext } from "../../theme";
import { useNavigate } from "react-router-dom";

const Topbar = ({ onLogout }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate("/login")
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Icon Buttons */}
      <Box display="flex" flex="1" justifyContent="flex-end">
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{ p: "1" }}
          aria-label="light mode"
        >
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          sx={{ p: "1" }}
          aria-label="Profile"
          onClick={() => navigate("/profile")}
        >
          <PersonIcon />
        </IconButton>
        <IconButton onClick={handleLogout} sx={{ p: "1" }} aria-label="logout">
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
