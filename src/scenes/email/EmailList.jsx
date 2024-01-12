import {
  Box,
  Typography,
  useTheme,
  Button,
  Card,
  CardContent,
  CardActions,
  Pagination,
  CardActionArea,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTicketEmails } from "../../data/mockData";
import Header from "../../components/Header";
import EmailForm from "./EmailForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [isAddItemPanelOpen, setOpenAddItemPanel] = useState(false);
  const handleAddPropertyPanel = (panelState) => {
    setOpenAddItemPanel(panelState);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 5;

  // Calculate the index of the first and last email on the current page
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = mockTicketEmails.slice(
    indexOfFirstEmail,
    indexOfLastEmail
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <Box m="20px">
      <Box>
        <Header title="Email List" subtitle="Manage the Emails here" />
      </Box>
      <Box display="flex" flex="1" justifyContent="flex-end">
        <Button
          onClick={() => handleAddPropertyPanel(true)}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Create New Email
        </Button>
      </Box>
      <Box
        m="20px 0 0 0"
        sx={{
          overflow: "auto",
          paddingRight: "20px",
        }}
        bgcolor={colors.primary[400]}
      >
        {currentEmails.map((email) => (
          <Card key={email.id} sx={{ m: "10px 0px 10px 10px" }}>
            <CardActionArea onClick={() => navigate(`/email/${email.id}`)}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {email.subject}
                </Typography>
                <Typography mt={2} variant="body2" component="p">
                  {email.body}
                </Typography>
              </CardContent>
              <CardActions sx={{ pl: "15px" }}>
                <Typography variant="body1" color="secondary" component="p">
                  {email.to}
                </Typography>
                <Typography variant="body1" color="secondary" component="p">
                  {email.from}
                </Typography>
              </CardActions>
            </CardActionArea>
          </Card>
        ))}
        {/* Implement pagination */}
        <Box display="flex" justifyContent="flex-end" m="10px 0px 10px 0px">
          <Pagination
            count={Math.ceil(mockTicketEmails.length / emailsPerPage)}
            color="secondary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
      <EmailForm
        isPanelOpen={isAddItemPanelOpen}
        handleClosePanel={handleAddPropertyPanel}
      />
    </Box>
  );
};

export default EmailList;
