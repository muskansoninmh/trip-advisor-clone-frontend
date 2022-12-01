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
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Paper from '@material-ui/core/Paper';
import { Avatar, Box, Drawer, Fab, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import { SwipeableDrawer, Divider } from '@material-ui/core';
import { closeDrawerAction, backButtonDisabledAction } from '../../Store/actions/action';
import { bindActionCreators } from 'redux';
import { Add } from '@material-ui/icons';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import GeneralInfoForm from './GeneralInfoForm';
import Images from './Images';


const steps = ['General Information', 'Images'];


const useStyles = makeStyles((theme) => ({
    box: {
        width: "700px",
        overflow: "hidden"
    }
}));

function StepperDialog(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());


    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const handleNext = () => {
        if (activeStep === 1) {
            handleReset();
            props.closeDrawerAction();
        }
        else {


            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);

            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);

        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    return (
        <div >
            <SwipeableDrawer
                anchor="right"
                open={props.openDrawer}
                onClose={() => { props.closeDrawerAction(); setActiveStep(0) }}

            // onOpen={toggleDrawer(true)}
            >

                <div style={{
                    // paddingTop: "10px",
                    height: "60px",
                    padding: 10,
                    paddingBottom: 0,
                    // background: "#8080806e"
                    // borderBottom: "1px solid grey"
                }}>
                    <div style={{
                        display: "flex",
                        width: "100%",

                        paddingLeft: "10px"
                    }}>
                        <div style={{
                            display: "flex",
                            width: "50%",

                        }}>
                            <Typography variant="h6" color="inherit" >
                                {props.drawerContent.label}
                            </Typography>
                        </div>
                        <div style={{
                            display: "flex",
                            marginLeft: "auto",
                            flexWrap: "wrap"
                        }}>
                            <IconButton onClick={() => { props.closeDrawerAction(); props.backButtonDisabledAction(); setActiveStep(0) }}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>

                <Divider />
                <Box className={classes.box}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep !== steps.length && (
                        <React.Fragment>
                            {activeStep === 0 && <GeneralInfoForm handleNext={handleNext} handleReset={handleReset} />}
                            {activeStep === 1 && <Images handleBack={handleBack} handleNext={handleNext} handleReset={handleReset} />}

                        </React.Fragment>
                    )}
                </Box>

            </SwipeableDrawer>
        </div >
    );
}

const mapPropsToValues = (state) => {
    return {
        openDrawer: state.vacation.openDrawer,
        drawerContent: state.vacation.drawerContent


    }

}

const mapDispatchToProps = (dispatch) => {


    return bindActionCreators({ closeDrawerAction, backButtonDisabledAction }, dispatch)

}

export default connect(mapPropsToValues, mapDispatchToProps)(StepperDialog);