import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Rating } from "@material-ui/lab";
import { bindActionCreators } from "redux";
import { Box, Fab } from "@material-ui/core";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { editedPlacedIdAction, storeImageList, addTripAction, openLoginDialogAction } from "../../Store/actions/action";
import { FastField } from "formik";
import { FavoriteBorder, FavoriteOutlined } from "@material-ui/icons";
import { Image } from 'cloudinary-react';

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 250,
    // height: 350,
    // fontSize: "20px",
    // boxShadow: "none",
    border: "1px solid #e2e2e2",
    // borderRadius: "10px",
    paddingBottom: "20px",
    boxShadow: "rgb(35 35 35 / 11%) 4px 0px 9px 3px",
    borderRadius: "0px",

    width: 270,
    height: 350,
    // fontSize: "20px",
    // boxShadow: "none",
    // border: "1px solid #e2e2e2",
    // borderRadius: "10px",
    // paddingBottom: "20px",
  },
  media: {
    
    
    width: "280px",
    height: "220px",  
    WebkitTransition: ".3s ease-in-out",
    transition: ".3s ease-in-out",
    "&:hover": {
      width: "320px",
      WebkitTransform: 'scale(1.01)',
      transform: 'scale(1.01)',


    }
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  rating: {
    width: 200,
    display: "flex",
    alignItems: "center",
    "& .MuiRating-label": {
      fontSize: "20px",
    },
  },
  title: {
    fontSize: "1.3rem",
    color: "black",
    display: "flex",
    alignItems: "center",
    fontFamily: "system-ui",
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline"
    }
  }
  //   avatar: {
  //     backgroundColor: red[500],
  //   },
}));
function Card1(props) {
  const classes = useStyles();
  const history = useHistory();
  const [trip, setTrip] = useState(false);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const user = JSON.parse(localStorage.getItem("User"));

  return (
    <Card className={classes.root} >
      {/* <CardHeader title="Shrimp and Chorizo Paella" /> */}

      <CardMedia
      


      >
   <Image
                            key="1"
                            cloudName="dkskccoaj"
                            publicId={props?.avatar}
                       
                            className={classes.media}
      
                            crop="scale"
                        />

      </CardMedia>

      <CardContent style={{ padding: "2px 0px 0px 10px", display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="textSecondary" component="p"
          className={classes.title}
          onClick={async () => {
            await props.editedPlacedIdAction(props.id)
            await props.storeImageList(props.id)
            if (props.category === "Hotels" || props.category === "Restaurants" || props.category === "Holiday Homes" || props.category === "Package Holidays") {
              history.push(`/tour/${props.id}`)
            }
            else if (props.category === "Religious" || props.category === "Outing Places") { history.push(`/image/${props.city}/${props.id}`) }
          }}>
          {props.name}
        </Typography>
        <div>
          <div style={{

          }}>
            <IconButton onClick={
              () => {
                if (localStorage.getItem("Token") && user?.role === "User") { props.addTripAction(props.id) }
                else {
                  props.openLoginDialogAction();
                }
              }
            }>

              <FavoriteBorder style={{
                color: "black",
                width: "30px",
                height: "30px",

              }} />

            </IconButton>
          </div>
          {props?.tripList.map((item) => ((item?.placeId === props.id && item?.trip) && <div style={{
            position: "absolute",
            bottom: 73
          }} >
            <IconButton onClick={
              () => {
                if (localStorage.getItem("Token") && user?.role === "User") { props.addTripAction(props.id) }
                else {
                  props.openLoginDialogAction();
                }
              }
            }>
              <FavoriteIcon style={{
                color: "#e61818",
                width: "28px",
                height: "28px",

              }} />
            </IconButton>
          </div>))}
        </div>
      </CardContent>
      <CardActions disableSpacing style={{ display: "block" }} onClick={async () => {
        await props.editedPlacedIdAction(props.id)
        await props.storeImageList(props.id)
        if (props.category === "Hotels" || props.category === "Restaurants" || props.category === "Holiday Homes" || props.category === "Package Holidays") {
          history.push(`/tour/${props.id}`)
        }
        else if (props.category === "Religious" || props.category === "Outing Places") { history.push(`/image/${props.city}/${props.id}`) }
      }}>

        {props?.package && <Typography
          style={{
            padding: "0  5px",
            display: "inline-block",
            fontSize: "14px",
            color: "#111",

          }}
        >

          {"₹" + props.package + " / Day"}
        </Typography>}
        <div className={classes.rating}>
          <Rating
            name="hover-feedback"
            value={props.rating}
            precision={0.1}
            readOnly
          />
          {props.rating !== null && (
            <Box ml={2} style={{ fontSize: "14px" }}>
              {labels[hover !== -1 ? hover : props.rating]}
            </Box>
          )}
        </div>
      </CardActions>
    </Card >
  );
}
const mapPropsToValues = (state) => {
  return {
    // isLoggedIn: state.vacation.isLoggedIn,
    tripList: state.vacation.tripList,
    editedPlace: state.vacation.editedPlace,
    page: state.vacation.page,
    rowPerPage: state.vacation.rowPerPage,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
    recentLoggedInUser: state.vacation.recentLoggedInUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ editedPlacedIdAction, storeImageList, addTripAction, openLoginDialogAction }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(Card1);