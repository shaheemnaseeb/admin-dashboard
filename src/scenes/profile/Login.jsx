import React from "react";
import { Formik, Field } from "formik";
import { Box, Button, Container, TextField } from "@mui/material";
import { loginSchema } from "../../data/schema";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logoImage from "../../images/favicon.png";

const Login = ({ onLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    onLogin(values);
    navigate("/");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={2}
      >
        <img
          alt="logo"
          width="200px"
          height="200px"
          src={logoImage}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
      </Box>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Box
              sx={{
                marginBottom: 2,
              }}
            >
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.grey[400],
                    },
                    "&:hover fieldset": {
                      borderColor: colors.grey[400],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.greenAccent[400],
                    },
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                marginBottom: 2,
              }}
            >
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: colors.grey[400],
                    },
                    "&:hover fieldset": {
                      borderColor: colors.grey[400],
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.greenAccent[400],
                    },
                  },
                }}
              />
            </Box>
            <Button
              color="secondary"
              type="submit"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
