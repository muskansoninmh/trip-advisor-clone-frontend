import React from "react";
import { CssBaseline, } from "@material-ui/core";
import {
    makeStyles,
    Typography,
    Button,
    Box,
    Modal,
    Backdrop,
    Fade,
} from "@material-ui/core";

import {
    Close,
} from "@material-ui/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    storePlaceAction, storeImageList, LoginValue, addTripAction, storePlaceList, resetPlaceListAction, openLoginDialogAction, openReviewBoxAction, deleteReviewAction,
    checkAvailabilityAction,
    BookPlaceAction,
    verifyTokenAction,
    resetErrorMessageAction,
    errorMessageAction
} from "../Store/actions/action";
import addWeeks from 'date-fns/addWeeks';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}





const __DEV__ = document.domain === 'localhost'

const useStyles = makeStyles((theme) => ({







    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: "700px",
        height: "480px",
        // maxHeight: "500px",
        // border: "2px solid #000",
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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

}));



const BookDialog = (props) => {
    const classes = useStyles();



    const [tour, setTour] = React.useState(1);



    const [openbar, setOpenBar] = React.useState({
        openb: false,
        vertical: 'top',
        horizontal: 'center'
    });

    const { vertical, horizontal, openb } = openbar;
    const handleClick = (newState) => {
        setOpenBar({ openb: true, ...newState });
    };

    const handleCloseBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenBar({ ...openbar, openb: false });
    };








    return (
        <CssBaseline>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <Typography className={classes.modalHeading} variant="h3">
                            {props.place.name}
                            <Close
                                style={{ fontSize: "1.7rem", cursor: "pointer" }}
                                onClick={props.handleClose}
                            />
                        </Typography>
                        <Typography className={classes.ModalData}>
                            <span>One Day Price With Services</span>
                            <span>{"₹" + props.place.package + "/-"}</span>
                        </Typography>
                        <Typography className={classes.ModalData}>
                            <span>Three Day Price With Services</span>
                            <span>{"₹" + Number(props.place.package) * 3 + "/-"}</span>
                        </Typography>

                        <Typography className={classes.ModalData}>
                            <span>

                                No Of Days You Want To Tour
                                <input
                                    style={{ width: "45px", marginLeft: "10px" }}
                                    name="amount"
                                    type="number"
                                    step="1"
                                    max="20"
                                    min="1"
                                    defaultValue={props.day}
                                    readOnly

                                />
                            </span>
                            <span style={{ fontWeight: "600" }}>{"₹" + Number(props.place.package) *
                                props.day + "/-"}</span>
                        </Typography>
                        <Typography className={classes.ModalData}>
                            <span>
                                {props.place?.category === "Hotels" ? "No Of Rooms You Want" : "No Of People You Go "}
                                <input
                                    style={{ width: "45px", marginLeft: "10px" }}
                                    name="amount"
                                    type="number"
                                    step="1"
                                    max="20"
                                    min="1"
                                    defaultValue="1"
                                    // value="1"
                                    onChange={(e) => {
                                        props.resetErrorMessageAction();
                                        setTour(e.target.value);
                                    }

                                    }
                                />
                            </span>
                            <span style={{ fontWeight: "600" }}>

                            </span>
                        </Typography>
                        <Typography className={classes.ModalData}>
                            <span>Total</span>
                            <span>{props.day === 1 ? "₹" + (Number(props.place.package) * tour) + "/-" : tour === 1 ? "₹" + (Number(props.place.package) * props.day) + "/-" : "₹" + ((Number(props.place.package) * tour) * props.day) + "/-"}</span>
                        </Typography>
                        <div className={classes.modalActions}>
                            <Button
                                className={classes.modalButton}
                                onClick={props.handleClose}
                                style={{
                                    backgroundColor: "silver",

                                    width: "100px",
                                    marginRight: "20px",
                                }}
                            >
                                <span style={{ fontWeight: "1000" }}>Cancel</span>
                            </Button>
                            <Button
                                className={classes.modalButton}
                                onClick={async () => {

                                    const res = await props.BookPlaceAction({
                                        bookStartDate: props.valueDate[0],
                                        bookEndDate: props.valueDate[1],
                                        bookNoOfRoomsOrMembers: tour,
                                        amount: props.day === 1 ? (Number(props.place.package) * tour) : tour === 1 ? (Number(props.place.package) * props.day) : ((Number(props.place.package) * tour) * props.day)
                                    });

                                    if (res?.status === 201) {
                                        props.handleClose();
                                        handleClick({ vertical: 'top', horizontal: 'center' });
                                    }
                                    else {
                                        props.errorMessageAction(res)

                                    }

                                }}
                                style={{ backgroundColor: "#f2b203" }}
                            >
                                <span style={{ fontWeight: "1000" }}>Book Now</span>
                            </Button>
                            {props.errorMessage && <Typography style={{
                                color: "red"
                            }}>
                                {props.errorMessage}
                            </Typography>}
                        </div>
                    </div>
                </Fade>
            </Modal>
            <Snackbar
                open={openb}
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={6000}
                onClose={handleCloseBar}>
                <Alert onClose={handleCloseBar} severity="success">
                    Booked Successfully
                </Alert>

            </Snackbar>

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
        recentLoggedInUser: state.vacation.recentLoggedInUser,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        storePlaceAction, storeImageList, LoginValue, addTripAction, storePlaceList, resetPlaceListAction, resetPlaceListAction, openLoginDialogAction, openReviewBoxAction, deleteReviewAction, checkAvailabilityAction,
        BookPlaceAction, verifyTokenAction, resetErrorMessageAction, errorMessageAction
    }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(BookDialog);

