import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import Header from "../Layouts/Header";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";


import Tables from './Table';


const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
    content: {
        width: "100%",
        paddingLeft: "20px",
        marginTop: "110px"
    },
    contentShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        marginTop: "110px",
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // marginLeft: 0,
    },
}));

const PlaceList = (props) => {
    const classes = useStyles()
    return (
        <div className={clsx(classes.content, {
            [classes.contentShift]: props.openLeftSideDrawer,
        })}>
            <Header admin="Admin-Place" />

            <Tables place={true} />

        </div>


    );
};
const mapPropsToValues = (state) => {
    return {
        openLeftSideDrawer: state.vacation.openLeftSideDrawer
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(PlaceList);
