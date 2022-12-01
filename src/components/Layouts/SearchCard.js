import React, { useEffect } from "react";
import { Box, CssBaseline } from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Pagination, Rating } from "@material-ui/lab";
import {
    Book,
    CheckCircle,
    Done,
    Hotel,
    LocalActivity,
    LocalParking,
    LocationOnOutlined,
    Pool,
    Restaurant,
    RestaurantMenu,
    RestaurantMenuTwoTone,
    RoomService,
    WbSunny,
    Weekend,
} from "@material-ui/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { storePlaceAction, storeImageList, LoginValue, addTripAction, storePlaceList, resetPlaceListAction, openLoginDialogAction } from "../../Store/actions/action";
import {Image} from 'cloudinary-react'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    linksDiv: {
        // backgroundColor: "lightcoral",
        height: "40px",
        marginTop: "90px",
        position: "relative",
        borderTop: "1px solid grey",
        borderBottom: "1px solid grey",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    links: {
        color: "gray",
        "&:hover": {
            //   backgroundColor: "black",
            color: "#000000bd",
        },
    },
    headingDivWithRating: {
        margin: " 25px 35px",
        height: "90px",
        // backgroundColor: "honeydew",
    },

    headingDiv: {
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
    },
    ratingCount: {
        marginLeft: "10px",
        fontFamily: "standard",
        fontWeight: "500",
        fontSize: "0.9rem",
    },
    totalPlacesInCityDiv: {
        margin: "20px 35px",
        // backgroundColor: "red",
        width: "250px",
        border: "2px solid lightgary",
    },
    totalPlacesInCity: {
        fontWeight: "600",
        backgroundColor: "#eceae5",
        border: " 1px solid lightgray",
        padding: "3px",
        fontSize: "0.8rem",
    },
    addressArrow: {
        color: "#000000bd",
        fontSize: "0.7rem",
        margin: "5px 10px",
    },
    PlaceDiv: {
        margin: "20px 35px",
        maxHeight: "250px",
        maxWidth: "800px",
        border: "1px solid lightgray",
        display: "flex",
    },
    placeDesc: {
        width: "60%",
        // backgroundColor: "wheat",
        padding: "20px 30px",
    },
    placeHeading: {
        textTransform: "capitalize",
        fontSize: "30px",
        lineHeight: "24px",
        letterSpacing: "normal",
        fontWeight: "bold",
    },
    placeRate: {

        fontSize: "1.4rem",
        fontWeight: "600",
        // marginInlineStart: "50px",
    },
    descLeft: {
        width: "50%",
        // backgroundColor: "turquoise",
        height: "80%",
        margin: "20px 0px",
    },
    descRight: {
        width: "50%",
        // backgroundColor: "tomato",
        height: "80%",
        margin: "20px 0px",
        borderLeft: "1px solid lightgray",
        padding: "20px",
    },
}));

const SearchCard = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (

        <div>



            <div className={classes.PlaceDiv}
                onClick={() => {
                    if (props.place.category === "Hotels" || props.place.category === "Restaurants" || props.place.category === "Holiday Homes" || props.place.category === "Package Holidays") {
                        history.push(`/tour/${props.place._id}`)
                    }
                    else if (props.place.category === "Religious" || props.place.category === "Outing Places") { history.push(`/image/${props.place.city}/${props.place._id}`) }
                }}>
                <div style={{ width: "40%" }}>
                 
                     <Image
                   key={props.place?._id}
                   cloudName="dkskccoaj"
                   publicId={props.place?.avatar}
                 
                   crop="scale"
                   style={{ width: "100%", height: "100%" }}
                   />
                    <div style={{
                        position: "relative",
                        top: "-25px",
                        color: "white",
                        left: "10px",
                        display: "flex",



                    }}>{props.place.category === "Hotels" && <Hotel />}
                        {props.place.category === "Restaurants" && <RestaurantMenuTwoTone />}
                        {props.place.category === "Package Holidays" && <Weekend />}
                        {props.place.category === "Religious" && <WbSunny />}
                        {props.place.category === "Outing Places" && <LocalActivity />}
                        <Typography style={{
                            fontWeight: "900",
                            marginLeft: "10px"
                        }}> {props.place.category}</Typography>
                    </div>
                </div>
                <div className={classes.placeDesc}>
                    <Typography className={classes.placeHeading}>
                        {props.place.name}
                    </Typography>
                    <div style={{ display: "flex", marginTop: "10px" }}>
                        <Rating
                            name="read-only"
                            value={props.place.averageRating ? props.place.averageRating : 0}
                            readOnly
                            style={{ fontSize: "1.3rem" }}
                            precision={0.1}
                        />

                    </div>
                    <div style={{ display: "flex", marginTop: "10px" }}>

                        <Typography style={{ marginLeft: "10px" }}>
                            {props.place?.reviews?.length + " Reviews"}
                        </Typography>
                    </div>


                  {props.place?.package &&  <div style={{ display: "flex", marginTop: "10px" }}>

                        <Typography className={classes.placeRate}>
                            {"₹" + props.place.package + "/-"}
                        </Typography>
                    </div>}
                    <div style={{
                        display: "flex", marginTop: "10px", height: "70px",
                        alignItems: "center"
                    }}>
                        <LocationOnOutlined />
                        <Typography style={{ marginLeft: "5px" }}>
                            {props.place.address}
                        </Typography>
                    </div>

                </div>
            </div>




        </div>

    );
};

const mapPropsToValues = (state) => {
    return {
        // isLoggedIn: state.vacation.isLoggedIn,


        page: state.vacation.page,
        rowPerPage: state.vacation.rowPerPage,
        openLeftSideDrawer: state.vacation.openLeftSideDrawer,
        searchData: state.vacation.searchData,
        searchlength: state.vacation.searchlength
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ storePlaceAction, storeImageList, LoginValue, addTripAction, storePlaceList, resetPlaceListAction, resetPlaceListAction, openLoginDialogAction }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(SearchCard);
