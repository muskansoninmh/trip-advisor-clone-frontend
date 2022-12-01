import React from "react";
import { ReactDOM } from "react";

import { Box, CssBaseline, Typography } from "@material-ui/core";

import Card from "./Card";
import { makeStyles } from "@material-ui/core";

import Carousel from "react-elastic-carousel";

import { storePlaceList } from "../../Store/actions/action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Carousel: {
    // "& .dIHkLE": {
    //   height: "250px",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   display: "flex",
    // },
    "& .sc-eCImPb": {
      height: "250px"
    }
  },
  App: {
    fontFamily: "sans-serif",
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
    "& .rec-arrow": {
      height: "0px",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
    "& .rec-dot": {
      display: "none"

    },
    "& .rec-dot_active": {
      backgroundColor: "rgb(0 0 0)",
    },
    card: {
      height: "250px",
      width: "250px",
      "&:hover": {
        opacity: 0.5,
      },
    },
  },
}));

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const HorizontalSlider = (props) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <CssBaseline
      style={{
        marginLeft: "10px",
      }}
    >
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints} className={classes.Carousel}>
          {props?.uniqueStatePlaceList.length > 0 && props?.uniqueStatePlaceList.map((row) => (
           
            <Card

              avatar={row?.avatar} state={row?._id} country={row?.country} id={row?.placeId} />
          ))}
        </Carousel>
      </div>
    </CssBaseline>
  );
};
const mapPropsToValues = (state) => {
  return {
    // isLoggedIn: state.vacation.isLoggedIn,
    uniqueStatePlaceList: state.vacation.uniqueStatePlaceList,

    page: state.vacation.page,
    rowPerPage: state.vacation.rowPerPage,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ storePlaceList }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(HorizontalSlider);
