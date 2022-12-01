import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Sidebar from "./Sidebar";
import { openLeftSideDrawerAction, closeLeftSideDrawerAction } from "../../Store/actions/action";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  return (
    <div style={{
      width: 200
    }}>
      <SwipeableDrawer
        anchor="left"
        variant="persistent"
        open={props.openLeftSideDrawer}
        onClose={props.closeLeftSideDrawerAction}


      >
        <Sidebar />
      </SwipeableDrawer>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vacation.isLoggedIn,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ openLeftSideDrawerAction, closeLeftSideDrawerAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SwipeableTemporaryDrawer);