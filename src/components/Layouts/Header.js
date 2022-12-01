import React from "react";
import clsx from "clsx";


import { makeStyles, withStyles } from "@material-ui/core/styles";

import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Input,

  Slide,

} from "@material-ui/core";

import { Toolbar } from "@material-ui/core";
import * as yup from "yup";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDebouncedCallback } from "use-debounce/lib";
import {
  openLeftSideDrawerAction,
  closeLeftSideDrawerAction,
  logoutUser,
  loginUser,
  openSearchBoxAction,
  closeSearchBoxAction,
  storeUserList,
  storePlaceList,
  openLoginDialogAction,
  resetPlaceListAction
} from "../../Store/actions/action";

import { FavoriteBorder, Inbox, Mail, Search } from "@material-ui/icons";

import SwipeableTemporaryDrawer from "../AdminPanel/SideDrawer";
import { Menu } from "@material-ui/icons";
import SignInOutContainer from "../SignInOutContainer";

import SearchBox from "./SearchBox";


const drawerWidth = 200;



const useStyles = makeStyles((theme) => ({
  root: {
    marign: "0px",
    padding: "0px",
    width: "100%",
    display: "flex",
    "& .MuiMenuItem-root": {
      fontWeight: 600
    }
  },

  title: {
    color: "black",
  },
  appBar: {
    background: "white",

    position: "fixed",
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    background: "black",
    color: "white",
    minWidth: "100px",
    borderRadius: "15px",

    border: "1px solid black",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    [theme.breakpoints.up('sm')]: {

      marginInlineStart: "20px",

    }
  },
  tripbutton: {
    background: "white",
    color: "black",

    borderRadius: "15px",

    [theme.breakpoints.up('sm')]: {

      marginInlineStart: "20px",
      width: "100px",
    }

  },
  profile: {
    opacity: 1,
    width: "auto",
    height: "35px",
    border: "2px solid beige",
  },
  logo: {
    height: "70px",
    marginTop: "10px",
    [theme.breakpoints.up('sm')]: {
      height: "90px",
      marginTop: "0px",
    }
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  overlay: {
    "& .styles_overlay-close": {
      display: "none"
    }
  },
  modal: {
    marginTop: "10px"
  },
  searchPaper: {
    display: "flex",



    padding: "4px",
    margin: "25px 0px 40px 5px",




    flexGrow: 1,
    borderRadius: "20px",
    [theme.breakpoints.up('md')]: {

      minWidth: "500px",
      margin: "25px",
      marginBottom: "40px",

    }
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const configs = {
  animate: true,

  focusOutline: false,
};
const Header = (props) => {
  const matches = useMediaQuery('(min-width:600px)');

  const {

    handleSubmit,

  } = props;

  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const user = (JSON.parse(localStorage.getItem("User")));
  const anchorRef = React.useRef(null);
  const customHandleSubmit = async (e) => {
    await handleSubmit(e);

    // }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const setValueDebounced = useDebouncedCallback(async (name) => {

    const resp = await props.storePlaceList(name);

    if (resp.data.user.length === 0) {
      const resp = await props.storeUserList(name);
    }

  }, 1000);
  const handleSearchField = (val) => {



    if (val.trim().length >= 3 ) {

      props.resetPlaceListAction(val)

      val.length !== 0 && setValueDebounced(val)
    }

  }

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }


  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div >

      <div className={classes.root}>
        <AppBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: props.openLeftSideDrawer,
          })}
        >
          <Toolbar className={classes.toolbar}>
            <div style={{
              display: "flex"
            }}>
              <div
                style={{
                  display: "flex"
                }}

              >
                {props.admin && (
                  <IconButton onClick={() => props.openLeftSideDrawerAction()}>
                    <Menu />
                  </IconButton>
                )}
                <img
                  src={window.location.origin + `/assets/images/download.png`}
                  className={classes.logo}
                  onClick={() => {
                    history.push('/')
                  }}
                />
 
              </div>

              {matches && <Paper
                className={classes.searchPaper}
                elevation={3}
              >
                <Search
                  color="action"
                  className="text-18 ml-8 "
                  style={{
                    margin: "5px",
                    color: "black",
                  }}
                >
                  Search
                </Search>

                <Input
                  placeholder="Search name.... "
               
                  disableUnderline
                  style={{ marginLeft: "10px" }}
                  fullWidth
                  // value={props.searchData}
                  onChange={
                    (event) => handleSearchField(event.target.value)
                  }

                  onClick={() => {
                   { (JSON.parse(localStorage.getItem("User")))?.role !== "Admin" &&
                     
                     props.openSearchBoxAction()
                    
                      
                    }
                    console.log("dfsdf", props)
                  }}

                />

              </Paper>
              }

            </div>
            <div style={{
              display: "flex"
            }}>
              {!matches &&
                <div>
                  <Search
                    color="action"

                    style={{

                      color: "black",
                      margin: "10px 0px 0px 20px",


                    }}
                    onClick={() => {
                      {
                        (JSON.parse(localStorage.getItem("User")))?.role !== "Admin" &&
                       props.openSearchBoxAction()
                       
                      }
                    }}
                  >
                    Search
                  </Search>
                </div>
              }
              {!props.admin && (
                <Button
                  className={classes.tripbutton}

                  onClick={() => {
                    if (localStorage.getItem("Token")) {
                      history.push("/trip");
                    }
                    else {
                      props.openLoginDialogAction()
                    }
                  }}
                >
                  <FavoriteBorder /> {matches && "Trip"}
                </Button>
              )}

              {!props.isLoggedIn

                && (
                  <Button
                    className={classes.button}

                    onClick={props.openLoginDialogAction}
                  >
                    Sign In
                  </Button>
                )}




              {props.isLoggedIn

                &&
                (
                  <Button
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <Avatar

                      src={
                        user?.avatar ?
                          `data:image/jpg;base64,${/^[A-Za-z0-9+/]+[=]{0,3}$/.test(props.recentLoggedInUser?.avatar || user?.avatar)
                            ? props.recentLoggedInUser?.avatar || user?.avatar
                            : Buffer.from(props.recentLoggedInUser?.avatar || user?.avatar).toString(
                              "base64"
                            )
                          }` : (window.location.origin + `/assets/images/profile.jpg`)}
                      className={classes.profile}
                    />
                  </Button>
                )}


            </div>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={() => {
                            history.push('/profile')
                          }}>
                          View Profile
                        </MenuItem>
                        {(JSON.parse(localStorage.getItem("User")))?.role === "User" && <MenuItem
                          onClick={() => {
                            history.push('/booking')
                          }}>
                          View Bookings
                        </MenuItem>}
                        <MenuItem
                          onClick={(e) => {
                            handleClose(e);
                            props.logoutUser();
                            localStorage.removeItem("Token");
                           
                            if ((JSON.parse(localStorage.getItem("User")))?.role === "Admin") {
                              history.push('/');

                            }
                            else if ((JSON.parse(localStorage.getItem("User")))?.role !== "User") {
                              history.push('/')
                            }
 localStorage.removeItem("User");
                            // localStorage.removeItem("Role");

                          }}
                        >
                          Sign out
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Toolbar>
        </AppBar>

      </div>
      <SearchBox />


      <SwipeableTemporaryDrawer />
      <SignInOutContainer />
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vacation.isLoggedIn,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
    searchData: state.vacation.searchData,
    recentLoggedInUser: state.vacation.recentLoggedInUser,

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
      closeSearchBoxAction,
      storeUserList
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);