import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { accountSchema } from "../../data/schema";
import { mockAccountData } from "../../data/mockData";
import { useState } from "react";

const AccountSetting = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    ...mockAccountData,
    confirmPassword: mockAccountData.password,
  };
  const handleFormSubmit = (values) => {
    console.log(values);
    setDisableMode(true);
  };
  const [disableMode, setDisableMode] = useState(true);

  return (
    <Box m="20px">
      <Header title="Account Setting" subtitle="Update your profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={
          initialValues || {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }
        }
        validationSchema={accountSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                  gridColumn: "span 4",
                  "& > img": {
                    width: "180px",
                    height: "180px",
                    borderRadius: "100%",
                    objectFit: "cover",
                  },
                }}
              >
                <img
                  src={`https://media.licdn.com/dms/image/D4E03AQG8YAFKS0uwzA/profile-displayphoto-shrink_200_200/0/1703021016968?e=1709164800&v=beta&t=hyEO5Utst5RK5Y9xI_RHpStscffuGeOxdvupyHErVgM`}
                  alt="profile"
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: "10px" }}
                  disabled={disableMode}
                >
                  Upload
                  <input type="file" hidden />
                </Button>
              </Box>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
                disabled={disableMode}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
                disabled={disableMode}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
                disabled={disableMode}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
                disabled={disableMode}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
                disabled={disableMode}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                onClick={() => setDisableMode(!disableMode)}
                sx={{ mr: "10px" }}
                color="primary"
                variant="contained"
              >
                Edit Profile
              </Button>
              <Button
                disabled={disableMode}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Update Profile
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AccountSetting;
