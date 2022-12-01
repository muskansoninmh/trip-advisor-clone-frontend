import React from "react";
import HorizontalSlider from "./Layouts/HorizontalSlider";
import HorizontalSlider1 from "./Layouts/HorizontalSlider1";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

import ReactLoading from "react-loading";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import { Container } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import {
  storePlaceList,
  LoginValue,
  storeUnqiueStatePlaceList,
  storeTripAction,
  verifyTokenAction,
  resetPlaceListAction,
  LogoutValue,
} from "../Store/actions/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { slideInUp } from "react-animations";
import styled, { keyframes } from "styled-components";

import MenuBar from "./Layouts/MenuBar";
import { set } from "lodash-es";
import Geocode from 'react-geocode';

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "250px",
    [theme.breakpoints.up("sm")]: {
      height: "450px",
    },

    justifyContent: "center",
    "& .thumbs-wrapper": {
      display: "none",
    },
    "& .carousel-status": {
      display: "none",
    },
    "& .carousel .control-dots": {
      display: "none",
    },
    "& .carousel.carousel-slider .control-arrow ": {
      height: "350px",
      [theme.breakpoints.up("sm")]: {
        height: "450px",
      },
    },
  },
  background: {
    backgroundImage: "url(" + "../assets/images/Deer.jpg" + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    position: "relative",
    top: "-57px",
    paddingBottom: "200px",
  },
  container: {
    marginTop: "50px",
    width: "100%",
    maxWidth: "1580px",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    height: "133vh",
    marginBottom: "50px",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    marginRight: "-15px",
    marginLeft: "-15px",
    boxSizing: "border-box",
    marginTop: "80px",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5",
    color: " #9dacbb",
    textAlign: "left",
    height: "100%",
  },

  box1: {
    display: "flex",
    flexFlow: "wrap",
    justifyContent: "flex-end",
    animationDuration: "2s",
    animationDelay: "0.1s",
    visibility: "visible",
    animationFillMode: "both",
    animationName: "fadeInUp",
  },
  image1Content: {
    position: "absolute",
    animationDuration: "2s",
    animationDelay: "0.1s",
    top: "630px",
    left: "140px",
    color: "#fff",
    boxSizing: "border-box",
  },
  image2Content: {
    position: "absolute",
    animationDuration: "2s",
    animationDelay: "0.1s",
    top: "225px",
    left: "35px",
    color: "#fff",
    boxSizing: "border-box",
  },
  box2: {
    justifyContent: "flex-start",
    display: "flex",
    flexFlow: "wrap",
    marignTop: "299px",
    boxSizing: "border-box",
  },
  image3: {
    width: "590px",
    animationDuration: "2s",
    animationDelay: "0.3s",
    visibility: "visible",
    margin: "7px",
    // height: "200px",
    position: "relative",
    overflow: "hidden",
    top: "200px",
    transition: " .5s cubic-bezier(0, .18, .98, .6)",
  },
  image3Content: {
    animationDuration: "2s",
    animationDelay: "0.1s",
    position: "absolute",
    bottom: "30px",
    color: "#fff",
    left: "30px",
    visibility: "visible",
  },
  image4: {
    visibility: "visible",
    animationDuration: "2s",
    animationDelay: "0.4s",
    width: "450px",
    margin: "7px",
    position: "relative",
    overflow: "hidden",
    top: "200px",
    transition: ".5s cubic-bezier(0, .18, .98, .6)",
  },
  image4Content: {
    animationDuration: "2s",
    animationDelay: "0.1s",
    position: "absolute",
    bottom: "30px",
    left: "30px",
    color: "#fff",
    visibility: "visible",
  },
  planYourIternity: {
    marginLeft: "50px",
    marginRight: "50px",
    height: "300px",
    backgroundColor: "#65043a",
    marginTop: "100px",
    fontFamily: "standard",
  },
  planYourIternityHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "25px",
  },
  selection: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px",
    "& .MuiFormLabel-root": {
      color: "#fff",
    },
    "& .MuiNativeSelect-icon": {
      color: "#fff",
    },
    "& .MuiInput-underline": {
      "&::after": {
        borderBottom: "1px solid rgba(225, 225, 225, 0.42)",
      },
      "&::before": {
        borderBottom: "1px solid rgba(225, 225, 225, 0.42)",
      },
    },
    "& .MuiNativeSelect-select": {
      color: "#a0a0a0",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid rgba(225, 225, 225, 0.7)",
    },
  },
  button: {
    fontSize: "23px",
    color: "white",
    fontFamily: "standard",
    marginLeft: "500px",
    "& .MuiButton-label": {
      background: "white",
      border: "2px solid #fff",
      borderRadius: "50px",
      width: "130px",
      color: "#65043a",
      fontSize: "18px",
      padding: "2px 0",
      fontWeight: "500",
      textTransform: "capitalize",
    },
  },
}));

