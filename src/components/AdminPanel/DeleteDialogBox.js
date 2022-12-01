import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { closeDialogAction, storePlaceList, deletePlaceAction, refreshListOnDelete } from '../../Store/actions/action';
import { connect } from 'react-redux';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';
import { bindActionCreators } from 'redux';


const useStyles = makeStyles((theme) => ({

    btn: {
        color: "black",
        background: "white",
        margin: "10px",
        border: "1px solid black",
        "&:hover": {
            color: "white",
            background: "black"
        }
    }

}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteDialogBox(props) {
    const classes = useStyles();

    return (
        <div>

            <Dialog
                open={props.openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.closeDialogAction}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogTitle >
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <Typography variant="h6" color="inherit">
                            Confirmation
                        </Typography>
                        <IconButton classname="flex items-center justify-center " onClick={props.closeDialogAction}>
                            <Close />
                        </IconButton>
                    </div>
                </DialogTitle>

                <DialogContent className="m-4">
                    <DialogContentText id="alert-dialog-slide-description" >
                        <Typography variant="h6" color="inherit" className="flex items-center w-full justify-start  ">
                            Are you sure you want to delete employee details?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className=" flex w-full items-center justify-center p-8 border-t-1 border-gray-300 ">

                        <Button autoFocus onClick={async () => {
                            await props.deletePlaceAction(props.editedPlace[0]?._id);

                            props.closeDialogAction()
                            props.refreshListOnDelete();
                            if (props.totalRecords !== props.placeList.length) {

                                await props.storePlaceList(props.searchData, 1, props.placeList.length - 1)
                            }
                        }} variant="contained" className={classes.btn}>
                            Confirm
                        </Button>
                        <Button onClick={() => { props.closeDialogAction() }} className={classes.btn} autoFocus>
                            Cancel
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div >
    );
}

const mapPropsToValues = (state) => {
    return {
        openDialog: state.vacation.openDialog,
        editedPlace: state.vacation.editedPlace,
        // page: state.Employee.demo.page,
        // rowPerPage: state.Employee.demo.page,
        // deletelength: state.Employee.demo.deletelength,
        // searchData: state.Employee.demo.searchData,
        rowPerPage: state.vacation.rowPerPage,
        page: state.vacation.page,
        placeList: state.vacation.placeList,
        totalRecords: state.vacation.totalRecords,

    }
}
const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ closeDialogAction, storePlaceList, deletePlaceAction, refreshListOnDelete }, dispatch)
}

export default connect(mapPropsToValues, mapDispatchToProps)(DeleteDialogBox);