import * as React from 'react';

import { Image } from 'cloudinary-react';
import { Box, Button, IconButton, ImageList, ImageListItem, ImageListItemBar, makeStyles, Typography } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { backButtonAction, deleteImageAction } from '../../Store/actions/action'
// import AddAddress from './addDialog';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import UploadImageDialog from './UploadImageDialog';

const useStyles = makeStyles((theme) => ({
    add: {
        textAlign: "end",
        justifyContent: "end",
        margin: "10px",
    },
    title: {
        margin: "20px",
        fontFamily: "unset"
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 630,
        height: 230,
    },
    icon: {
        color: 'white',
        position: "absolute",
        top: -3,
        left: 200,
        "&:hover": {
            backgroundColor: "#8a7f7f7a"
        }
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
function Images(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const closeUploadDialog = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <div className={classes.add} >
                <Button variant="contained" className={classes.btn}
                    onClick={() => { setOpen(true) }}
                ><Add />Add</Button>
            </div>
            <Typography variant="h4" className={classes.title}>
                Images
            </Typography>
            <div style={{
                display: "flex",
                height: "250px",
                width: "650px",
                justifyContent: "center",
                margin: "20px",
                marginBottom : "50px",
                padding: "20px",
                border: "1px solid #d6cece",
                overflow: "auto"
            }}>
                <ImageList rowHeight={180} className={classes.imageList}>

                    {props.imageList.map((item) => (
                        <ImageListItem key={item.img}>
                        <Image
                            key={item._id}
                            cloudName="dkskccoaj"
                            publicId={item?.avatar}
                            width="300"
                            crop="scale"
                        />

                            <IconButton className={classes.icon}
                                onClick={() => { props.deleteImageAction(item._id) }
                                }
                            >
                                <Close />
                            </IconButton>


                        </ImageListItem>
                    ))}
                </ImageList>

            </div>
            <Box style={{
                display: "flex",
                background : 'white', 
                width: "100%",
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                paddingTop: "1rem",
                paddingBottom: "1rem",
                borderTop: "1px solid #80808038",
                justifyContent: "center"
            }}>
                <Button
                    className={classes.btn}

                    onClick={() => { props.handleBack(); props.backButtonAction(); }}

                    variant="contained"
                    style={{
                        marginLeft: "2rem",
                        marginRight: "2rem"
                    }}
                >
                    Back
                </Button>


                <Button onClick={() => { props.handleNext(); props.handleReset() }} variant="contained" className={classes.btn}>
                    Save
                </Button>
            </Box>
            <UploadImageDialog open={open} closeUploadDialog={closeUploadDialog} />
        </React.Fragment>
    );
}
const mapPropsToValues = (state) => {
    return {
      
        imageList: state.vacation.imageList

    }

}
const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ backButtonAction, deleteImageAction }, dispatch)
}


export default connect(mapPropsToValues, mapDispatchToProps)(Images);