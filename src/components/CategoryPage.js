import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "./Layouts/Header";
import styled, { keyframes } from "styled-components";
import { slideInUp } from "react-animations";
import MenuBar from "./Layouts/MenuBar";
import HorizontalSlider1 from "./Layouts/HorizontalSlider1";
import Footer from "./Layouts/Footer";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { storePlaceList, GetDataFromWikipediaAction, storeImageList, LoginValue, resetPlaceListAction, verifyTokenAction, LogoutValue } from "../Store/actions/action";
import ReactLoading from "react-loading";
import { Slide } from "@material-ui/core";

import ImageCarosuel from "./Layouts/ImageCarosuel";

const useStyles = makeStyles((theme) => ({

  mainTitle: {
    padding: "10px",
    fontWeight: "bold",
    fontFamily: "system-ui",
    [theme.breakpoints.up('sm')]: {
      fontSize: "30px",
    }
  },

  moreImagesDialog: {
    backgroundColor: "#ffffffd9",
    height: "900px",

    "& .MuiDialog-paperWidthSm": {
      maxWidth: "800px",
    },
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "600px",

      position: "absolute",
      top: 0
    },
    "& .MuiDialogContent-root:first-child": {
      overflowX: "hidden"
    },
    "& .carousel-status": {
      display: "none",
    },
  },
  column1: {
    height: "100%",
    width: "60%",
    margin: "1px",
    "& .MuiButton-label": {
      height: "100%",
    },
  },
  column2: {
    height: "100%",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    margin: "1px",
    "& .MuiButton-label ": {
      height: "100%",
    },
  },
  column2Div: {
    height: "50%",
    backgroundColor: "violet",
    width: "100%",
  },
  imageDiv: {
    height: "230px",
    margin: "30px",
    display: "flex",
    [theme.breakpoints.up('sm')]: {
      height: "430px",
    }
  },
  button: {
    background: "white",
    color: "black",
    width: "150px",
    borderRadius: "15px",
    // marginInlineStart: "20px",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  paragraphDiv: {
    // height: "200px",
    margin: "40px 35px",
    width: "100",

  },
  paragraphHeading: {
    height: "40px",
    width: "100",
    fontSize: "30px",
    fontFamily: "system-ui",
  },
  paragrapgContent: {

    marginBottom: "20px",
    fontSize: "16px",
    lineHeight: "28px",

    marginTop: "20px",
    [theme.breakpoints.up('md')]: {
      height: "210px",
      width: "70%",
    },
    [theme.breakpoints.up('sm', 'md')]: {

      marginBottom: "20px",
    }
  },
  horizontalSlider: {
    height: "250px",
  },
  row: {

    marginTop: "10px",


    [theme.breakpoints.up('sm')]: {
      height: "350px",
      marginTop: "10px",

      display: "flex",
    }
  },
  columnLeft: {


    [theme.breakpoints.up('sm')]: {
      width: "25%",
    }
    // backgroundColor: "greenyellow"
  },
  columnRight: {

    marginTop: "10px",
    [theme.breakpoints.up('sm')]: {
      width: "75%",
    }
  },
  paragraph: {
    marginTop: "20px",
    fontFamily: "serif",
    fontSize: "20px",
  },
  carousel: {
    "& .carousel .thumbs": {
      width: "120px",
      height: "80px",
    },
    "& .carousel .thumbs-wrapper": {
      margin: "0px",
      marginTop: "10px"
    },
    "& .slider-wrapper": {
      height: "400px"
    },
    "& .slider": {
      height: "100%"
    }

  },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ZoomInAnimation = keyframes`${slideInUp}`;
const ZoomInDiv = styled.div`
  animation: 2s ${ZoomInAnimation};
`;
const CategoryPage = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [stateInfo, setStateInfo] = React.useState('');

  window.scroll(0, 0);
  const classes = useStyles();

  const getFirstPageExtract = jsonResponse => {
    // You should probably add some validathin here to make sure pages exists
    const pages = jsonResponse.query.pages;
    const pageIds = Object.keys(pages);
    // Here we only take the first response since we know there is only one.
    const firstPageId = pageIds.length ? pageIds[0] : null;
    const info = firstPageId ? pages[firstPageId].extract : null;
    const infoArray = info.split('.', 4);
    console.log(infoArray);
    return `${infoArray[0]} . ${infoArray[1]} . ${infoArray[2]} . ${infoArray[3]} .`
  };

  React.useEffect(async () => {

    window.scroll(0, 0);
    setLoading(true)
    const verifyRes = await props.verifyTokenAction();

    if (verifyRes?.status === 200 && (JSON.parse(localStorage.getItem("User")))?.role === "User") {

      props.LoginValue();


    }
    await props.resetPlaceListAction()

    const extract = await props.GetDataFromWikipediaAction(props.match.params.state);
    setStateInfo(getFirstPageExtract(extract));

    const res = await props.storeImageList(props.match.params.id)
    const hotelres = await props.storePlaceList(props.match.params.state, 5, 0, false, 'Hotels');
    if (hotelres.data.user.length < 5) {
      const holidayres = await props.storePlaceList(props.match.params.state, 5, 0, false, 'Holiday Homes');
      if (hotelres.data.user.length + holidayres.data.user.length < 5) {
        await props.storePlaceList(props.match.params.state, 5, 0, false, 'Package Holidays');
      }

    }

    await props.storePlaceList(props.match.params.state, 5, 0, false, 'Restaurants');
    const outingres = await props.storePlaceList(props.match.params.state, 5, 0, false, 'Outing Places');
    if (outingres.data.user.length < 5) {
      await props.storePlaceList(props.match.params.state, 5, 0, false, 'Religious');
    }

    if (res?.status === 200) {

      setLoading(false)
    }
  }, [])



  return (
    <div>
      <CssBaseline />
      <Header />
      {loading && <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "500px"
      }}>
        <ReactLoading type="spinningBubbles" color="#000" height={100} width={100} />
      </div>}
      {!loading && <div><div
        style={{
          // backgroundColor: "red",
          // display: "block",
          position: "relative",
          // zIndex: "10",
          top: "100px",
          margin: "0 35px",
          height: "40px",
          fontWeight: "bold",
        }}
      >
        <Typography className={classes.mainTitle}>

          <span style={{ color: "#ff5d5d" }}> EXPLORE</span>{" "}
          <span style={{ color: "black", textTransform: "uppercase" }}> {props.match.params.state}</span>

        </Typography>
      </div>
        <MenuBar />
        <ImageCarosuel placeList={props?.placeList} imageList={props?.imageList} categry={true} />
        <div
          className={classes.paragraphDiv}

        >
          <div
            className={classes.paragraphHeading}

          >
            <h2>
              <span style={{ color: "#ff5d5d" }}>ABOUT </span>
              <span style={{ color: "black", textTransform: "uppercase" }}>{props.match.params.state}</span>
            </h2>
          </div>
          <div
            className={classes.paragrapgContent}

          >
            <div dangerouslySetInnerHTML={{ __html: stateInfo }} />
          </div>
        </div>
        <div
          style={{
            height: "40px",
            margin: "0 35px",
            marginBottom: "30px",
            // backgroundColor: "yellow",
          }}
        >
          <Typography>
            <h2
              style={{
                fontSize: "30px",
                fontFamily: "system-ui",
              }}
            >
              <span style={{ color: "#ff5d5d" }}> ESSENTIAL </span>{" "}
              <span style={{ color: "black", textTransform: "uppercase" }}>{props.match.params.state}</span>
            </h2>
          </Typography>
        </div>
        <div
          style={{
            margin: "0 35px",
            marginBottom: "40px",
            // backgroundColor: "skyblue",
          }}
        >
          {props.placeList.filter((place) => place.category === 'Outing Places' || place.category === 'Religious').length > 0 && <div className={classes.row}>
            <div className={classes.columnLeft}>
              <div style={{ marginTop: "10px" }}>
                <Typography style={{ fontFamily: "system-ui" }}>
                  <h4>DO</h4>
                </Typography>
              </div>
              <p className={classes.paragraph}>
                Places to see, ways to wander, and signature experiences.
              </p>
            </div>
            <div className={classes.columnRight}>
              <HorizontalSlider1 placeList={props.placeList.filter((place) => place.category === 'Outing Places' || place.category === 'Religious')} />
            </div>
          </div>
          }
          {props.placeList.filter((place) => place.category === 'Hotels' || place.category === 'Holiday Homes').length > 0 && <div
            className={classes.row}

          >
            <div className={classes.columnLeft}>
              <div style={{ marginTop: "10px" }}>
                <Typography style={{ fontFamily: "system-ui" }}>
                  <h4>Stay</h4>
                </Typography>
              </div>
              <p className={classes.paragraph}>
                A mix of the charming, modern, and tried and true.
              </p>
            </div>
            <div className={classes.columnRight}>
              <HorizontalSlider1 placeList={props.placeList.filter((place) => place.category === 'Hotels' || place.category === 'Holiday Homes' || place.category === 'Package Holidays')} />
            </div>
          </div>}
          {props.placeList.filter((place) => place.category === 'Restaurants').length > 0 && <div
            className={classes.row}
            style={{
              marginTop: "15px",
            }}
          >
            <div className={classes.columnLeft}>
              <div style={{ marginTop: "10px" }}>
                <Typography style={{ fontFamily: "system-ui" }}>
                  <h4>EAT</h4>
                </Typography>
              </div>
              <p className={classes.paragraph}>
                Can't-miss spots to dine, drink, and feast.
              </p>
            </div>
            <div className={classes.columnRight}>

              <HorizontalSlider1 placeList={props.placeList.filter((place) => place.category === 'Restaurants')} />
            </div>
          </div>}
        </div>
      </div>}
      <Footer />
    </div>
  );
};
const mapPropsToValues = (state) => {
  return {
    // isLoggedIn: state.vacation.isLoggedIn,
    imageList: state.vacation.imageList,
    placeList: state.vacation.placeList,
    page: state.vacation.page,
    rowPerPage: state.vacation.rowPerPage,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
    isLoggedIn: state.vacation.isLoggedIn
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ storePlaceList, GetDataFromWikipediaAction, storeImageList, LoginValue, resetPlaceListAction, verifyTokenAction, LogoutValue }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(CategoryPage);