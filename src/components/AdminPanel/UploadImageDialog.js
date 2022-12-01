import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { closeDialogAction, storePlaceList, deletePlaceAction, refreshListOnDelete, addImageAction } from '../../Store/actions/action';
import { connect } from 'react-redux';
import { CircularProgress, IconButton, makeStyles, Typography } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';
import { bindActionCreators } from 'redux';
import { PhotoCamera } from '@material-ui/icons';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
    avatar: {
        // justifyContent: "center",

        width: "300px",
        height: "150px",
        display: "flex",
    },
    box: {
        display: "flex",
        height: "200px",
        width: "400px",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        border: "1px solid #d6cece",
        "& .MuiIconButton-colorPrimary": {
            color: "black"
        },
    },
    imageInput: {
        display: "none"
    },
    iconbutton: {
        width: "50px",
        height: "50px"
    },
    icon: {
        width: "50px",
        height: "50px"
    },
    iconShift: {
        width: "30px",
        height: "30px"
    },
    lbl: {
        width: "200px",
        textAlign: "center"
    },

    dialogTitleTypo: {
        display: "flex",
        width: "100%",

    },

    dialogTitleIcon: {
        display: "flex",

    },
    btn: {
        color: "black",
        background: "white",
        marginInlineEnd: "10px",
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
    const [file, setFile] = useState('');
    const [load, setLoad] = useState(false);
    const [url, setURL] = useState({});

    const uploadImages = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setFile(reader.result)
        };

     

        // setValues({
        //     ...values,
        //     file: e.target.files[0],
        // });
        setURL(URL.createObjectURL(e.target.files[0]));
        // setIsSubmitting(true);
    };
    return (
        <div>

            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.closeUploadDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogTitle >
                    <div style={{
                        display: "flex"
                    }}>
                        <Typography variant="h6" color="inherit" className={classes.dialogTitleTypo}>
                            Upload Image
                        </Typography>
                        <IconButton classname={classes.dialogTitleIcon} onClick={props.closeUploadDialog}>
                            <Close />
                        </IconButton>
                    </div>
                </DialogTitle>

               {!load && <DialogContent className="m-4">

                    <div className={classes.box}>
                        <input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            className={classes.imageInput}

                            onChange={uploadImages}
                        />
                        {file.length > 0 && <img src={`${url}`} className={classes.avatar} />}


                 

                        < label htmlFor="icon-button-file" className={classes.lbl}>
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                className={classes.iconbutton}
                            >
                                <PhotoCamera className={clsx(classes.icon, {
                                    [classes.iconShift]: file.name,
                                })} />
                            </IconButton>
                        </label>
                    </div>
                </DialogContent>}
                {load && (
          <div className={classes.avatar} style={{alignItems : "center" , justifyContent : "center"}}>
            <CircularProgress />{" "}
          </div>
        )}
                <DialogActions>
                    <div className=" flex w-full items-center justify-center p-8 border-t-1 border-gray-300 ">

                        <Button autoFocus disabled={load} onClick={async () => {
                            setLoad(true);
                            props.drawerContent.label === "ADD" ? 
                            await props.addImageAction(file, props.addedPlace[0]._id)
                             : await props.addImageAction(file, props.editedPlace[0]._id);
                             setLoad(false);
                            props.closeUploadDialog();
                            setFile('');
                            setURL({})

                        }} variant="contained" className={classes.btn}>
                            Save
                        </Button>
                        <Button disabled={load} onClick={() => { props.closeUploadDialog() }} className={classes.btn} autoFocus>
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
        addedPlace: state.vacation.addedPlace,
        // page: state.Employee.demo.page,
        // rowPerPage: state.Employee.demo.page,
        // deletelength: state.Employee.demo.deletelength,
        // searchData: state.Employee.demo.searchData,
        rowPerPage: state.vacation.rowPerPage,
        page: state.vacation.page,
        placeList: state.vacation.placeList,
        drawerContent: state.vacation.drawerContent


    }
}
const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ closeDialogAction, storePlaceList, deletePlaceAction, refreshListOnDelete, addImageAction }, dispatch)
}

export default connect(mapPropsToValues, mapDispatchToProps)(DeleteDialogBox);