const breakpoints = [
  { width: 1, itemsToShow: 1 },
  { width: 558, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1280, itemsToShow: 4 },
];
const ZoomInAnimation = keyframes`${slideInUp}`;
const ZoomInDiv = styled.div`
  animation: 2s ${ZoomInAnimation};
`;

const MainContent = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [loading, setLoading] = React.useState(false);
  window.scrollTo(0, 0);




  React.useEffect(async () => {

    setLoading(true);



    if ((JSON.parse(localStorage.getItem("User")))?._id && (JSON.parse(localStorage.getItem("User")))?.role !== "Admin") {
      const verifyRes = await props.verifyTokenAction();
      if (
        verifyRes?.status === 200 &&
        (JSON.parse(localStorage.getItem("User")))?.role !== "Admin"
      ) {
        props.LoginValue();
        await props.storeTripAction();
      }
    } else {
      props.LogoutValue();
    }

    props.resetPlaceListAction();

    const resp = await props.storeUnqiueStatePlaceList();
    const res = await props.storePlaceList("", 10, 0, true);

    if (resp?.status === 200 || res?.status === 200 ) {
      console.log("gdfgdfg");
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <CssBaseline />
      <Header role="User" />
      <MenuBar />

      <div style={{ position: "relative", margin: "50px", height: 400 }}>
        <Carousel infiniteLoop autoPlay className={classes.carousel}>
          <div className={classes.image}>
            <img
              src="../assets/images/SLIDER1.jpg"
              alt="slider1"
              style={{
                height: "450px",
              }}
            ></img>
          </div>
          <div className={classes.image}>
            <img
              src="../assets/images/SLIDER2.jpg"
              alt="slider1"
              style={{
                height: "450px",
              }}
            ></img>
          </div>
          <div className={classes.image}>
            <img
              src="../assets/images/SLIDER3.jpg"
              alt="slider1"
              style={{
                height: "450px",
              }}
            ></img>
          </div>
          <div className={classes.image}>
            <img
              src="../assets/images/SLIDER4.jpeg"
              alt="slider1"
              style={{
                height: "450px",
              }}
            ></img>
          </div>
          <div className={classes.image}>
            <img
              src="../assets/images/SLIDER5.jpg"
              alt="slider1"
              style={{
                height: "450px",
              }}
            ></img>
          </div>
        </Carousel>
      </div>
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
          }}
        >
          <ReactLoading
            type="spinningBubbles"
            color="#000"
            height={100}
            width={100}
          />
        </div>
      )}
      {!loading && (
        <div>
          {" "}
          <div
            style={{
              margin: "20px",
              marginTop: "100px",
              marginLeft: "50px",
              marginBottom: "30px",
            }}
          >
            <Typography
              variant="h3"
              style={{
                fontFamily: "unset",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Destination You May Love
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "unset",
                color: "black",
              }}
            >
              Recommended based on your activity
            </Typography>
          </div>
          <div>
            <HorizontalSlider />
          </div>
          <div
            style={{
              margin: "20px",
              marginTop: "60px",
              marginLeft: "50px",
              marginBottom: "50px",
            }}
          >
            <Typography
              variant="h3"
              style={{
                fontFamily: "unset",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Top 10 Places
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontFamily: "unset",
                color: "black",
              }}
            >
              Recommended based on your ratings
            </Typography>
          </div>
          <div>
            <HorizontalSlider1 placeList={props.placeList} />
          </div>
        </div>
      )}
      <div
        style={{
          width: "100%",
          height: "370px",
          // backgroundColor: "skyblue",
          marginTop: "60px",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vacation.isLoggedIn,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,

    placeList: state.vacation.placeList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      storePlaceList,
      LoginValue,
      storeUnqiueStatePlaceList,
      storeTripAction,
      resetPlaceListAction,
      verifyTokenAction,
      LogoutValue,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
