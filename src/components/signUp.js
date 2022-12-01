import React from "react";
import { useHistory } from "react-router-dom";

import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import { registerUser, closeLoginDialogAction, errorMessageAction, resetErrorMessageAction } from "../Store/actions/action";

import { withFormik, Form } from "formik";

import * as yup from "yup";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    margin: "0",
    boxShadow: "none",
    width: "300px",
    [theme.breakpoints.up("sm")]: {
      width: "100%"
    }
  },
  formWrapper: {
    fontSize: "14px",
    marginTop: "1rem",

  },
  textfield: {
    // width: "300px",
    // height: "40px",
    "& .MuiOutlinedInput-input": {
      padding: "6px 10px",
      borderColor: "lightgray",
    },
  },
  button: {
    background: "black",
    color: "white",
    width: "200px",
    borderRadius: "15px",


    marginInlineStart: "20px",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    [theme.breakpoints.up("sm")]: {
      width: "200px",
      marginInlineStart: "120px",
    },
  },
  error: {
    color: "red",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center"
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: "600",
    marginBottom: "2px",
    [theme.breakpoints.up('sm')]: {
      marginBottom: "5px"
    }
  }
}));

const Signup = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = props;
  const customHandleChange = (e) => {
    props.resetErrorMessageAction();
    handleChange(e);

  };
  return (

    <Paper className={classes.paperStyle}>
      <Form className={classes.formWrapper} onSubmit={(e) => handleSubmit(e)}>
        <div
          style={{
            display: "flex",
            width: "100%",
            margin: "0px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginRight: "3px" }}>
            <Typography
              className={classes.label}
            >
              First Name
            </Typography>
            <TextField
              id="first_name"
              variant="outlined"
              size="small"
              // margin="dense"

              onChange={handleChange}
              value={values.first_name}
              onBlur={handleBlur}
              helperText={touched.first_name && errors.first_name}
              error={touched.first_name && errors.first_name}

              required
            />
          </div>
          <div >
            <Typography
              className={classes.label}
            >
              Last Name
            </Typography>

            <TextField
              id="last_name"
              variant="outlined"

              size="small"
              // margin="dense"
              onChange={handleChange}
              value={values.last_name}
              onBlur={handleBlur}
              helperText={touched.last_name && errors.last_name}
              error={touched.last_name && errors.last_name}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            margin: "0px",
            marginTop: "10px",
          }}
        >
          <div style={{ width: "100%" }}>
            <Typography
              className={classes.label}
            >
              Email
            </Typography>
            <TextField
              id="email"
              variant="outlined"

              size="small"
              // margin="dense"
              onChange={customHandleChange}
              value={values.email}
              onBlur={handleBlur}
              helperText={touched.email && errors.email}
              error={touched.email && errors.email}
              fullWidth
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            margin: "0px",
            marginTop: "10px",
          }}
        >
          <div style={{ width: "100%" }}>
            <Typography
              className={classes.label}
            >
              Password
            </Typography>
            <TextField
              id="password"
              variant="outlined"
              size="small"
              // margin="dense"
              onChange={handleChange}
              value={values.password}
              fullWidth
              type="password"
              onBlur={handleBlur}
              helperText={touched.password && errors.password}
              error={touched.password && errors.password}
            />
          </div>
        </div>
        <Typography className={classes.error}>
          {props.errorMessage}
        </Typography>
        <Button className={classes.button} type="submit">
          SignUp
        </Button>
      </Form>
    </Paper>

  );
};

const SignupWithFormik = withFormik({
  mapPropsToValues: () => {
    return {
      first_name: "",
      last_name: "",
      email: "",

      password: "",
    };
  },
  validationSchema: yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),

    password: yup.string().required("Password is required").min(8),
  }),
  handleSubmit: async (data, { props }) => {
    console.log(data, props);

    try {
      const res = await props.registerUser(data);
      console.log(res);
      if (!res) {
        props.closeLoginDialogAction();
      }
      else {
        props.errorMessageAction(res);
      }

    } catch (e) {
      props.errorMessagefn(e.response.data.error);
    }
  },
})(Signup);

const mapStateToProps = (state) => {
  return {
    errorMessage: state.vacation.errorMessage
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ registerUser, closeLoginDialogAction, errorMessageAction, resetErrorMessageAction }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupWithFormik);