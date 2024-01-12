import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTickets } from "../../data/mockData";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketForm from "./TicketForm";

const priorityLevelComparator = (v1, v2) => {
  if (v1 === v2) return 0;
  if (v1 === "low") return -1;
  if (v1 === "medium") {
    if (v2 === "low") return 1;
    return -1;
  }
  if (v1 === "high") return 1;
};

const TicketList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [isAddItemPanelOpen, setOpenAddItemPanel] = useState(false);
  const handleAddPropertyPanel = (panelState) => {
    setOpenAddItemPanel(panelState);
  };
  const handleRowClick = (id) => {
    navigate(`/ticket/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "created", headerName: "Created", flex: 1 },
    { field: "updated", headerName: "Updated", flex: 1 },
    { field: "assignee", headerName: "Assigned", flex: 1 },
    { field: "status", headerName: "Status" },
    {
      field: "emailCount",
      headerName: "Email Count",
      type: "number",
    },
    { field: "stage", headerName: "Stage", type: "number" },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortComparator: priorityLevelComparator,
      renderCell: ({ row: { priority } }) => (
        // Chip
        <Box
          width="200px"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            priority === "low"
              ? "#808080"
              : priority === "medium"
              ? "#ff9800"
              : "#f44336"
          }
          borderRadius="4px"
        >
          <ReportProblemOutlinedIcon />
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {priority}
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box>
        <Header title="Ticket List" subtitle="Manage the Ticket List" />
      </Box>
      <Box display="flex" flex="1" justifyContent="flex-end">
        <Button
          onClick={() => handleAddPropertyPanel(true)}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Create New Ticket
        </Button>
      </Box>
      <Box
        m="20px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          // modify grid toolbar
          "& .MuiDataGrid-toolbarContainer": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-root": {
            color: colors.grey[100],
          },
        }}
      >
        <DataGrid
          rows={mockDataTickets}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          onRowClick={(row) => handleRowClick(row.id)}
        />
      </Box>
      <TicketForm
        handleClosePanel={handleAddPropertyPanel}
        isPanelOpen={isAddItemPanelOpen}
      />
    </Box>
  );
};

export default TicketList;
