import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TicketList from "./scenes/ticket/TicketList";
import TicketDetail from "./scenes/ticket/TicketDetail";
import EmailList from "./scenes/email/EmailList";
import EmailDetail from "./scenes/email/EmailDetail";
import AccountSetting from "./scenes/profile/AccountSetting";
import Pie from "./scenes/charts/Pie";
import Bar from "./scenes/charts/Bar";
import Line from "./scenes/charts/Line";
import Login from "./scenes/profile/Login";
import { useState } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Logic to handle successful login
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic to handle logout
    setLoggedIn(false);
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <div className="app">
            {isLoggedIn && <Sidebar />}
            <main className="content">
              {isLoggedIn && <Topbar onLogout={handleLogout} />}
              <Routes>
                {!isLoggedIn && (
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                )}
                {isLoggedIn && (
                  <Route path="/profile" element={<AccountSetting />} />
                )}
                {isLoggedIn && (
                  <Route path="/" element={<Dashboard />} />
                )}
                {isLoggedIn && <Route path="/email" element={<EmailList />} />}
                {isLoggedIn && (
                  <Route path="/email/:emailId" element={<EmailDetail />} />
                )}
                {isLoggedIn && (
                  <Route path="/ticket" element={<TicketList />} />
                )}
                {isLoggedIn && (
                  <Route path="/ticket/:ticketId" element={<TicketDetail />} />
                )}
                {isLoggedIn && <Route path="/pie-chart" element={<Pie />} />}
                {isLoggedIn && <Route path="/bar-chart" element={<Bar />} />}
                {isLoggedIn && <Route path="/line-chart" element={<Line />} />}
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
