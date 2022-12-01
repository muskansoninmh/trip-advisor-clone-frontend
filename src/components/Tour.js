import React from "react";
import {
  Avatar,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  IconButton,
  TextField,
} from "@material-ui/core";

import { Image } from 'cloudinary-react';
import { makeStyles, Typography, Button, Box } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {
  AccessTime,
  AccountBalanceWallet,
  Call,
  Delete,
  Eco,
  Edit,
  Favorite,
  FavoriteBorder,
  Room,
  RoomService,
} from "@material-ui/icons";
import WebIcon from "@material-ui/icons/Web";
import LensIcon from "@material-ui/icons/Lens";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Carousel } from "react-responsive-carousel";
import Tooltip from "@material-ui/core/Tooltip";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MenuCarousel from "react-elastic-carousel";
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
  checkAvailabilityAction,
  storeUserList,
  BookPlaceAction,
  verifyTokenAction,
  resetErrorMessageAction,
  errorMessageAction,
  LogoutValue,
} from "../Store/actions/action";
import ReactLoading from "react-loading";
import ReviewDialogBox from "./Layouts/ReviewDialogBox";
import addWeeks from "date-fns/addWeeks";
import { Slide } from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ImageCarosuel from "./Layouts/ImageCarosuel";
import { getMonth } from "date-fns";
import BookDialog from "./BookDialog";
import { useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
      color: "#000000bd",
    },
  },
  headingDiv: {
    margin: " 25px 35px",
    // height: "90px",
  },
  placeHeading: {
    fontWeight: "800",
    fontSize: "20px",
    [theme.breakpoints.up("md")]: {
      fontSize: "45px",
    },
    fontFamily: "system-ui",
    color: "black",
  },
  headingLikebuttonDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    background: "white",
    width: "20px",
    height: "70%",
    color: "black",

    borderRadius: "10px",
    marginInlineStart: "20px",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "black",
      color: "red",
    },
    "& .MuiButton-label": {
      height: "40px",
    },
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
  aboutDiv: {
    height: "600px",
    margin: "35px",
    marginTop: "45px",
    marginBottom: "10px",
    [theme.breakpoints.up("md")]: {
      height: "280px",
    },
    [theme.breakpoints.up("sm", "md")]: {
      height: "320px",
    },

    [theme.breakpoints.down("xs")]: {
      height: "600px",
    },
  },
  aboutHeading: {
    padding: "20px",
    fontSize: "1.6rem",
    fontWeight: "600",
    color: "black",
  },
  aboutUpperHalf: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  aboutLowerHalf: {
    marginTop: "10px",
    display: "flex",
  },
  aboutDescription: {
    // height: "100px",
    width: "70%",

    margin: "0px 10px",
  },
  duration: {
    fontSize: "0.9rem",
    lineHeight: "25px",
    marginLeft: "5px",
    [theme.breakpoints.up("sm")]: {
      lineHeight: "1.2",
    },
  },
  cancellation: {
    fontSize: "0.9rem",
    lineHeight: "25px",
    marginLeft: "5px",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "1.5",
    },
  },
  descCarouselColumn: {
    width: "100%",
    padding: "10px 35px",
    display: "flex",
    flexDirection: "column-reverse",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      height: "490px",
      flexDirection: "inherit",
    },
  },
  descDiv: {
    width: "100%",
    marginRight: "15px",
    minHeight: "85%",
    maxHeight: "100%",
    borderRadius: "40px",
    border: "1px solid lightGray",
    [theme.breakpoints.up("md")]: {
      width: "29%",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: "700px",
    height: "480px",

    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  carousel: {
    "& .carousel .thumb": {
      display: "none",
    },
    "& .carousel .slider-wrapper.axis-horizontal .slider .slide": {
      height: "450px",
      border: "1px solid lightgray",
    },
    "& .carousel .slide img": {
      height: "100%",
    },
  },
  dateBox: {
    margin: " 30px 18px 18px 18px",
    width: "90%",
    height: "50px",
    border: "1px solid lightgray",
    borderRadius: "30px",
    display: "flex",
    padding: "10px",
    alignItems: "center",
  },
  learnMore: {
    textDecoration: "underline",
    fontWeight: "600",
    "&:hover": {
      opacity: "0.8",
    },
  },
  ratingCount: {
    marginLeft: "10px",
    fontFamily: "standard",
    fontWeight: "500",
    fontSize: "0.9rem",
  },
  hotelName: {
    padding: "0 10px",
    margin: "5px 20px",
    fontFamily: "standard",
    fontWeight: "500",
    fontSize: "0.9rem",
    boxShadow: "rgb(35 35 35 / 11%) 4px 0px 9px 3px",
    // padding: "1px",
  },
  dot: {
    height: "0.5rem",
    width: "0.5rem",
    position: "relative",
    top: "-1px",
    marginRight: "5px",
    MozTextBlink: "blink",
  },
  afterDateDiv: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    display: "flex",
    padding: "10px 20px",
    //   backgroundColor: "MenuText",
  },
  bookInAdvance: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: "600",
  },
  perDayPackage: {
    height: "100%",
    display: "block",
    fontSize: "0.9rem",
    textAlign: "right",
  },
  corouselBack: {
    width: "100%",
    height: "100%",
    marginTop: "20px",
    marginRight: "10px",
    [theme.breakpoints.up("md")]: {
      width: "70%",
      marginTop: "0px",
    },
  },
  handwashDiv: {
    margin: "20px 35px",

    border: "1px solid lightgray",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  box: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "28%",
    },
  },
  travelSafe: {
    fontWeight: "600",
    fontSize: "1.5rem",
    marginLeft: "10px",
  },
  covid19: {
    fontWeight: "500",
    fontSize: "1.7rem",
    marginLeft: "10px",
  },
  community: {
    fontWeight: "600",
    marginTop: "40px",
    marginLeft: "15px",
  },
  communityDetails: {
    fontSize: "0.9rem",
    lineHeight: "25px",
    marginTop: "18px",
    marginLeft: "20px",
  },
  BoxesDiv: {
    margin: "40px 35px",

    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  averageRating: {
    fontSize: "1.5rem",
    marginRight: "7px",
    fontWeight: "600",
  },
  totalReviews: {
    fontSize: "0.8rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
  },
  BoxStyle: {
    border: "1px solid lightgray",
    padding: "24px",
    marginTop: "10px",
    [theme.breakpoints.up("md")]: {
      width: "30%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
  BoxHeading: {
    fontSize: "1rem",
    fontWeight: "600",
  },
  Box1RateHeading: {
    borderTop: "1px solid gray",
    marginTop: "30px",
    paddingTop: "15px",
  },
  Box1Rating: {
    display: "flex",
    fontSize: "0.9rem",
    margin: "7px 0px",
  },
  Box1Icon: {
    fontSize: "medium",
    marginRight: "10px",
  },
  Box2Headings: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    marginTop: "35px",
  },
  Box3Heading: {
    display: "flex",
    fontSize: "0.9rem",
    margin: "15px 0px",
  },
  ModalData: {
    display: "flex",
    fontWeight: "600",
    padding: "10px 0px",
    justifyContent: "space-between",
  },
  modalHeading: {
    fontWeight: "900",
    marginBottom: "35px",
    display: "flex",
    justifyContent: "space-between",
  },
  modalActions: {
    justifyContent: "right",
    borderTop: "1px solid lightgrey",
    paddingTop: "20px",
    display: "flex",
  },
  modalButton: {
    padding: "10px",
    marginRight: "20px",
    borderRadius: "20px",
  },
  reviewButton: {
    background: "white",
    color: "black",
    minWidth: "100px",
    height: "40px",

    justifyContent: "flex-end",
    borderRadius: "15px",
    marginInlineStart: "20px",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  ratingAddressBox: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
}));
function getWeeksAfter(date, amount) {
  return date ? addWeeks(date, amount) : undefined;
}

