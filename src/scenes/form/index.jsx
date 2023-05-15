import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const postReq =
  "http://localhost:3000/api/v1/dashboard/admin/createUser/:adminId";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(postReq, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        // Display success message or perform any additional actions
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        console.log("Error:", errorData);
        // Display error message or handle the error
      }
    } catch (error) {
      setErrorMessage("An error occurred");
      console.log("Error:", error);
      // Display error message or handle the error
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    licenseName: "",
    isPaymentDone: false,
    licenseValidity: "",
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    licenseName: yup.string().required("required"),
    isPaymentDone: yup.boolean().required("required"),
    licenseValidity: yup.number().required("required"),
  });

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
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
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="licenseName-label">License Name</InputLabel>
                <Select
                  labelId="licenseName-label"
                  id="licenseName"
                  value={values.licenseName}
                  name="licenseName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.licenseName && !!errors.licenseName}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
                {touched.licenseName && errors.licenseName && (
                  <FormHelperText error>{errors.licenseName}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="isPaymentDone-label">
                  Is Payment Done
                </InputLabel>
                <Select
                  labelId="isPaymentDone-label"
                  id="isPaymentDone"
                  value={values.isPaymentDone}
                  name="isPaymentDone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.isPaymentDone && !!errors.isPaymentDone}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
                {touched.isPaymentDone && errors.isPaymentDone && (
                  <FormHelperText error>{errors.isPaymentDone}</FormHelperText>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Admin"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.admin}
                name="admin"
                error={!!touched.admin && !!errors.admin}
                helperText={touched.admin && errors.admin}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Organisational Admin"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.organisationalAdmin}
                name="organisationalAdmin"
                error={!!touched.organisationalAdmin && !!errors.organisationalAdmin}
                helperText={touched.organisationalAdmin && errors.organisationalAdmin}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="signupType-label">Signup Type</InputLabel>
                <Select
                  labelId="signupType-label"
                  id="signupType"
                  value={values.signupType}
                  name="signupType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.signupType && !!errors.signupType}
                >
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="govermentInstituite">Government Institute</MenuItem>
                  <MenuItem value="companyInstituite">Company Institute</MenuItem>
                </Select>
                {touched.signupType && errors.signupType && (
                  <FormHelperText error>{errors.signupType}</FormHelperText>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="License Validity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.licenseValidity}
                name="licenseValidity"
                error={!!touched.licenseValidity && !!errors.licenseValidity}
                helperText={touched.licenseValidity && errors.licenseValidity}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {errorMessage && (
              <Box color="error.main" mt={2}>
                {errorMessage}
              </Box>
            )}
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;


