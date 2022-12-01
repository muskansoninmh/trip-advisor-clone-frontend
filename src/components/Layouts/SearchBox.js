import React from "react";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {

    Input,


} from "@material-ui/core";
import Modal from '@material-ui/core/Modal';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Paper from "@material-ui/core/Paper";

import { useDebouncedCallback } from "use-debounce/lib";
import {
    openLeftSideDrawerAction,
    closeLeftSideDrawerAction,
    logoutUser,
    loginUser,
    openSearchBoxAction,
    closeSearchBoxAction,
    LoginValue,
    storePlaceList,
    openLoginDialogAction,
    resetPlaceListAction
} from "../../Store/actions/action";

import { Search } from "@material-ui/icons";

import Suggestion from "./Suggestion";
import { useHistory } from "react-router-dom";

import { useTheme } from '@material-ui/core/styles';
import ArrowBack from "@material-ui/icons/ArrowBack";




const useStyles = makeStyles((theme) => ({

    modal: {
        marginTop: "-17px",

        [theme.breakpoints.up('md')]: {
            marginTop: "10px"
        }
    },
    searchPaper: {

        padding: "4px",
        justifyContent: "center",
        margin: "16px",
        padding: "16px",
        marginLeft: "0px",
        marginRight: "0px",
        flexGrow: 1,

        [theme.breakpoints.up('md')]: {
            marginLeft: "200px",
            marginRight: "350px",
            borderRadius: "20px",
        }
    }
}));


const SearchBox = (props) => {
    const theme = useTheme();
    const [value, setValue] = React.useState('');
    const classes = useStyles();
    const history = useHistory();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const setValueDebounced = useDebouncedCallback(async (name) => {
       
        props.resetPlaceListAction();
        await props.storePlaceList(name);


    }, 1000);
    const handleEnterSearchField = (val) => {
        props.resetPlaceListAction();

        if (val.trim().length >= 3 || val.length === 0) {
        
             props.resetPlaceListAction();

            { props.filterCategory ? history.push(`/search/${val}/${props.filterCategory}`) : history.push(`/search/${val}/all`) }
            props.closeSearchBoxAction();
        }
    };
    const handleSearchField = (val) => {
       
        props.resetPlaceListAction();

        if (val.trim().length >= 3 || val.length === 0) {
     


            setValueDebounced(val);
        }
    };


    return (
        <div >
            <Modal fullScreen={fullScreen}
                open={props.openSearchBox}
                onClose={() => props.closeSearchBoxAction()}

                className={classes.modal}

            >

                <Paper
                    className={classes.searchPaper}

                    elevation={3}
                >
                    <div style={{
                        display: "flex"
                    }}>
                        <ArrowBack
                            color="action"
                            className="text-18 ml-8 "
                            style={{
                                margin: "5px",
                                color: "black",
                            }}
                            onClick={() => props.closeSearchBoxAction()}
                        >
                            Search
                        </ArrowBack>

                        <Input
                            placeholder="Search name.... "
                            disableUnderline
                            // value={props.searchData}
                            style={{ marginLeft: "10px" }}
                            fullWidth
                            // inputProps={{ "aria-label": "Search" }}
                            onChange={(e) => {
                                setValue(e.target.value); handleSearchField(e.target.value)
                            }}

                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleEnterSearchField(event.target.value)
                                }
                            }}
                        />
                    </div>


                    <Suggestion value={value} />

                </Paper>

            </Modal>



        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.vacation.isLoggedIn,
        openLeftSideDrawer: state.vacation.openLeftSideDrawer,
        openSearchBox: state.vacation.openSearchBox,
        filterCategory: state.vacation.filterCategory,
        searchData : state.vacation.searchData
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            openLeftSideDrawerAction,
            closeLeftSideDrawerAction,
            logoutUser,
            openLoginDialogAction,
            storePlaceList,
            resetPlaceListAction,
            openSearchBoxAction,
            closeSearchBoxAction
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