function timeFormat(time) {
  let hours = new Date(time)?.getHours();
  let minutes = new Date(time)?.getMinutes();
  let amPm;
  if (hours > 12) {
    hours = hours - 12;
    amPm = "PM";
  } else if (hours < 12) {
    hours = hours;
    amPm = "AM";
  }
  return `${hours}:${minutes} ${amPm} `;
}
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 868, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Tour = (props) => {
  const classes = useStyles();
  const [valueDate, setValueDate] = React.useState([null, null]);
  const history = useHistory();
  const user = props?.recentLoggedInUser;
  const [value, setValue] = React.useState(2);
  const [day, setDay] = React.useState(1);
  const [tour, setTour] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [openLearnMore, setOpenLearnMore] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [openbar, setOpenBar] = React.useState({
    openb: false,
    vertical: "top",
    horizontal: "center",
  });
  window.scroll(0, 0);
  const { vertical, horizontal, openb } = openbar;
  const handleClick = (newState) => {
    setOpenBar({ openb: true, ...newState });
  };

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar({ ...openbar, openb: false });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClickOpen = () => {
    setOpenLearnMore(true);
  };
  const handleClickClose = () => {
    setOpenLearnMore(false);
  };
  const handleClose = () => {
    props.resetErrorMessageAction();
    setOpen(false);
  };
  useEffect(async () => {
    window.scroll(0, 0);
    setLoading(true);
    const verifyRes = await props.verifyTokenAction();

    // console.log((JSON.parse(localStorage.getItem("User"))).role)
    if (
      verifyRes?.status === 200 &&
      (JSON.parse(localStorage.getItem("User")))?.role === "User"
    ) {
      props.LoginValue();
    } else {
      props.LogoutValue();
    }

    await props.storeUserList();

    const res = await props.storeImageList(props.match.params.id);
    const resp = await props.storePlaceAction(props.match.params.id);
    if (res.status === 200 && resp.status === 200) {
      setLoading(false);
    }
  }, []);

  const openingHours = timeFormat(props.place?.openingHours);
  const closingHours = timeFormat(props.place?.closingHours);

  return (
    <CssBaseline>
      <Header />
      {/* //////////hreflinks////////////////// */}
      <div className={classes.linksDiv}>
        <MenuCarousel breakPoints={breakPoints} swipeScrollTolerance={1}>
          <div>
            <a href="#" className={classes.links}>
              {props.place.city?.name}
            </a>
          </div>
          <div>
            <a
              className={classes.links}
              onClick={() => {
                history.push(`/search/${props.place.city?.name}/Hotels`);
              }}
            >
              Hotels
            </a>
          </div>
          <div>
            <a
              className={classes.links}
              onClick={() => {
                history.push(`/search/${props.place.city?.name}/Outing Places`);
              }}
            >
              Places to Visit
            </a>
          </div>
          <div>
            <a
              className={classes.links}
              onClick={() => {
                history.push(`/search/${props.place.city?.name}/Restaurants`);
              }}
            >
              Restaurant
            </a>
          </div>
          <div>
            <a
              className={classes.links}
              onClick={() => {
                history.push(`/search/${props.place.city?.name}/Holiday Homes`);
              }}
            >
              Holiday Homes
            </a>
          </div>
          <div>
            <a
              className={classes.links}
              onClick={() => {
                history.push(
                  `/search/${props.place.city?.name}/Package Holidays`
                );
              }}
            >
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
          <div className={classes.headingDiv}>
            <div className={classes.headingLikebuttonDiv}>
              <Typography style={{ display: "flex" }}>
                <span className={classes.placeHeading}>
                  {props.place?.name}
                </span>
              </Typography>

              {(!props.place.trip ||
                !localStorage.getItem("Token") ||
                user.role !== "User") && (
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
              {props.place.trip &&
                localStorage.getItem("Token") &&
                user.role === "User" && (
                  <Button
                    className={classes.button}
                    onClick={() => {
                      if (
                        localStorage.getItem("Token") &&
                        user.role === "User"
                      ) {
                        props.addTripAction(props.place._id);
                      } else {
                        props.openLoginDialogAction();
                      }
                    }}
                  >
                    <Favorite
                      style={{
                        height: "50px",
                        width: "2rem",
                        color: "#e61818",
                      }}
                    />
                  </Button>
                )}
            </div>
            <div className={classes.ratingAddressBox}>
              <Box component="fieldset" borderColor="transparent">
                <Rating
                  name="read-only"
                  value={
                    props.place.averageRating ? props.place.averageRating : 0
                  }
                  readOnly
                  style={{ fontSize: "1rem" }}
                  precision={0.25}
                />
              </Box>
              <Typography className={classes.ratingCount}>
                {" "}
                {props.place?.reviews?.length || 0}
              </Typography>
              <Box className={classes.ratingAddressBox}>
                <Typography className={classes.hotelName}>
                  <LensIcon className={classes.dot} />
                  {props.place.city?.name}
                </Typography>
                {props.place?.openingHours && (
                  <Typography className={classes.hotelName}>
                    <AccessTime style={{ marginRight: "3px", width: "1rem" }} />
                    {"Opens now : " + openingHours + " - " + closingHours}
                  </Typography>
                )}
              </Box>
            </div>
          </div>
          {props.place?.category !== "Restaurants" && (
            <div className={classes.descCarouselColumn}>
              <div className={classes.descDiv}>
                <Box className={classes.dateBox}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      disablePast
                      value={valueDate}
                      maxDate={getWeeksAfter(valueDate[0], 4)}
                      onChange={(newValue) => {
                        setValueDate(newValue);
                        props.resetErrorMessageAction();
                      }}
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <TextField {...startProps} label="" />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField {...endProps} label="" />
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <div className={classes.afterDateDiv}>
                  <Box className={classes.bookInAdvance}>Book In Advance</Box>
                  <Box className={classes.perDayPackage}>
                    starting from
                    <br />{" "}
                    <span style={{ fontWeight: "600" }}>
                      {"₹" + props.place.package + "/-"}
                    </span>
                    <br />
                    per person
                  </Box>
                </div>
                <Typography
                  style={{
                    color: "red",
                    margin: "10px",
                  }}
                >
                  {props.errorMessage}
                </Typography>
                <Button
                  className={classes.dateBox}
                  style={{ backgroundColor: "#f2b203" }}
                  onClick={async () => {
                    if (localStorage.getItem("Token") && user.role === "User") {
                      const res = await props.checkAvailabilityAction(
                        valueDate,
                        props.place?._id
                      );
                      setDay(
                        valueDate &&
                          valueDate[1]?.getDate() < valueDate[0]?.getDate()
                          ? (valueDate[0]?.getMonth() === 1
                              ? valueDate[1]?.getDate() + 28
                              : valueDate[0]?.getMonth() % 2 === 0 ||
                                valueDate[0]?.getMonth() === 7 ||
                                valueDate[0]?.getMonth() === 9 ||
                                valueDate[0]?.getMonth() === 11
                              ? valueDate[1]?.getDate() + 31
                              : valueDate[1]?.getDate() + 30) -
                              valueDate[0]?.getDate()
                          : valueDate[1]?.getDate() - valueDate[0]?.getDate()
                      );
                      if (res?.status === 200) {
                        handleOpen();
                        props.resetErrorMessageAction();
                      } else {
                        props.errorMessageAction(res);
                      }
                    } else {
                      props.openLoginDialogAction();
                    }
                  }}
                >
                  <span style={{ fontWeight: "600", fontSize: "1rem" }}>
                    Check Availability
                  </span>
                </Button>
                <BookDialog
                  open={open}
                  handleClose={handleClose}
                  day={day}
                  valueDate={valueDate}
                />
                <div
                  style={{
                    margin: "10px",
                    padding: "20px 0",
                    fontSize: "0.5rem",
                  }}
                >
                  <Typography>
                    Reserve now & pay later: Save your spot free of charge with
                    flexible booking.
                    <span
                      className={classes.learnMore}
                      onClick={handleClickOpen}
                    >
                      Learn more
                    </span>
                    <Dialog
                      open={openLearnMore}
                      TransitionComponent={Transition}
                      onClose={handleClickClose}
                    >
                      <DialogContent>
                        <DialogContentText>
                          Reserve now & pay later: Save your spot free of charge
                          with flexible booking.
                          <br /> You can reserve your seat now and pay 1 day
                          before you start your visit.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClickClose}>Ok</Button>
                      </DialogActions>
                    </Dialog>
                  </Typography>
                </div>
                <Typography style={{ margin: "10px", fontSize: "0.8rem" }}>
                  Not sure? You can cancel this booking up to 24 hours in
                  advance for a full refund.
                </Typography>
              </div>

              <div className={classes.corouselBack}>
                <Carousel infiniteLoop autoPlay className={classes.carousel}>
                
<Image
key={props.place?._id}
cloudName="dkskccoaj"
publicId={props.place?.avatar}
width="300"
crop="scale"
style={{ width: "100%", height: "100%" }}
/>
                  {props.imageList.map((row, i) => (
                   <Image
                   key={row._id}
                   cloudName="dkskccoaj"
                   publicId={row?.avatar}
                   width="300"
                   crop="scale"
                   style={{ width: "100%", height: "100%" }}
                   />
                  ))}
                </Carousel>
              </div>
            </div>
          )}
          {props.place?.category === "Restaurants" && (
            <ImageCarosuel place={props.place} imageList={props.imageList} />
          )}
          <div className={classes.aboutDiv}>
            <Typography className={classes.aboutHeading}>About</Typography>
            <div className={classes.aboutUpperHalf}>
              <div className={classes.aboutDescription}>
                <Typography style={{ fontSize: "0.9rem", lineHeight: "25px" }}>
                  {props.place.description}
                </Typography>
                <div className={classes.aboutLowerHalf}>
                  <div style={{ width: "50%" }}>
                    <Typography style={{ fontWeight: "600", padding: "3px" }}>
                      Know Before You Know
                    </Typography>
                    <Typography className={classes.duration}>
                      Duration: 6-8 hours <br /> Mobile tickets accepted <br />
                      Instant confirmation
                    </Typography>
                  </div>
                  <div style={{ width: "50%" }}>
                    <Typography style={{ fontWeight: "600", padding: "3px" }}>
                      Cancellation Policy
                    </Typography>
                    <Typography className={classes.cancellation}>
                      For a full refund, cancel at least 24 hours in advance of
                      the start date of the experience.
                    </Typography>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  //   backgroundColor: "blueviolet",
                }}
              >
                <Typography style={{ fontWeight: "600", padding: "3px" }}>
                  Available Languages
                </Typography>
                <Typography style={{ paddingLeft: "5px", fontSize: "0.9rem" }}>
                  English
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.handwashDiv}>
            <Box className={classes.box}>
              <img
                src="../assets/images/handwash.png"
                style={{ margin: "15px 0px 10px 30px" }}
              />

              <Typography className={classes.travelSafe}>
                Travel safe During
              </Typography>
              <Typography className={classes.covid19}>COVID-19</Typography>
            </Box>
            <Box className={classes.box}>
              <Typography style={{ fontWeight: "600", marginTop: "40px" }}>
                What you can expect during your visit
              </Typography>
              <ul style={{ lineHeight: "30px", marginTop: "18px" }}>
                <li>Face masks required for staff in public areas</li>
                <li>Daily temperature and symptom checks for staff</li>
                <li>Socially distanced dining tables</li>
              </ul>
            </Box>
            <Box className={classes.box}>
              <Typography className={classes.community}>Community</Typography>
              <Typography className={classes.communityDetails}>
                You can write a review to our Community to know more.. <br />{" "}
                Visit our webite @www.tripadvisor.com
              </Typography>
            </Box>
          </div>
          <div className={classes.BoxesDiv}>
            <div className={classes.BoxStyle}>
              <Typography className={classes.BoxHeading}>Rating</Typography>
              <div style={{ display: "flex", marginBottom: "15px" }}>
                <Box
                  component="fieldset"
                  borderColor="transparent"
                  style={{ display: "flex" }}
                >
                  <Typography className={classes.averageRating}>
                    {props.place.averageRating ? props.place.averageRating : 0}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={
                      props.place.averageRating ? props.place.averageRating : 0
                    }
                    readOnly
                    style={{
                      fontSize: "1.5rem",
                      top: "5px",
                      marginRight: "15px",
                    }}
                    precision={0.25}
                  />
                </Box>
              </div>

              <Box className={classes.Box1RateHeading}>
                <Typography style={{ fontSize: "0.9rem", marginTop: "20px" }}>
                  RATINGS
                </Typography>
                <ul
                  style={{
                    padding: "0px 5px",

                    marginTop: "18px",
                  }}
                >
                  <Typography className={classes.Box1Rating}>
                    <FastfoodIcon className={classes.Box1Icon} />
                    Food
                  </Typography>
                  <Typography className={classes.Box1Rating}>
                    <RoomService className={classes.Box1Icon} />
                    Service
                  </Typography>

                  <Typography className={classes.Box1Rating}>
                    <AccountBalanceWallet className={classes.Box1Icon} />
                    Value
                  </Typography>
                  <Typography className={classes.Box1Rating}>
                    <Eco className={classes.Box1Icon} />
                    Atmosphere
                  </Typography>
                </ul>
              </Box>
            </div>
            <div className={classes.BoxStyle}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography className={classes.BoxHeading}>
                    Reviews- {props.place?.reviews?.length || 0} reviews
                  </Typography>
                </div>
                {props.place.reviews?.filter(
                  (plc) =>
                    plc.userId === user?._id
                ).length === 0 && (
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
                            src={`data:image/jpg;base64,${
                              /^[A-Za-z0-9+/]+[=]{0,3}$/.test(
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
                      </div>
                      {review.userId ===
                        user?._id &&
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
                              onClick={() => {
                                props.deleteReviewAction(review?.userId);
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </div>
                        )}
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
                  </li>
                ))}
              </ul>
            </div>
            <div className={classes.BoxStyle}>
              <Typography
                className={classes.BoxHeading}
                style={{ marginBottom: "35px" }}
              >
                Location & Contact
              </Typography>
              <Typography className={classes.Box3Heading}>
                <Room style={{ marginRight: "10px" }} />
                {props.place.address}
              </Typography>
              <Tooltip
                title="You can also Visit our website to know more "
                arrow
                aria-label="add"
              >
                <Typography className={classes.Box3Heading}>
                  <WebIcon style={{ marginRight: "10px" }} />
                  Website-
                  <a href="">{props.place?.website}</a>
                </Typography>
              </Tooltip>

              <Tooltip
                title="You can call to know more "
                arrow
                aria-label="add"
              >
                <Typography className={classes.Box3Heading}>
                  <Call style={{ marginRight: "10px" }} />
                  Contact us-
                  <span style={{ color: "gray", textDecoration: "underline" }}>
                    {props.place?.contactNo}
                  </span>
                </Typography>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        open={openb}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        onClose={handleCloseBar}
      >
        <Alert onClose={handleCloseBar} severity="success">
          Booked Successfully
        </Alert>
      </Snackbar>
      <ReviewDialogBox />
      <Footer />
    </CssBaseline>
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
    errorMessage: state.vacation.errorMessage,
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
      checkAvailabilityAction,
      LogoutValue,
      BookPlaceAction,
      verifyTokenAction,
      resetErrorMessageAction,
      errorMessageAction,
      storeUserList,
    },
    dispatch
  );
};

export default connect(mapPropsToValues, mapDispatchToProps)(Tour);
