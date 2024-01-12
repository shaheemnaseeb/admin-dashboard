// validationSchema.js
import * as Yup from "yup";

const ticketValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  assignee: Yup.string().required("Assignee is required"),
  status: Yup.string().required("Status is required"),
  dueDate: Yup.date().required("Due Date is required"),
  customer: Yup.string().required("Customer is required"),
  customerEmail: Yup.string()
    .email("Invalid email")
    .required("Customer Email is required"),
  description: Yup.string().required("Description is required"),
});

const emailValidationSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required"),
  customerEmail: Yup.string()
    .email("Invalid email")
    .required("Customer Email is required"),
  customer: Yup.string().required("Customer is required"),
  ticketID: Yup.string().required("Link ticket is required"),
  body: Yup.string().required("Body is required"),
});

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const accountSchema = Yup.object().shape({
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  email: Yup.string().email("invalid email").required("required"),
  contact: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: Yup.string().required("required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("required"),
  password: Yup.string().required("required"),
});

export { ticketValidationSchema, emailValidationSchema, accountSchema, loginSchema };
