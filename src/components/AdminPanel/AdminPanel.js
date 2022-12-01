import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {

    Button,
    Paper,
    Box,
} from "@material-ui/core";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import Table from "./Table";



import { useDebouncedCallback } from "use-debounce/lib";
import clsx from "clsx";
import Header from "../Layouts/Header";
import { connect } from "react-redux";
import { openDrawerAction, openLeftSideDrawerAction, closeLeftSideDrawerAction, editedPlacedIdAction, changeRowPerPageAction, changePageAction, openDialogAction, storeUserList, LoginValue, verifyTokenAction } from "../../Store/actions/action";
import { bindActionCreators } from "redux";

import AdminDialogBox from "./AdminDialogBox";
import { useHistory } from "react-router-dom";
import Chart from './Chart'
import Stepper from "./Stepper";


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    button: {
        textAlign: "right",
        // marginRight: "30px",
        background: "white",
        color: "black",
        width: "150px",
        borderRadius: "15px",
        border: "1px solid black",
        marginInlineStart: "20px",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
        },
    },
    viewbutton: {

        background: "white",
        color: "black",
        width: "120px",
        borderRadius: "15px",
        border: "1px solid black",

        "&:hover": {
            backgroundColor: "black",
            color: "white",
        },
    },
    content: {
        width: "100%",
        paddingLeft: "20px",
    },
    contentShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    maindiv: {


        marginRight: "20px",
        paddingBottom: "2px",
        [theme.breakpoints.up('md')]: {
            display: "flex", justifyContent: "space-between"

        }
    },
    boxDiv: {
        margin: "20px 0px 0px ",

        display: "flex",
        [theme.breakpoints.up('md')]: {
            display: "block",
            margin: "20px 30px 20px ",
            minHeight: "150px",
            height: "250px"

        }
    },
    box: {
        textAlign: "center",

        backgroundColor: "white",
        width: "150px",
        padding: "10px",
        margin: "10px",
        border: "1px solid black",
        borderRadius: "10px",
        boxShadow: "5px 5px 5px black",
        [theme.breakpoints.up('sm')]: {
            width: "250px",
            padding: "30px",
            margin: "20px",

        }
    },
    boxTypo: {
        color: "rgb(95 90 87)",
        fontWeight: "1000",
        fontSize: "1.1rem",
        margin: "10px",
        display: "flex",
        fontFamily: "fantasy",
        justifyContent: "center",
        [theme.breakpoints.up('sm')]: {
            fontSize: "1.3rem",

        }
    },
    boxTypoNo: {
        color: "black",
        marginTop: "20px",
        fontWeight: "1000",

        display: "flex",
        justifyContent: "center",
    },
    fixedHeight: {
        height: 440,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',

        marginBottom: "80px",
        marginTop: "40px",
        flexDirection: 'column',
        width: "100%",


    },
}));

const AdminPanel = (props) => {
    const classes = useStyles();
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    React.useEffect(async () => {
        const verifyRes = await props.verifyTokenAction();


        if (verifyRes?.status === 200 && localStorage.getItem("Role") === "Admin") {
            props.LoginValue();
            // await props.storePlaceListAdmin();
        }





    }, []);
    const handleClose = () => {
        setOpen(false)
    }


    const setValueDebounced = useDebouncedCallback(async (name) => {
        // const resp = await props.storePlaceListAdmin(name);
    }, 1000);
    const handleSearchField = (val) => {
        if (val.trim().length >= 3 || val.length === 0) {
            props.refreshList(val);
            setValueDebounced(val);
        }
    };

    return (
        <div>

            <div>

                <Header admin="Admin" />

                <div
                    style={{
                        verticalAlign: "top",

                        height: "700px",
                        marginTop: "100px",


                        display: "inline-block",
                    }}
                    className={clsx(classes.content, {
                        [classes.contentShift]: props.openLeftSideDrawer,
                    })}
                >
                    {!props.searchData &&
                        <div> <div

                            style={{
                                display: "flex",
                                margin: "20px",
                                justifyContent: "flex-end",

                            }}
                        >



                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() => {
                                    setOpen(true)
                                }}>

                                Add Admin
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() => {
                                    props.openDrawerAction({ label: "ADD" });
                                }}
                            >

                                Add Places
                            </Button>
                        </div>
                            <div className={classes.maindiv}>

                                <div
                                    className={classes.boxDiv}

                                >
                                    <Box
                                        className={classes.box}
                                    >
                                        <Typography>
                                            <Typography variant="h5"
                                                className={classes.boxTypo}
                                            >
                                                TOTAL USERS
                                            </Typography>
                                            <Typography variant="h4"
                                                className={classes.boxTypoNo}
                                            >
                                                {props.totalUsers}
                                            </Typography>
                                            <Button className={classes.viewbutton} onClick={() =>
                                                history.push('./admin/user')} >
                                                View Users
                                            </Button>
                                        </Typography>
                                    </Box>

                                    <Box
                                        className={classes.box}
                                    >
                                        <Typography>
                                            <Typography variant="h5"
                                                className={classes.boxTypo}
                                            >
                                                TOTAL PLACES
                                            </Typography>
                                            <Typography variant="h4"
                                                className={classes.boxTypoNo}
                                            >
                                                {props.totalPlaces}
                                            </Typography>
                                            <Button className={classes.viewbutton} onClick={() =>
                                                history.push('./admin/place')}>
                                                View Places
                                            </Button>
                                        </Typography>
                                    </Box>


                                </div>
                                <Paper elevation={3} className={fixedHeightPaper}>
                                    <Chart />
                                </Paper>
                            </div>
                        </div>
                    }
                    {props.searchData && props.placeList.length !== 0 && <Table place={true} />}
                    {props.searchData && props.userList.length !== 0 && <Table />}
                    <Stepper />
                </div>
            </div>

            <AdminDialogBox open={open} handleClose={handleClose} />

        </div >
    );
};
const mapPropsToValues = (state) => {
    return {
        // isLoggedIn: state.vacation.isLoggedIn,
        placeList: state.vacation.placeList,
        userList: state.vacation.userList,
        totalPlaces: state.vacation.totalPlaces,
        totalUsers: state.vacation.totalUsers,
        page: state.vacation.page,
        rowPerPage: state.vacation.rowPerPage,
        openLeftSideDrawer: state.vacation.openLeftSideDrawer,
        searchData: state.vacation.searchData
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ openDrawerAction, openLeftSideDrawerAction, closeLeftSideDrawerAction, editedPlacedIdAction, changeRowPerPageAction, changePageAction, openDialogAction, storeUserList, LoginValue, verifyTokenAction }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(AdminPanel);
