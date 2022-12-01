import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Login from "./login";
import Signup from "./signUp";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Slide,
} from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeLoginDialogAction } from "../Store/actions/action";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  linkSignUp: {
    cursor: "ponter",

    "&:hover": {
      color: "gray",
      textDecoration: "underline",
    },
  },
  welcome: {

    color: "#000",
    fontWeight: "700",
    fontSize: "20px",
    [theme.breakpoints.up('sm')]: {
      fontSize: "28px",

    }

  },
  dialog: {
    "& .MuiPaper-root": {
      width: "500px",
      height: "600px"
    },
    "& .MuiDialogContent-root": {
      display: "flex",
      justifyContent: "center",
      // alignItems: "center",

    }
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SignInOutContainer = (props) => {
  console.log("pros", props);
  const classes = useStyles();
  const [signup, setSignup] = useState(false);

  return (
    <Dialog
      // style={{ height: "700px", width: "8900px" }}
      open={props.openLoginDialog}
      TransitionComponent={Transition}
      className={classes.dialog}
      keepMounted
      onClose={props.closeLoginDialogAction}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle style={{ paddingBottom: "0" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            marginBottom: "15px",
            justifyContent: "space-between",
          }}
        >
          <img
            src={window.location.origin + "/assets/images/tripadvisorLogo.png"}
            style={{
              height: "50px",
            }}
          />
          <Close onClick={props.closeLoginDialogAction} />
        </div>
        <div>
          <Typography
            className={classes.welcome}
          >
            Welcome Back
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent
        style={{ overflow: "hidden", padding: "0 20px 20px 20px" }}
      >
        {!signup && <Login />}
        {signup && <Signup />}
      </DialogContent>

      <div style={{ marginTop: "10px" }}>
        <Typography
          style={{
            fontSize: "0.7rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "cenetr",
            marginBottom: "15px",
          }}
        >
          <Typography
            style={{
              fontSize: "0.9rem",
              marginInlineStart: "25px",
              marginBottom: "20px",
            }}
          >
            Do you have an account ?
            {!signup && (
              <span
                className={classes.linkSignUp}
                onClick={() => {
                  setSignup(true);
                }}
              >
                Sign Up
              </span>
            )}
            {signup && (
              <span
                className={classes.linkSignUp}
                onClick={() => {
                  setSignup(false);
                }}
              >
                Login
              </span>
            )}
          </Typography>
          <span style={{ display: "flex", justifyContent: "center" }}>
            By proceeding, you agree to our Terms of Use and confirm
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            you have read our Privacy and Cookie Statement.
          </span>
        </Typography>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vacation.isLoggedIn,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
    openLoginDialog: state.vacation.openLoginDialog,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      closeLoginDialogAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInOutContainer);