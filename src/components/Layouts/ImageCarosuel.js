import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Image } from 'cloudinary-react';
import styled, { keyframes } from "styled-components";
import { slideInUp } from "react-animations";

import { Close, PinDropSharp } from "@material-ui/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { storePlaceList, storeImageList, LoginValue, resetPlaceListAction } from "../../Store/actions/action";
import ReactLoading from "react-loading";
import { Slide } from "@material-ui/core";
import { Dialog, DialogContent } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
// import { red, blue, green } from "@material-ui/core";
// const Slide = require("./Slide").default;
// import Slide from "material-auto-rotating-carousel/lib/Slide";
const useStyles = makeStyles((theme) => ({
    moreImagesDialog: {
        backgroundColor: "#ffffffd9",
        height: "900px",

        "& .MuiDialog-paperWidthSm": {
            maxWidth: "800px",
        },
        "& .MuiDialog-paperScrollPaper": {
            maxHeight: "600px",

            position: "absolute",
            top: 0
        },
        "& .MuiDialogContent-root:first-child": {
            overflowX: "hidden"
        },
        "& .carousel-status": {
            display: "none",
        },
    },
    column1: {
        height: "100%",
        width: "60%",
        margin: "1px",
        "& .MuiButton-label": {
            height: "100%",
        },
    },
    column2: {
        height: "100%",
        width: "40%",
        display: "flex",
        flexDirection: "column",
        margin: "1px",
        "& .MuiButton-label ": {
            height: "100%",
        },
    },
    column2Div: {
        height: "50%",
        backgroundColor: "violet",
        width: "100%",
    },
    imageDiv: {
        height: "230px",
        margin: "30px",
        display: "flex",
        [theme.breakpoints.up('sm')]: {
            height: "430px",
        }
    },
    button: {
        background: "white",
        color: "black",
        width: "150px",
        borderRadius: "15px",
        // marginInlineStart: "20px",
        border: "1px solid black",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
        },
    },
    paragraphDiv: {
        height: "200px",
        margin: "40px 35px",
        width: "100",
        display: "flex",
        flexDirection: "column",
    },
    paragraphHeading: {
        height: "40px",
        width: "100",
        fontSize: "30px",
        fontFamily: "system-ui",
    },
    paragrapgContent: {
        height: "210px",
        width: "60%",
        fontSize: "16px",
        lineHeight: "28px",
        // margin: "20px 0",
        marginTop: "20px",
    },
    horizontalSlider: {
        height: "250px",
    },
    row: {
        height: "350px",
        marginTop: "10px",
        // backgroundColor: "goldenrod",
        display: "flex",
    },
    columnLeft: {
        height: "100%",
        width: "25%",

        // backgroundColor: "greenyellow"
    },
    columnRight: {
        width: "75%",
        marginTop: "10px"
        // backgroundColor: "khaki",
    },
    paragraph: {
        marginTop: "20px",
        fontFamily: "serif",
        fontSize: "20px",
    },
    carousel: {
        "& .carousel .thumbs": {
            width: "120px",
            height: "80px",
        },
        "& .carousel .thumbs-wrapper": {
            margin: "0px",
            marginTop: "10px"
        },
        "& .slider-wrapper": {
            height: "400px"
        },
        "& .slider": {
            height: "100%"
        }

    },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ZoomInAnimation = keyframes`${slideInUp}`;
const ZoomInDiv = styled.div`
  animation: 2s ${ZoomInAnimation};
`;
const ImageCarosuel = (props) => {
    ;
    const [open, setOpen] = useState(false);


    const classes = useStyles();
    const [openCard, setOpenCard] = useState({
        index: 0,
        open: false,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <div className={classes.imageDiv}>
                <div className={classes.column1} style={{ backgroundColor: "wheat" }}>
                    <Button style={{ width: "100%", padding: "0", height: "100%" }}>
                  
                            <Image
                            key={ props.placeList ? props.placeList[0]?._id : props.place?._id}
                            cloudName="dkskccoaj"
                            publicId={ props.placeList ? props.placeList[0]?.avatar : props.place?.avatar}
                          
                            crop="scale"
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Button>
                </div>
                {(props.placeList ? props.placeList[1]?._id : props.imageList[0]?._id) && <div className={classes.column2}>
                    <div
                        className={classes.column2Div}
                        style={{ backgroundColor: "violet", marginBottom: "1px" }}
                    >
                        <Button style={{ width: "100%", padding: "0", height: "100%" }}>
                       
                               <Image
                            key={props.placeList ? props.placeList[1]?._id : props.imageList[0]?._id}
                            cloudName="dkskccoaj"
                            publicId={props.placeList ? props.placeList[1]?.avatar : props.imageList[0]?.avatar}
                          
                            crop="scale"
                            style={{ width: "100%", height: "100%" }}
                        />
                        </Button>
                    </div>
                    {(props.placeList ? props.placeList[2]?._id : props.imageList[1]?._id) && <div
                        className={classes.column2Div}
                        style={{ backgroundColor: "tomato", marginTop: "1px" }}
                    >
                        <Button style={{ width: "100%", padding: "0", height: "100%" }}>
                           
                               <Image
                            key={props.placeList ? props.placeList[2]?._id : props.imageList[1]?._id}
                            cloudName="dkskccoaj"
                            publicId={props.placeList ? props.placeList[2]?.avatar : props.imageList[1]?.avatar}
                          
                            crop="scale"
                            style={{ width: "100%", height: "100%" }}
                        />
                        </Button>
                    </div>}
                </div>}
            </div>
            <div style={{ margin: "0 35px" }}>
                <Button className={classes.button} onClick={handleClickOpen}>
                    more images
                </Button>
                <Dialog
                    className={classes.moreImagesDialog}
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                >
                    <DialogContent>
                        <IconButton style={{ position: "absolute", right: "0px", margin: "30px", marginTop: "10px", zIndex: 1, height: "40px", width: "40px", backgroundColor: "rgba(32,33,36,0.6)", borderRadius: "50%" }}>
                            <Close onClick={handleClose} style={{
                                height: "30px",
                                width: "30px",
                                color: "white"
                            }} />
                        </IconButton>
                        <Carousel className={classes.carousel}>
                            {/* <div>
                                {!props.categry && props.place?._id && (<img
                                    src={`data:image/jpg;base64,${/^[A-Za-z0-9+/]+[=]{0,3}$/.test(props.place?.avatar)
                                        ? props.place?.avatar
                                        : Buffer.from(props.place?.avatar).toString("base64")
                                        }`}
                                    style={{ width: "100%", height: "100%" }}
                                ></img>)} */}

                            {(props.categry ? props.placeList : props.imageList).map((row, i) => (

<Image
key={row._id}
cloudName="dkskccoaj"
publicId={row?.avatar}
width="300"
crop="scale"
style={{ width: "100%", height: "100%" }}
/>

                            ))}
                            {/* </div> */}
                        </Carousel>
                    </DialogContent>
                </Dialog>
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
        isLoggedIn: state.vacation.isLoggedIn
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ storePlaceList, storeImageList, LoginValue, resetPlaceListAction }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(ImageCarosuel);