import React, { useEffect } from "react";
import { Box, CssBaseline, Paper } from "@material-ui/core";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Pagination, Rating } from "@material-ui/lab";
import {
  Book,

  LocationOnOutlined,

} from "@material-ui/icons";
import {Image} from 'cloudinary-react'
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import { connect } from "react-redux";
import { storePlaceAction, storeImageList, LoginValue, addTripAction, storePlaceList, resetPlaceListAction, openLoginDialogAction, closeSearchBoxAction, verifyTokenAction, LogoutValue } from "../Store/actions/action";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import SearchCard from "./Layouts/SearchCard";
import { values } from "lodash";

const useStyles = makeStyles((theme) => ({
  linksDiv: {
    // backgroundColor: "lightcoral",
    height: "50px",
    marginTop: "90px",
    position: "relative",

    // display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  links: {
    color: "gray",
    "&:hover": {
      //   backgroundColor: "black",
      color: "#000000bd",
    },
  },
  headingDivWithRating: {
    margin: " 25px 35px",
    height: "90px",
    // backgroundColor: "honeydew",
  },

  headingDiv: {
    height: "60px",
    display: "flex",
    justifyContent: "space-between",
  },
  ratingCount: {
    marginLeft: "10px",
    fontFamily: "standard",
    fontWeight: "500",
    fontSize: "0.9rem",
  },
  totalPlacesInCityDiv: {
    margin: "20px 35px",
    // backgroundColor: "red",
    width: "250px",
    border: "2px solid lightgary",
  },
  totalPlacesInCity: {
    fontWeight: "600",
    backgroundColor: "#eceae5",
    border: " 1px solid lightgray",
    padding: "3px",
    fontSize: "0.8rem",
  },
  addressArrow: {
    color: "#000000bd",
    fontSize: "0.7rem",
    margin: "5px 10px",
  },
  PlaceDiv: {
    margin: "20px 35px",
    maxHeight: "250px",
    maxWidth: "800px",
    border: "1px solid lightgray",
    display: "flex",
  },
  placeDesc: {
    width: "60%",
    // backgroundColor: "wheat",
    padding: "20px 30px",
  },
  placeHeading: {
    textTransform: "capitalize",
    fontSize: "30px",
    lineHeight: "24px",
    letterSpacing: "normal",
    fontWeight: "bold",
  },
  placeRate: {

    fontSize: "1.4rem",
    fontWeight: "600",
    // marginInlineStart: "50px",
  },
  descLeft: {
    width: "50%",
    // backgroundColor: "turquoise",
    height: "80%",
    margin: "20px 0px",
  },
  descRight: {
    width: "50%",
    // backgroundColor: "tomato",
    height: "80%",
    margin: "20px 0px",
    borderLeft: "1px solid lightgray",
    padding: "20px",
  },
  root: {
    // flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    "&  .Mui-selected": {
      color: "#000"
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#000"
    }
  },
  tab: {
    marginLeft: "10px",
    marginRight: "10px"
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const CityTour = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const [valueTab, setValueTab] = React.useState(0);
  window.scroll(0, 0);
  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  // console.log(props.placeList);
  useEffect(async () => {

    window.scroll(0, 0);
    setLoading(true);
    props.closeSearchBoxAction();

    setValueTab(props.match.params.category === "Hotels" ? 1 :
      props.match.params.category === "Religious" ? 2 :
        props.match.params.category === "Restaurants" ? 3 :
          props.match.params.category === "Holiday Homes" ? 4 :
            props.match.params.category === "Package Holidays" ? 5 :
              props.match.params.category === "Outing Places" ? 6 : 0
    )

    const verifyRes = await props.verifyTokenAction();

    if (verifyRes?.status === 200 && (JSON.parse(localStorage.getItem("User")))?.role === "User") {
      props.LoginValue();
    }
    props.resetPlaceListAction();
    // console.log(props.match.params.category);
    const res = await props.storePlaceList(props.match.params.name, 5, 0, false, props.match.params.category !== 'all' ? props.match.params.category : '');
    if (res.status === 200) {

      setLoading(false)
    }

  }, [props.match.params.name, props.isLoggedIn]);
  const handleChangePage = async (event, page, category) => {
    console.log(
      event, page
    );


    setValue(page)

    if (page > value && props.searchlength > props.placeList.length) {
      setLoading(true)
      const res = await props.storePlaceList(props.searchData, 5, (page - 1) * 5, false, category);
      if (res.status === 200) {

        setLoading(false)
      }
    }


  };

  function TabData(props) {
    return (<div>
      {props.placeList.length === 0 &&
        <div style={{
          margin: "50px",
          height: "400px"
        }}>
          <Typography style={{
            fontFamily: "system-ui",
            fontWeight: 900,
            fontSize: "1.5rem",
            color: "#5f5d5d",


          }}>
            No  {props.category} Available
          </Typography>

        </div>
      }

      {props.placeList.slice((props.value - 1) * 5, props.searchlength < props.value * 5 ? props.searchlength : props.value * 5).map((row) => (

        <SearchCard place={row} >

        </SearchCard>

      ))
      }
      {props.placeList.length !== 0 && <div style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin: "20px"
      }}>
        <Pagination
          count={props.searchlength % 5 === 0 ? props.searchlength / 5 : Math.ceil(props.searchlength / 5)}
          size="large"
          onChange={(e, page) => {
            handleChangePage(e, page, props.category)
          }}
        />
      </div>}
    </div>)
  }




  return (
    <CssBaseline>
      <Header />
      {/* //////////hreflinks////////////////// */}
      {loading && <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "500px"
      }}>
        <ReactLoading type="spinningBubbles" color="#000" height={100} width={100} />
      </div>}
      {!loading &&
        <div>
          <div className={classes.linksDiv}>
            <Paper className={classes.root}>

              <Tabs
                value={valueTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="All" className={classes.tab} onClick={() => {
                  props.resetPlaceListAction();
                  props.storePlaceList(props.match.params.name, 5, 0, false, "")
                }
                }  {...a11yProps(0)} />
                <Tab label="Hotels" className={classes.tab}
                  onClick={(e) => {
                    console.log(e)
                    props.resetPlaceListAction();
                    props.storePlaceList(props.match.params.name, 5, 0, false, "Hotels")
                  }
                  }
                  {...a11yProps(1)} />
                <Tab label="Religious" className={classes.tab}
                  onClick={() => {
                    props.resetPlaceListAction();
                    props.storePlaceList(props.match.params.name, 5, 0, false, "Religious")
                  }
                  }
                  {...a11yProps(2)} />
                <Tab label="Restaurants" className={classes.tab}
                  onClick={() => {
                    props.resetPlaceListAction();
                    props.storePlaceList(props.match.params.name, 5, 0, false, "Restaurants")
                  }
                  }
                  {...a11yProps(3)} />
                <Tab label="Holiday Homes" className={classes.tab}
                  onClick={() => {
                    props.resetPlaceListAction();
                    props.storePlaceList(props.match.params.name, 5, 0, false, "Holiday Homes")
                  }
                  }
                  {...a11yProps(4)} />
                <Tab label="Package Holidays" className={classes.tab}
                  onClick={() => {
                    props.resetPlaceListAction();
                    props.storePlaceList(props.match.params.name, 5, 0, false, "Package Holidays")
                  }
                  }
                  {...a11yProps(5)} />
                <Tab label="Outing Places" className={classes.tab}
                  onClick={() => {
                    props.resetPlaceListAction();
                    props.storePlaceList(props.match.params.name, 5, 0, false, "Outing Places")
                  }
                  }
                  {...a11yProps(6)} />
              </Tabs> </Paper>
          </div>
          <TabPanel value={valueTab} index={0}>

            {props.placeList.length === 0 &&
              <div style={{
                margin: "50px",
                height: "400px"
              }}>
                <Typography style={{
                  fontFamily: "system-ui",
                  fontWeight: 900,
                  fontSize: "1.5rem",
                  color: "#5f5d5d",


                }}>
                  Sorry, we couldn't find "{props.match.params.name}"
                </Typography>

              </div>
            }


            {props.placeList.length > 0 && props.placeList.every((place) => (
              place.city.name.toLowerCase() === props.match.params.name.toLowerCase()
              || place.state.name.toLowerCase() === props.match.params.name.toLowerCase()
              || place.country.name.toLowerCase() === props.match.params.name.toLowerCase()
            ))
              &&
              <div> <div className={classes.totalPlacesInCityDiv}>
                <Typography className={classes.totalPlacesInCity}>
                  Total result matching {props.match.params.name}
                </Typography>
              </div>
                <div style={{
                  margin: "20px 35px",
                  maxHeight: "150px",
                  maxWidth: "800px",
                  border: "1px solid lightgray",
                  display: "flex",
                }}
                  onClick={() => {

                    props.placeList[0]?.city.name.toLowerCase() === props.match.params.name.toLowerCase() ?
                      history.push(`/category/${props.match.params.name}/${props.placeList[0]?._id}`) :
                      props.placeList[0]?.state.name.toLowerCase() === props.match.params.name.toLowerCase() ?
                        history.push(`/category/${props.match.params.name}/${props.placeList[0]?._id}`) :
                        history.push(`/category/${props.match.params.name}/${props.placeList[0]?._id}`)

                  }}
                >
                  <div style={{ width: "40%" }}>
                  
                        <Image
                   key={props.placeList[0]?._id}
                   cloudName="dkskccoaj"
                   publicId={props.placeList[0]?.avatar}
                 
                   crop="scale"
                   style={{ width: "100%", height: "100%" }}
                   />
                    
                    <div style={{
                      position: "relative",
                      top: "-25px",
                      color: "white",
                      left: "10px",
                      display: "flex",



                    }}><LocationOnOutlined />
                      <Typography style={{
                        fontWeight: "900",
                        marginLeft: "10px"
                      }}>Location</Typography>
                    </div>
                  </div>
                  <div className={classes.placeDesc}>
                    <Typography className={classes.placeHeading}>
                      {props.match.params.name}
                    </Typography>
                    <div style={{
                      display: "flex", marginTop: "10px", height: "70px",
                      alignItems: "flex-end"
                    }}
                    >
                      <LocationOnOutlined />
                      {props.placeList[0]?.city.name.toLowerCase() === props.match.params.name.toLowerCase() && <Typography style={{ marginLeft: "5px" }}>

                        {props.placeList[0]?.city.name} {props.placeList[0]?.state.name} {props.placeList[0]?.country.name}
                      </Typography>}
                      {props.placeList[0]?.state.name.toLowerCase() === props.match.params.name.toLowerCase() && <Typography style={{ marginLeft: "5px" }}>

                        {props.placeList[0]?.state.name} {props.placeList[0]?.country.name}
                      </Typography>}
                      {props.placeList[0]?.country.name.toLowerCase() === props.match.params.name.toLowerCase() && <Typography style={{ marginLeft: "5px" }}>

                        {props.placeList[0]?.country.name}
                      </Typography>}
                    </div>

                  </div>
                </div>
              </div>
            }
            {
              props.placeList.length > 0 && <div className={classes.totalPlacesInCityDiv}>
                <Typography className={classes.totalPlacesInCity}>
                  Results matching {props.match.params.name}
                </Typography>
              </div>
            }

            {props.placeList.slice((value - 1) * 5, props.searchlength < value * 5 ? props.searchlength : value * 5)
              .map((row) => (
                <SearchCard place={row} />
              ))
            }
            {props.placeList.length !== 0 && <div style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "20px"
            }}>
              <Pagination
                count={props.searchlength % 5 === 0 ? props.searchlength / 5 : Math.ceil(props.searchlength / 5)}
                size="large"
                onChange={(e, page) => {
                  handleChangePage(e, page, "")
                }}
              />
            </div>}
          </TabPanel>
          <TabPanel value={valueTab} index={1} >
            <TabData category={"Hotels"} value={value} placeList={props.placeList} searchlength={props.searchlength} />
          </TabPanel>
          <TabPanel value={valueTab} index={2}>
            <TabData category={"Religious"} value={value} placeList={props.placeList} searchlength={props.searchlength} />
          </TabPanel>
          <TabPanel value={valueTab} index={3}>
            <TabData category={"Restaurants"} value={value} placeList={props.placeList} searchlength={props.searchlength} />
          </TabPanel>
          <TabPanel value={valueTab} index={4}>
            <TabData category={"Holiday Homes"} value={value} placeList={props.placeList} searchlength={props.searchlength} />
          </TabPanel>
          <TabPanel value={valueTab} index={5}>
            <TabData category={"Package Holidays"} value={value} placeList={props.placeList} searchlength={props.searchlength} />
          </TabPanel>
          <TabPanel value={valueTab} index={6}>
            <TabData category={"Outing Places"} value={value} placeList={props.placeList} searchlength={props.searchlength} />
          </TabPanel>
        </div>}
      <Footer />
    </CssBaseline >
  );
};

const mapPropsToValues = (state) => {
  return {
    // isLoggedIn: state.vacation.isLoggedIn,
    place: state.vacation.place,
    placeList: state.vacation.placeList,
    page: state.vacation.page,
    rowPerPage: state.vacation.rowPerPage,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
    searchData: state.vacation.searchData,
    searchlength: state.vacation.searchlength,
    filterCategory: state.vacation.filterCategory,
    isLoggedIn: state.vacation.isLoggedIn
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ storePlaceAction, storeImageList, LoginValue, addTripAction, storePlaceList, resetPlaceListAction, resetPlaceListAction, openLoginDialogAction, closeSearchBoxAction, verifyTokenAction, LogoutValue }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(CityTour);
