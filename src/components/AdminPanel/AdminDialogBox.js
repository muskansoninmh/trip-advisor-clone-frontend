import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Form, withFormik } from 'formik';
import * as yup from 'yup';
// import { errorMessage, resetErrorMessage, storeRecentUser } from '../store/actions/actions';
import { connect } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import { addAdminAction } from '../../Store/actions/action';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Close } from '@material-ui/icons';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles((theme) => ({
    root: {

        padding: "10px",
        justifyItems: "center"
    },
    textfield: {
        '& > *': {

            width: '15rem',
            marginBottom: "25px"
        },
    },

    root1: {

        '& > *': {
            margin: theme.spacing(10),
            width: theme.spacing(50),


            // height: theme.spacing(16),
        },
    },
    dialogTitleTypo: {
        display: "flex",
        width: "100%",

    },

    dialogTitleIcon: {
        display: "flex",

    },
    label: {


        margin: "10px",
        marginLeft: "0px",

        fontWeight: 600
    },
    btn: {
        color: "black",
        background: "white",

        border: "1px solid black",
        "&:hover": {
            color: "white",
            background: "black"
        }
    }

}));


function AddAdmin(props) {
    // const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const classes = useStyles();
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        reset
    } = props;
    const customHandleChange = (event) => {

        handleChange(event)
    }

    return (
        <div>
            <Dialog
                // fullScreen={fullScreen}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="responsive-dialog-title"

            >
                <DialogTitle >
                    <div style={{
                        display: "flex"
                    }}>
                        <Typography variant="h6" color="inherit" className={classes.dialogTitleTypo}>
                            Add Admin
                        </Typography>
                        <IconButton classname={classes.dialogTitleIcon} onClick={props.handleClose}>
                            <Close />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>

                    <Form className={classes.root} autoComplete="off" >
                        {/* <h1 align="center">REGISTER</h1> */}

                        <div >
                            <Typography className={classes.label}>Email:</Typography>
                            <TextField
                                align="left"

                                error={touched.email
                                    && errors.email}
                                // className={classes.textfield}
                                id="email"
                                variant="outlined"
                                size="small"

                                onChange={customHandleChange}
                                value={values.email}
                                onBlur={handleBlur}
                                helperText={touched.email
                                    && errors.email}
                            />

                        </div>
                        <div>
                            <Typography className={classes.label}>Password:</Typography>
                            <TextField
                                align="left"
                                error={touched.password
                                    && errors.password}

                                id="password"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                value={values.password}
                                onBlur={handleBlur}
                                helperText={touched.password
                                    && errors.password}
                                type="password"
                            /></div>


                        {props.errorMessage && <p>{props.errorMessage}</p>}
                    </Form>

                </DialogContent>
                <DialogActions style={{ margin: "10px" }}>
                    <Button variant="contained" className={classes.btn} onClick={handleSubmit}>Add</Button>
                    <Button autoFocus onClick={props.handleClose} className={
                        classes.btn
                    }>
                        Close
                    </Button>
                    {/* <Button onClick={props.handleClose} color="primary" autoFocus>
                        Agree
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}

const AddAdminWithFormik = withFormik(
    {
        mapPropsToValues: () => {
            return {

                email: "",
                password: "",

            }
        },
        validationSchema: yup.object().shape({

            email: yup.string().email().required("Email is required"),
            password: yup.string().required("Password is required").min(8),

        }),
        handleSubmit: async (data, { props }) => {
            console.log(data, props);

            props.addAdminAction(data);
            props.handleClose();

            try {

            }
            catch (e) {
                console.log(e);
            }

        }
    }
)(AddAdmin);

const mapPropsToValues = (state) => {
    return {
        // userList: state.demo.userList,
        // errorMessage: state.demo.errorMessage,

    }

}
const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ addAdminAction }, dispatch)
}

export default connect(mapPropsToValues, mapDispatchToProps)(AddAdminWithFormik);