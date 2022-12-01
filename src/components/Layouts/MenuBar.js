import React, { useEffect, useLayoutEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Button, IconButton, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Rotate from "react-reveal/Rotate";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { logoutUser, openSearchBoxAction } from "../../Store/actions/action";
import Carousel from "react-elastic-carousel";
import {
  ArrowForward,
  ArrowForwardIos,
  ConfirmationNumberOutlined,
  ForumOutlined,
  HomeOutlined,
  Hotel,
  HotelOutlined,
  RestaurantMenuOutlined,
} from "@material-ui/icons";
import SearchBox from "./SearchBox";

const useStyles = makeStyles((theme) => ({
  button: {
    background: "white",
    color: "black",

    minWidth: "200px",

    height: "50px",
    borderRadius: "10px",

    border: "1px solid black",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  Carousel: {
    "& .dIHkLE": {
      height: "0px",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },

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

  },
}));
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },


];

const MenuBar = (props) => {
  const [next, setNext] = useState(false)
  const classes = useStyles();
  const nextButton = () => {

    if (window.innerWidth < 1276) {
      setNext(true);
    }
    else {
      setNext(false);
    }
  }
  useEffect(() => {
    nextButton();
    window.addEventListener('resize', nextButton)
  }, [])
  console.log("dfdf", window.innerWidth);
  return (
    <div
      style={{
        display: "flex",
        marginTop: "107px",
        background: "white",
        marginBottom: "20px",
        paddingTop : "20px",
        // marginLeft: "20px",


        alignItems: "center",

      }}
    >


      <Carousel breakPoints={breakPoints} className={classes.Carousel} swipeScrollTolerance={1}>
        <Button className={classes.button} onClick={
          () => props.openSearchBoxAction("Hotels")
        }>
          HOTELS

          <HotelOutlined
            style={{
              marginLeft: "10px",
            }}
          />
        </Button>

        <Button className={classes.button} onClick={
          () => props.openSearchBoxAction("Holiday Homes")
        }>
          Holiday Homes

          <HomeOutlined
            style={{
              marginLeft: "10px",
            }}
          />
        </Button>

        <Button className={classes.button} onClick={
          () => props.openSearchBoxAction("Package Holidays")
        }>
          Package Holidays
          <ConfirmationNumberOutlined
            style={{
              marginLeft: "10px",
            }}
          />
        </Button>


        <Button className={classes.button} onClick={
          () => props.openSearchBoxAction("Restaurants")
        }>
          Restaurants
          <RestaurantMenuOutlined
            style={{
              marginLeft: "5px",
            }}
          />
        </Button>
        <Button className={classes.button} onClick={
          () => props.openSearchBoxAction("Religious")
        }>
          Religious
          <ForumOutlined
            style={{

              marginLeft: "10px",
            }}
          />
        </Button>

        <Button className={classes.button} onClick={
          () => props.openSearchBoxAction("Outing Places")
        }>
          Outing Places

          <ForumOutlined
            style={{
              marginLeft: "10px",
            }}
          />
        </Button>






      </Carousel>

      <SearchBox />

    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vacation.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logoutUser, openSearchBoxAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
