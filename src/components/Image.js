import React, { useEffect } from "react";
import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Box } from "@material-ui/core";
import Header from "./Layouts/Header";
import Accordian from "./Layouts/Accordian";
import { Button } from "@material-ui/core";
import {
  Add,
  Delete,
  Edit,
  Favorite,
  FavoriteBorder,
} from "@material-ui/icons";
import { Carousel } from "react-responsive-carousel";
import Footer from "./Layouts/Footer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  storePlaceAction,
  storeImageList,
  LoginValue,
  addTripAction,
  storePlaceList,
  resetPlaceListAction,
  openLoginDialogAction,
  openReviewBoxAction,
  deleteReviewAction,
  verifyTokenAction,
  LogoutValue,
  storeUserList,
} from "../Store/actions/action";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import ReviewDialogBox from "./Layouts/ReviewDialogBox";
import MenuCarousel from "react-elastic-carousel";
import {Image} from 'cloudinary-react'

const useStyles = makeStyles((theme) => ({
  linksDiv: {
    height: "50px",
    marginTop: "120px",
    position: "relative",
    borderTop: "1px solid grey",
    borderBottom: "1px solid grey",
    display: "flex",
    paddingTop: "10px",
    justifyContent: "space-evenly",
    alignItems: "center",
    "& .rec-arrow": {
      height: "0px",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      "&:hover:enabled": {
        color: "black",
      },
      "&:focus:enabled": {
        color: "black",
      },
    },

    "& .rec-dot": {
      display: "none",
    },
  },
  links: {
    color: "gray",
    "&:hover": {
      //   backgroundColor: "black",
      color: "#000000bd",
    },
  },
  cityHeading: {
    fontWeight: "bold",
    fontSize: "20px",
    [theme.breakpoints.up("md")]: {
      fontSize: "40px",
    },
    fontFamily: "system-ui",
  },
  button: {
    background: "white",
    width: "20px",
    height: "70%",
    color: "black",
    // width: "40px",
    borderRadius: "10px",
    marginInlineStart: "20px",
    border: "1px solid black",
    "&:hover": {
      // backgroundColor: "black",
      color: "red",
    },
    "& .MuiButton-label": {
      height: "40px",
    },
  },
  descCarouselColumn: {
    // height: "600px",
    width: "100%",
    marginTop: "20px",

    // backgroundColor: "magenta",
    display: "flex",
    flexDirection: "column-reverse",
    [theme.breakpoints.up("md")]: {
      flexDirection: "inherit",
      
    },
  },
  descDiv: {
    width: "100%",
    marginRight: "15px",
    height: "100%",
    borderRadius: "40px",
    padding: "20px",
    // backgroundColor: "blue",
    boxShadow: "rgb(35 35 35 / 11%) 4px 0px 9px 3px",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  description: {
    fontWeight: "bold",
    fontSize: "25px",
    // margin: "10px",
    // marginTop: "30px",

    fontFamily: "system-ui",
  },
  comment: { fontSize: "15px", fontFamily: "cursive", marginBottom: "10px" },
  commentor: {
    fontSize: "12px",
    fontFamily: "Raleway",
    display: "flex",
    fontSize: "1.2rem",
    fontWeight: "bold",
    textTransform: "capitalize",

    marginTop: "0px",
    marginLeft: "10px",
  },
  carousel: {
    width: "100%",
    "& .carousel .thumbs-wrapper": {
      margin: "5px 0",
      marginTop: "20px",
      display: "flex",
      
      justifyContent: "center",
    },
    "& .carousel .thumb": {
      // height: "70px",
      width: "100px !important",
      "& img": {
        height: "100%",
      },
    },
    "& .carousel .slider-wrapper.axis-horizontal .slider .slide": {
      height: "510px",
    },
    "& .carousel .slide img": {
      height: "100%",
    },
    
  },
  reviewButton: {
    background: "white",
    color: "black",
    minWidth: "100px",
    height: "40px",
    // marginTop: "30px",
    justifyContent: "flex-end",
    borderRadius: "15px",
    marginInlineStart: "20px",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  carouselDiv : {
    width : "100%",
    [theme.breakpoints.up("md")]: {
      width: "75%",
    },
  }
}));
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 200);
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 868, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
const Description = (props) => {
  window.scrollTo(0, 0);

  const [loading, setLoading] = React.useState(false);
  useEffect(async () => {
    window.scrollTo(0, 0);
    setLoading(true);
    const verifyRes = await props.verifyTokenAction();

    if (
      verifyRes?.status === 200 &&
      (JSON.parse(localStorage.getItem("User")))?.role === "User"
    ) {
      props.LoginValue();
    } else {
      props.LogoutValue();
    }
    await props.resetPlaceListAction();
    await props.storeUserList();
    const res = await props.storeImageList(props.match.params.id);
    const resp = await props.storePlaceAction(props.match.params.id);
    const respp = await props.storePlaceList(
      props.match.params.city,
      5,
      0,
      false,
      "Hotels"
    );
    if (respp?.data?.user?.length < 5) {
      await props.storePlaceList(
        props.match.params.city,
        5,
        0,
        false,
        "Restaurants"
      );
    }
    const outingResp = await props.storePlaceList(
      props.match.params.city,
      5,
      0,
      false,
      "Outing Places"
    );
    if (outingResp?.data?.user.length < 5) {
      await props.storePlaceList(
        props.match.params.city,
        5,
        0,
        false,
        "Religious"
      );
    }

    await props.storePlaceList(
      props.match.params.city,
      5,
      0,
      false,
      "Holiday Homes"
    );
    await props.storePlaceList(
      props.match.params.city,
      5,
      0,
      false,
      "Package Holidays"
    );

    if ( resp?.status === 200 ) {
      setLoading(false);
    }
  }, []);

  const myRef = React.createRef(null);
  console.log(myRef, "MYREF");
  const executeScroll = () => scrollToRef(myRef);

  const classes = useStyles();

  const user = props?.recentLoggedInUser;

  return (
    <div>
      <Header />

      <div className={classes.linksDiv}>
        <MenuCarousel breakPoints={breakPoints} swipeScrollTolerance={1}>
          <div>
            <a href="#" className={classes.links}>
              City Name
            </a>
          </div>
          <div>
            <a onClick={executeScroll} className={classes.links}>
              Hotels
            </a>
          </div>
          <div>
            <a onClick={executeScroll} className={classes.links}>
              Places to Visit
            </a>
          </div>
          <div>
            <a onClick={executeScroll} className={classes.links}>
              Restaurant
            </a>
          </div>
          <div>
            <a onClick={executeScroll} className={classes.links}>
              Holiday Homes
            </a>
          </div>
          <div>
            <a onClick={executeScroll} className={classes.links}>
              Package Holidays
            </a>
          </div>
        </MenuCarousel>
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
          <div style={{ height: "15px", margin: "0px 40px" }}>
            <Typography
              variant="h6"
              style={{
                color: "#000000bd",
                fontSize: "0.7rem",
                margin: "5px 10px",
              }}
            >
              {props.place.country?.name +
                ">" +
                props.place.state?.name +
                ">" +
                props.place.city?.name +
                ">" +
                props.place?.name}
            </Typography>
          </div>
          <div
            style={{
              margin: "35px",
            }}
          >
            <div
              style={{
                height: "60px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography className={classes.cityHeading}>
                <span>{props.place?.name}</span>
                <span>-{props.place.city?.name}</span>
              </Typography>
              {(!props.place.trip || !localStorage.getItem("Token")) && (
                <Button
                  className={classes.button}
                  onClick={() => {
                    if (localStorage.getItem("Token") && user.role === "User") {
                      props.addTripAction(props.place._id);
                    } else {
                      props.openLoginDialogAction();
                    }
                  }}
                >
                  <FavoriteBorder style={{ height: "50px", width: "2rem" }} />
                </Button>
              )}
              {props.place.trip && localStorage.getItem("Token") && (
                <Button
                  className={classes.button}
                  onClick={() => {
                    if (localStorage.getItem("Token") && user.role === "User") {
                      props.addTripAction(props.place._id);
                    } else {
                      props.openLoginDialogAction();
                    }
                  }}
                >
                  <Favorite
                    style={{ height: "50px", width: "2rem", color: "#e61818" }}
                  />
                </Button>
              )}
            </div>
            <div style={{ display: "flex" }}>
              <Box component="fieldset" borderColor="transparent">
                {console.log(props.place.averageRating)}
                <Rating
                  value={
                    props.place.averageRating ? props.place.averageRating : 0
                  }
                  readOnly
                  precision={0.1}
                />
              </Box>
              <Typography style={{ marginLeft: "10px" }}>
                {props.place?.reviews?.length || 0}
              </Typography>
            </div>
            <div className={classes.descCarouselColumn}>
              <div className={classes.descDiv}>
                <div className={classes.description}>DESCRIPTION</div>
                <div style={{ margin: "10px", maxHeight: "200px" }}>
                  <p>{props.place.description}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                >
                  <div className={classes.description}>
                    <Typography className={classes.description}>
                      Reviews - {props.place?.reviews?.length || 0} reviews
                    </Typography>
                  </div>
                  {props.place.reviews?.filter(
                    (plc) =>
                      plc.userId ===
                      user?._id
                  ).length === 0 &&
                    localStorage.getItem("Token") && (
                      <Button
                        className={classes.reviewButton}
                        onClick={() => {
                          if (
                            localStorage.getItem("Token") &&
                            user.role === "User"
                          ) {
                            props.openReviewBoxAction({ label: "ADD" });
                          } else {
                            props.openLoginDialogAction();
                          }
                        }}
                      >
                        <Edit />
                        Review
                      </Button>
                    )}
                </div>
                <ul
                  style={{
                    listStyleType: "none",
                    overflowY: "auto",
                    height: "250px",
                    marginTop: "5px",
                  }}
                >
                  {props.place.reviews?.map((review) => (
                    <li className={classes.comment}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex" }}>
                            <Avatar
                              src={`data:image/jpg;base64,${/^[A-Za-z0-9+/]+[=]{0,3}$/.test(
                                props.userList.filter(
                                  (user) => user._id === review.userId
                                )[0]?.avatar
                              )
                                ? props.userList.filter(
                                  (user) => user._id === review.userId
                                )[0]?.avatar
                                : Buffer.from(
                                  props.userList.filter(
                                    (user) => user._id === review.userId
                                  )[0]?.avatar
                                ).toString("base64")
                                }`}
                            />
                            <p className={classes.commentor}>
                              {
                                props.userList.filter(
                                  (user) => user._id === review.userId
                                )[0]?.first_name
                              }
                            </p>
                          </div>

                          <Typography
                            style={{
                              marginLeft: "50px",
                              marginTop: "-10px",
                            }}
                          >
                            {review?.review}
                          </Typography>
                          <Rating
                            value={review?.rating ? review?.rating : 0}
                            readOnly
                            size="small"
                            style={{
                              marginLeft: "50px",
                            }}
                          />


                        </div>
                        {review.userId ===
                          user?._id &&
                          localStorage.getItem("Token") &&
                          user.role === "User" && (
                            <div>
                              <IconButton
                                onClick={() =>
                                  props.openReviewBoxAction(
                                    { label: "EDIT" },
                                    review?._id
                                  )
                                }
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  props.deleteReviewAction(review?.userId)
                                }
                              >
                                <Delete />
                              </IconButton>
                            </div>
                          )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={classes.carouselDiv}>
                <Carousel className={classes.carousel}>
                 
                  <Image
                   key={props.place?._id}
                   cloudName="dkskccoaj"
                   publicId={props.place?.avatar}
                
                   crop="scale"
                 
                   />

                   {props?.imageList.length > 0 && props?.imageList?.map((row, i) => (
                   
                    
                  <Image
                  key={row?._id}
                  cloudName="dkskccoaj"
                  publicId={row?.avatar}
               
                  crop="scale"
                
                  />

                  ))}
                </Carousel>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "ButtonHighlight",
              margin: "40px 35px ",
            }}
          >
            <Typography style={{ padding: "10px" }}>
              <h2
                style={{
                  fontSize: "30px",
                  fontFamily: "system-ui",
                }}
              >
                <span style={{ color: "#ff5d5d" }}> EXPLORE</span>{" "}
                <span style={{ color: "black" }}> PLACE</span>
              </h2>
            </Typography>
            <div ref={myRef}>
              <Accordian />
            </div>
          </div>
        </div>
      )}
      <ReviewDialogBox />
      <Footer />
    </div>
  );
};
const mapPropsToValues = (state) => {
  return {
    // isLoggedIn: state.vacation.isLoggedIn,
    place: state.vacation.place,
    imageList: state.vacation.imageList,
    page: state.vacation.page,
    rowPerPage: state.vacation.rowPerPage,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
    isLoggedIn: state.vacation.isLoggedIn,
    userList: state.vacation.userList,
    recentLoggedInUser: state.vacation.recentLoggedInUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      storePlaceAction,
      storeImageList,
      LoginValue,
      addTripAction,
      storePlaceList,
      resetPlaceListAction,
      resetPlaceListAction,
      openLoginDialogAction,
      openReviewBoxAction,
      deleteReviewAction,
      verifyTokenAction,
      LogoutValue,
      storeUserList,
    },
    dispatch
  );
};

export default connect(mapPropsToValues, mapDispatchToProps)(Description);