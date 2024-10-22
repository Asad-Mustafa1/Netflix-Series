import React from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; 

const CustomTextField = ({ name, label, ...props }) => (
  <Field name={name}>
    {({ field, form }) => (
      <TextField
        {...field}
        {...props}
        fullWidth
        label={label}
        error={Boolean(form.touched[name] && form.errors[name])}
        helperText={form.touched[name] && form.errors[name]}
        style={{ marginTop: 20 }}
        onChange={(e) => {
          form.handleChange(e);
          form.setFieldTouched(name, true, false);
          form.validateField(name);
        }}
      />
    )}
  </Field>
);

const Signup = () => {
  const paperStyle = {
    padding: 20,
    width: 500,
    margin: "0 auto",
    marginTop: "80px",
    marginBottom: "25px",
  };
  const headerStyle = { margin: 0 };

  const initialValues = {
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };

  const pakPhoneRegExp = /^((\+92|92|0)?3[0-9]{2}[0-9]{7}|(\+92|92|0)?[1-9][0-9]{1,3}[0-9]{7})$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^\S.*$/, "Name cannot start with a space")
      .min(3, "It's too short")
      .required("Required"),
    email: Yup.string().email("Enter a valid email").required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Required")
      .required("Required"),
    phoneNumber: Yup.string()
      .matches(pakPhoneRegExp, "Phone number is invalid")
      .required("Phone Number Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .test(
        "no-spaces",
        "Password cannot contain spaces",
        (value) => !/\s/.test(value)
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
    termsAndConditions: Yup.bool().oneOf(
      [true],
      "Accepting terms & conditions is required"
    ),
  });

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post('http://192.168.50.87:8000/signup', values);
      alert(response.data.message);
      resetForm();
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper style={paperStyle}>
        <Typography variant="h5" style={headerStyle}>
          Sign Up
        </Typography>
        <Typography variant="caption" gutterBottom>
          Please fill this form to create an account!
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomTextField name="name" label="Name" placeholder="Enter your name" />
              <CustomTextField name="email" label="Email" placeholder="Enter your email" />
              <FormControl component="fieldset" style={{ marginTop: 20 }}>
                <FormLabel component="legend">Gender</FormLabel>
                <Field name="gender">
                  {({ field }) => (
                    <RadioGroup
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  )}
                </Field>
                <FormHelperText error>
                  <ErrorMessage name="gender" />
                </FormHelperText>
              </FormControl>
              <CustomTextField name="phoneNumber" label="Phone Number" placeholder="Enter your phone number" />
              <CustomTextField name="password" type="password" label="Password" placeholder="Enter your password" />
              <CustomTextField name="confirmPassword" type="password" label="Confirm Password" placeholder="Confirm your password" />
              <FormControlLabel
                control={
                  <Field as={Checkbox} name="termsAndConditions" style={{ color: "rgba(38,126,130,1)" }} />
                }
                label="I accept the terms and conditions."
                style={{ marginTop: 20 }}
              />
              <FormHelperText error>
                <ErrorMessage name="termsAndConditions" />
              </FormHelperText>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                style={{
                  display: "block",
                  margin: "20px auto",
                  backgroundColor: "rgba(38,126,130,1)",
                }}
              >
                {isSubmitting ? "Loading..." : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signup;
