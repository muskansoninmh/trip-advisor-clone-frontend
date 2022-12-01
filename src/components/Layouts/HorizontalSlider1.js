import React from "react";
import { ReactDOM } from "react";
import { Box, CssBaseline } from "@material-ui/core";
import Card1 from "./Card1";
import { makeStyles } from "@material-ui/core";
// import { Carousel } from "react-responsive-carousel";
import Carousel from "react-elastic-carousel";

import { yellow } from "@material-ui/core/colors";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Title } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  Carousel: {
    "& .dIHkLE": {
      height: "0px",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
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
      "&:hover:enabled": {
        color: "black"
      },
      "&:focus:enabled": {
        color: "black"
      }
    },
    "& .rec-dot": {
      display: "none"
    },
    "& .rec-dot_active": {
      backgroundColor: "rgb(0 0 0)",
    },
  },
  card: {
    height: "350px",
    width: "350px",
    "&:hover": {
      height: "100px",
    },
  },
}));

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
const HorizontalSlider1 = (props) => {
  const classes = useStyles();

  return (
    <CssBaseline
      style={{
        marginLeft: "10px",
        width: "100%"
      }}
    >
      <div className={classes.App}>
        <Carousel breakPoints={breakPoints} className={classes.Carousel}>

          {props?.placeList.length > 0 && props?.placeList.map((row) => (


            <Card1 avatar={row?.avatar} name={row?.name} package={row?.package} id={row?._id} rating={row.averageRating} city={row.city.name} category={row.category}>

            </Card1>
          ))}



        </Carousel>
      </div>
    </CssBaseline>
  );
};
const mapPropsToValues = (state) => {
  return {
    // isLoggedIn: state.vacation.isLoggedIn,

    tripList: state.vacation.tripList,
    page: state.vacation.page,
    rowPerPage: state.vacation.rowPerPage,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(HorizontalSlider1);

