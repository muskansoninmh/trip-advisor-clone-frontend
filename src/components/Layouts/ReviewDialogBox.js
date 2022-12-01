import React from "react";
import {

    Button,
    Typography,

} from "@material-ui/core";

import {
    Slide,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { addReviewAction, closeReviewBoxAction, editReviewAction } from "../../Store/actions/action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withFormik, Form } from "formik";

import * as yup from "yup";
import { Rating } from "@material-ui/lab";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({


    dialogSize: {
        paddingRight: "25px",
        height: "650px",
        display: "flex",
    },

    DialogLeftColumn: {
        width: "750px",
        height: "100%",
        paddingTop: "5px",
        paddingLeft: "20px",
    },
    imgCloseIconDiv: {
        display: "flex",
        margin: "15px 0px",
        justifyContent: "space-between",
    },
    button: {
        border: "1px solid black",
        height: "30px",
        borderRadius: "3px",
        backgroundColor: "#f2f2f2",
        color: "black",
        fontWeight: "600",
        "&:hover": {
            backgroundColor: "black",
            color: "white",
        },
    },

    TextfieldHeading: {
        fontSize: "0.8rem",
        fontWeight: "600",
        marginBottom: "2px",
        marginTop: "10px"
    },
    textfield: {
        padding: "0px",
        width: "100%",
        // marginBottom: "10px",
        marginTop: "10px",
        marginBottom: "15px",

        "& .MuiInputBase-root": {
            height: "90px",
            borderRadius: "0px",
            alignItems: "flex-start",


            "& .MuiOutlinedInput-input ": {
                // padding: "0px",
                borderRadius: "0px",
            },
        },
    },
    ButtonDiv: {
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
    },
    titleHeading: {
        fontWeight: 700
    }
}));

const ReviewDialogBox = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
        setValues
    } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (

        <Dialog
            style={{ maxWidth: "none !important", maxHeight: "400px" }}
            open={props.openReviewBox}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.closeReviewBoxAction}
        >

            <div className={classes.dialogSize}>

                <div className={classes.DialogLeftColumn}>
                    <div className={classes.imgCloseIconDiv}>
                        <Typography className={classes.titleHeading}>
                            {props.reviewBoxContent.label === "EDIT" ? "Edit A Review" : "Write a Review"}
                        </Typography>

                        <Close onClick={props.closeReviewBoxAction} />
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <Typography component="legend" className={classes.TextfieldHeading}>Rate Us</Typography>
                            <Rating
                                name="simple-controlled"
                                value={values.rating}
                                onChange={(event, newValue) => {
                                    setValues({
                                        ...values,
                                        rating: newValue
                                    })
                                }}
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{
                                width: "100%"
                            }}>
                                <Typography className={classes.TextfieldHeading}>
                                    Leave A Review
                                </Typography>
                                <TextField
                                    error={touched.review && errors.review}
                                    className={classes.textfield}
                                    id="review"
                                    type="String"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.review}
                                    onBlur={handleBlur}
                                    helperText={touched.review && errors.review}
                                    fullWidth
                                    required
                                    multiline
                                    rowsMax="4"
                                />
                            </div>
                        </div>
                        <div className={classes.ButtonDiv}>
                            <Button
                                type="submit"
                                style={{ marginRight: "15px" }}
                                className={classes.button}
                                onClick={props.closeReviewBoxAction}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className={classes.button}>
                                {props.reviewBoxContent.label === "EDIT" ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

        </Dialog>

    );
};

const ReviewDialogBoxWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const editedReview = props.reviewBoxContent.label === "EDIT" && props.place?.reviews.filter((place) => place._id === props.reviewId)
        console.log(editedReview);
        return {
            rating: props.reviewBoxContent.label === "EDIT" ? editedReview[0].rating : "",
            review: props.reviewBoxContent.label === "EDIT" ? editedReview[0].review : "",
        };
    },
    validationSchema: yup.object().shape({
        rating: yup.number().required("Rating is required"),
        review: yup.string().required("Review is required")

    }),
    handleSubmit: async (data, { props }) => {

        if (props.reviewBoxContent.label === "ADD") {
            props.addReviewAction(data);
            props.closeReviewBoxAction();
        }
        else if (props.reviewBoxContent.label === "EDIT") {
            props.editReviewAction(data);
            props.closeReviewBoxAction();
        }
    },
})(ReviewDialogBox);
const mapStateToProps = (state) => {
    return {

        openReviewBox: state.vacation.openReviewBox,
        reviewBoxContent: state.vacation.reviewBoxContent,
        reviewId: state.vacation.reviewId,
        place: state.vacation.place

    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addReviewAction, closeReviewBoxAction, editReviewAction }, dispatch);
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewDialogBoxWithFormik);
