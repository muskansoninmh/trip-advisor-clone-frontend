import React, { useEffect } from "react";
import Header from "./Layouts/Header";
import MenuBar from "./Layouts/MenuBar";
import {
    CssBaseline,
    Typography,

    Slide,
} from "@material-ui/core";
import ReactLoading from "react-loading";

import Footer from "./Layouts/Footer";
import { makeStyles } from "@material-ui/core";
import Card3 from "./Layouts/Card3_trip";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { storeBookingAction, LoginValue, verifyTokenAction } from "../Store/actions/action";
import { useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    button: {
        display: "flex",
        fontSize: "0.7rem",
        fontWeight: "500",
        fontFamily: "system-ui",
        background: "white",
        color: "black",
        height: "40px",
        width: "100px",
        borderRadius: "10px",
        marginInlineStart: "20px",
        border: "1px solid black",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
        },
    },
    heading: {
        fontSize: "30px",
        fontWeight: "500",
        fontFamily: "system-ui",
        margin: "35px",
        marginBottom: "20px",
    },
    TripsDiv: {
        width: "100%",
        height: "100%",

        margin: "20px 0px",
        display: "flex",
        flexWrap: "wrap"
    },
    createTripBox: {
        margin: "20px 20px 0px",
        height: "300px",
        width: "28%",
        border: "1px solid grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // boxShadow: "rgb(35 35 35 / 11%) 2px 0px 10px 3px",
    },

    addTrip: {
        backgroundColor: "black",
        width: "35px",
        height: "10px",
        border: "1px solid black",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
        },
    },
    dialogTitle: {
        backgroundColor: "#f2f2f2",

        "& .MuiTypography-h6": {
            display: "flex",
            justifyContent: "space-between",
        },
    },
    textfield: {
        padding: "0px",
        width: "100%",
        // marginBottom: "10px",
        marginTop: "5px",
        marginBottom: "15px",
        "& .MuiInputBase-root": {
            height: "30px",
            borderRadius: "0px",

            "& .MuiOutlinedInput-input ": {
                // padding: "0px",
                borderRadius: "0px",
            },
        },
    },
}));

const Booking = (props) => {
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();
    window.scroll(0, 0);

    useEffect(async () => {
        window.scroll(0, 0);
        setLoading(true)
        const verifyRes = await props.verifyTokenAction();


        if (verifyRes?.status === 200 && (JSON.parse(localStorage.getItem("User")))?.role === "User") {

            props.LoginValue();

            const res = await props.storeBookingAction()
            if (res.status === 200) {

                setLoading(false)
            }
        }
        else if(!props.isLoggedIn){
            history.push('/')
        }

    }, [props.isLoggedIn])
    const classes = useStyles();
    return (
        <CssBaseline>
            <Header />
            <MenuBar />
            {loading && <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "500px"
            }}>
                <ReactLoading type="spinningBubbles" color="#000" height={100} width={100} />
            </div>}
            {!loading && <div> <div>
                <Typography className={classes.heading} variant="h2">
                    <span style={{ color: "#ff5d5d" }}> YOUR</span>{" "}
                    <span style={{ color: "black" }}> BOOKINGS</span>
                    {/* </h2> */}
                </Typography>
            </div>

                <div className={classes.TripsDiv}>
                    {props.placeList.map((row) => (
                        <Card3 placeImage={row?.avatar} placeName={row?.name} category={row?.category} city={row?.city.name} id={row?._id}  />
                    ))}
                </div>
            </div>
            }
            <Footer />
        </CssBaseline>
    );
};

const mapPropsToValues = (state) => {
    return {
        // isLoggedIn: state.vacation.isLoggedIn,
        placeList: state.vacation.placeList,
        tripList: state.vacation.tripList,
        page: state.vacation.page,
        rowPerPage: state.vacation.rowPerPage,
        openLeftSideDrawer: state.vacation.openLeftSideDrawer,
        isLoggedIn: state.vacation.isLoggedIn
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ storeBookingAction, LoginValue, verifyTokenAction }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(Booking);