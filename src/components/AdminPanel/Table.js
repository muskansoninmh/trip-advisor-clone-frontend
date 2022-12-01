import React from "react";
import HorizontalSlider from "../Layouts/HorizontalSlider";
import Typography from "@material-ui/core/Typography";
import { Image } from 'cloudinary-react';

import { AutoRotatingCarousel } from "material-auto-rotating-carousel";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Paper,
  TablePagination,
  Box,
} from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { connect } from "react-redux";
import {
  openDrawerAction,
  storePlaceList,
  LoginValue,
  storeUserList,
  openLeftSideDrawerAction,
  closeLeftSideDrawerAction,
  editedPlacedIdAction,
  changeRowPerPageAction,
  changePageAction,
  openDialogAction,
  verifyTokenAction,
  resetPlaceListAction,
} from "../../Store/actions/action";
import { bindActionCreators } from "redux";
import Form from "./GeneralInfoForm";
import StepperDialog from "./Stepper";
import { Create, Delete } from "@material-ui/icons";

import DeleteDialogBox from "./DeleteDialogBox";
import Stepper from "./Stepper";

const drawerWidth = 200;
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
      height: "0.5rem",
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  button: {
    textAlign: "right",
    marginRight: "30px",
    background: "white",
    color: "black",
    width: "150px",
    borderRadius: "15px",
    border: "1px solid black",
    marginInlineStart: "20px",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  viewbutton: {
    textAlign: "right",
    marginLeft: "35px",
    background: "white",
    color: "black",
    width: "120px",
    borderRadius: "15px",
    border: "1px solid black",
    // marginInlineStart: "20px",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  content: {
    width: "100%",
    paddingLeft: "20px",
  },
  contentShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Tables = (props) => {
  const classes = useStyles();
  React.useEffect(async () => {
    const verifyRes = await props.verifyTokenAction();

    if (
      verifyRes?.status === 200 &&
      localStorage.getItem("Role") === "Admin"
    ) {
      props.LoginValue();
    }
    console.log(props.place);

    if (!props.searchData) {
      props.resetPlaceListAction();
      props.place ? props.storePlaceList() : props.storeUserList();
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log(
      props.placeList.length % props.rowPerPage === 0
        ? props.rowPerPage
        : props.rowPerPage + 1
    );
    if (
      newPage > props.page &&
      props.totalPlaces > props.placeList.length
      // && props.searchlength !== props.placeList.length
    ) {
      {
        props.place &&
          props.storePlaceList(
            props.searchData,
            props.placeList.length % props.rowPerPage === 0
              ? props.rowPerPage
              : props.rowPerPage - 1,
            newPage === 0
              ? props.rowPerPage
              : props.placeList.length % props.rowPerPage === 0
              ? newPage * props.rowPerPage
              : newPage * props.rowPerPage + 1
          );
      }
      {
        !props.place &&
          props.storeUserList(
            props.searchData,
            props.placeList.length % props.rowPerPage === 0
              ? props.rowPerPage
              : props.rowPerPage - 1,
            newPage === 0
              ? props.rowPerPage
              : props.placeList.length % props.rowPerPage === 0
              ? newPage * props.rowPerPage
              : newPage * props.rowPerPage + 1
          );
      }
    }
    props.changePageAction(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.changeRowPerPageAction(parseInt(event.target.value), 10);

    props.changePageAction(0);
    if (
      props.placeList.length !== event.target.value &&
      props.totalRecords >= event.target.value
    ) {
      {
        props.place &&
          props.storePlaceList(props.searchData, event.target.value, 0);
      }

      {
        !props.place &&
          props.storeUserList(props.searchData, event.target.value, 0);
      }
    }
  };

  const editHandler = (id) => {
    props.openDrawerAction({ label: "EDIT" });
    props.editedPlacedIdAction(id);
    console.log(id);
  };

  const addHandler = (id) => {
    props.openDrawerAction();

    props.drawerContentAction({
      buttonLabel: "ADD",
    });
  };

  const deleteHandler = (id) => {
    props.openDialogAction();
    props.editedPlacedIdAction(id);
  };

  return (
    <div>
      <Paper
        style={{
          paddingRight: "20px",
        }}
      >
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">
                  {props.place ? "Name" : "First Name"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {props.place ? "Category" : "Last Name"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {props.place ? "Season" : "Email"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {props.place ? "Country" : "Contact"}
                </StyledTableCell>
                {props.place && (
                  <StyledTableCell align="center">State</StyledTableCell>
                )}
                {props.place && (
                  <StyledTableCell align="center">City</StyledTableCell>
                )}
                {props.place && (
                  <StyledTableCell align="center">Address</StyledTableCell>
                )}
                {props.place && (
                  <StyledTableCell align="center">Action</StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody className="overflow-y-auto ">
              {(props.place ? props.placeList : props.userList)
                .slice(
                  props.page * props.rowPerPage,
                  props.page * props.rowPerPage + props.rowPerPage
                )
                .map((row) => (
                  <StyledTableRow>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Avatar
                       
                      >
                        <Image
                            key="1"
                            cloudName="dkskccoaj"
                            publicId={row?.avatar}
                            width="50"
                            crop="scale"
                        />
                        </Avatar>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {props.place ? row.name : row.first_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {props.place ? row.category : row.last_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {props.place ? row.season : row.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {props.place ? row.country?.name : row.contact}
                    </StyledTableCell>
                    {props.place && (
                      <StyledTableCell align="center">
                        {row.state?.name}
                      </StyledTableCell>
                    )}
                    {props.place && (
                      <StyledTableCell align="center">
                        {row.city?.name}
                      </StyledTableCell>
                    )}
                    {props.place && (
                      <StyledTableCell align="center">
                        {row.address}
                      </StyledTableCell>
                    )}

                    {props.place && (
                      <StyledTableCell>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            editHandler(row._id);
                            // props.storeAddressAction(row._id)
                          }}
                        >
                          <Create />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            deleteHandler(row._id);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={props.place ? props.totalPlaces : props.totalUsers}
          rowsPerPage={props.rowPerPage}
          page={props.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Stepper />
      <DeleteDialogBox />
    </div>
  );
};
const mapPropsToValues = (state) => {
  return {
    // isLoggedIn: state.vacation.isLoggedIn,
    placeList: state.vacation.placeList,
    userList: state.vacation.userList,
    totalPlaces: state.vacation.totalPlaces,
    totalUsers: state.vacation.totalUsers,
    page: state.vacation.page,
    rowPerPage: state.vacation.rowPerPage,
    searchData: state.vacation.searchData,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      openDrawerAction,
      storePlaceList,
      LoginValue,
      storeUserList,
      openLeftSideDrawerAction,
      closeLeftSideDrawerAction,
      editedPlacedIdAction,
      changeRowPerPageAction,
      changePageAction,
      openDialogAction,
      verifyTokenAction,
      resetPlaceListAction,
    },
    dispatch
  );
};

export default connect(mapPropsToValues, mapDispatchToProps)(Tables);
