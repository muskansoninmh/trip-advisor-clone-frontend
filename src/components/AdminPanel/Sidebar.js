import { Divider, Icon, IconButton, ListItemText, MenuItem, MenuList, Typography } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import React from "react";
import { closeLeftSideDrawerAction } from "../../Store/actions/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router";

import { NavLink, withRouter } from 'react-router-dom';
import Routes from "./Routes";

const Sidebar = (props) => {
  const { history } = useHistory();
  const activeRoute = (routeName) => {
    return props.location.pathname === routeName ? true : false;
  }
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "700px",
        width: "200px",
        display: "inline-block",
        verticalAlign: "top",
      }}
    >
      <div style={{
        display: "flex",


      }}>
        <Typography variant="h6" style={{
          padding: 10
        }}>
          Admin Panel
        </Typography>
        <IconButton onClick={props.closeLeftSideDrawerAction} style={{

        }}>
          {props.openLeftSideDrawer ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <MenuList onClick={props.closeLeftSideDrawerAction}>
        {Routes.map((prop, key) => {
          return (
            <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key}>
              <MenuItem selected={activeRoute(prop.path)}>
                <ListItemText primary={prop.sidebarName} style={{
                  color: "black"
                }} />
              </MenuItem>
            </NavLink>
          );
        })}
      </MenuList>
    </div >
  );
};
const SideBarRoute = withRouter(Sidebar);

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vacation.isLoggedIn,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeLeftSideDrawerAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarRoute);
