// TicketForm.js
import { Box, Button, Drawer, useTheme, IconButton } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { ticketValidationSchema } from "../../data/schema";
import AutoComplete from "../../components/AutoComplete";
import DatePicker from "../../components/DatePicker";
import Header from "../../components/Header";
import TextBox from "../../components/TextBox";
import TextArea from "../../components/TextArea";
import { tokens } from "../../theme";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const TicketForm = ({ isPanelOpen, handleClosePanel, initialValues }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = (values, actions) => {
    if (initialValues) {
      console.log("Updated Ticket", values);
    } else {
      console.log("Added New Ticket", values);
    }
    handleClosePanel(false);
  };

  return (
    <Drawer
      anchor="right"
      open={isPanelOpen}
      sx={{
        "& .MuiDrawer-paper": {
          width: "25%",
          padding: "30px 20px",
          background: colors.primary[400],
        },
      }}
      onClose={() => handleClosePanel(false)}
    >
      <Box>
        <Header
          title={initialValues ? "Update Ticket" : "Add Ticket"}
          subtitle={
            initialValues ? "Update an existing ticket" : "Add a new ticket"
          }
        />
        <IconButton
          onClick={() => handleClosePanel(false)}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Formik
        initialValues={
          initialValues || {
            title: "",
            assignee: "",
            status: "",
            dueDate: "",
            customer: "",
            customerEmail: "",
            description: "",
          }
        }
        validationSchema={ticketValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="title"
              component={TextBox}
              label="Title"
              placeholder="Enter title"
              value={values.title}
              onChange={handleChange}
              error={!!touched.title && !!errors.title}
              helperText={touched.title && errors.title}
              onBlur={handleBlur}
            />
            <Field
              name="assignee"
              component={AutoComplete}
              label="Assignee"
              options={[
                { label: "John Doe" },
                { label: "Jane Doe" },
                { label: "Alex Murphy" },
              ]}
              value={values.assignee}
              onChange={handleChange}
              error={Boolean(touched.assignee && errors.assignee)}
              helperText={touched.assignee && errors.assignee}
              onBlur={handleBlur}
            />
            <Field
              name="status"
              component={AutoComplete}
              label="Status"
              options={[
                { label: "open" },
                { label: "closed" },
                { label: "pending" },
              ]}
              value={values.status}
              onChange={handleChange}
              error={Boolean(touched.status && errors.status)}
              helperText={touched.status && errors.status}
              onBlur={handleBlur}
            />
            <Field name="created" component={DatePicker} label="Created At" />
            <Field
              name="customer"
              component={TextBox}
              label="Customer"
              placeholder="Enter customer name"
              value={values.customer}
              onChange={handleChange}
              error={Boolean(touched.customer && errors.customer)}
              helperText={touched.customer && errors.customer}
              onBlur={handleBlur}
            />
            <Field
              name="customerEmail"
              component={TextBox}
              label="Customer Email"
              placeholder="Enter customer email"
              value={values.customerEmail}
              onChange={handleChange}
              error={Boolean(touched.customerEmail && errors.customerEmail)}
              helperText={touched.customerEmail && errors.customerEmail}
              onBlur={handleBlur}
            />
            <Field
              component={TextArea}
              label="Description"
              placeholder="Enter description"
              value={values.description}
              onChange={handleChange}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
              name="description"
              onBlur={handleBlur}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  width: "50%",
                  mt: "10px",
                }}
              >
                {initialValues ? "Update Ticket" : "Add Ticket"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default TicketForm;
