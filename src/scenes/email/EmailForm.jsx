// EmailForm.js
import {
  Box,
  Button,
  Drawer,
  useTheme,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { emailValidationSchema } from "../../data/schema";
import AutoComplete from "../../components/AutoComplete";
import Header from "../../components/Header";
import TextBox from "../../components/TextBox";
import TextArea from "../../components/TextArea";
import { tokens } from "../../theme";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const EmailForm = ({ isPanelOpen, handleClosePanel, initialValues }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = (values, actions) => {
    console.log("Added New Email", values);

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
        <Header title={"Add Email"} subtitle={"Add a new Email"} />
        <IconButton
          onClick={() => handleClosePanel(false)}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Formik
        initialValues={{
          subject: "",
          ticketID: initialValues?.title || "",
          customer: "",
          customerEmail: "",
          body: "",
        }}
        validationSchema={emailValidationSchema}
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
              name="subject"
              component={TextBox}
              label="Subject"
              placeholder="Enter Subject"
              value={values.subject}
              onChange={handleChange}
              error={!!touched.subject && !!errors.subject}
              helperText={touched.subject && errors.subject}
              onBlur={handleBlur}
            />
            <Field
              name="ticketID"
              component={AutoComplete}
              label="Ticket"
              options={[
                { label: "Ticket 1" },
                { label: "Ticket 2" },
                { label: "Ticket 3" },
              ]}
              value={values.ticketID}
              onChange={handleChange}
              error={Boolean(touched.ticketID && errors.ticketID)}
              helperText={touched.ticketID && errors.ticketID}
              onBlur={handleBlur}
            />
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
              label="Body"
              placeholder="Enter Body"
              value={values.body}
              onChange={handleChange}
              error={Boolean(touched.body && errors.body)}
              helperText={touched.body && errors.body}
              name="body"
              onBlur={handleBlur}
              rows={12}
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
                Add Email
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default EmailForm;
