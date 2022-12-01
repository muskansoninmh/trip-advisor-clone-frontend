import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { withFormik, Form, ErrorMessage } from "formik";
import * as yup from "yup";

import { closeLoginDialogAction, loginUser, LoginValue, errorMessageAction, resetErrorMessageAction } from "../Store/actions/action";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: "400px",
    height: "40px",
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
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const paperStyle = {
    margin: "0 auto",
    boxShadow: "none",
  };
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = props;
  const avatarStyle = { backgroundColor: "#4682B4" };
  const btnstyle = { margin: "30px 0" };

  const customHandleSubmit = async (e) => {
    await handleSubmit(e);


  };
  const customHandleChange = async (e) => {
    props.resetErrorMessageAction()
    await handleChange(e)
  }

  return (
    <div style={{ display: "inline-grid", alignItems: "center", width: "100%" }}>
      <Form autoComplete="off" onSubmit={customHandleSubmit} >
        <div style={{ marginTop: "15px" }}>
          <Typography
            style={{
              fontSize: "0.8rem",
              fontWeight: "600",
              marginBottom: "2px",
            }}
          >
            Email address
          </Typography>
          <TextField
            error={touched.email && errors.email}

            id="email"
            type="email"
            size="small"
            margin="dense"
            variant="outlined"
            onChange={customHandleChange}
            value={values.email}
            onBlur={handleBlur}
            helperText={touched.email && errors.email}
            fullWidth
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Typography
            style={{
              marginTop: "15px",
              fontSize: "0.8rem",
              fontWeight: "600",
              marginBottom: "2px",
            }}
          >
            Password
          </Typography>
          <TextField

            error={touched.password && errors.password}

            id="password"
            size="small"
            margin="dense"
            variant="outlined"
            onChange={customHandleChange}
            value={values.password}
            onBlur={handleBlur}
            helperText={touched.password && errors.password}
            type="password"
            fullWidth
            required
          />
        </div>
        <Typography className={classes.error}>
          {props.errorMessage}
        </Typography>
        <Button className={classes.button} type="submit">Login</Button>

      </Form>
    </div>
  );
};

const LoginWithFormik = withRouter(
  withFormik({
    mapPropsToValues: () => {
      return {
        email: "",
        password: "",
      };
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required").min(8),
    }),
    handleSubmit: async (data, { props }, setValues) => {
      console.log(data, props);

      try {
        const res = await props.loginUser(data);



        if (res.role === "Admin") {



          props.history.push("/admin");
          props.LoginValue();
          props.closeLoginDialogAction();


        } else if (res.role === "User") {

          props.LoginValue();
          props.closeLoginDialogAction();

        }
        else {
          props.errorMessageAction(res)
        }

      } catch (e) {
        props.errorMessageAction(e.response.data.error);
      }
    },
  })(Login)
);
const mapStateToProps = (state) => {
  return {
    recentLoggedInUser: state.vacation.recentLoggedInUser,
    errorMessage: state.vacation.errorMessage
  };
};
const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({ loginUser, LoginValue, closeLoginDialogAction, errorMessageAction, resetErrorMessageAction }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(LoginWithFormik);