import React, { useEffect } from "react";
import {
  Avatar,
  CssBaseline,
  Button,
  Typography,
  TextareaAutosize,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Tabs,
} from "@material-ui/core";
import Header from "./Layouts/Header";

import { Slide, Dialog, TextField } from "@material-ui/core";
import {
  Add,
  Close,
  DateRangeOutlined,
  LocationOnOutlined,
  PhotoCamera,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import Footer from "./Layouts/Footer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withFormik, Form } from "formik";
import {
  LoginValue,
  editUserAction,
  storeTripAction,
  storeBookingAction,
  verifyTokenAction,
  LogoutValue,
} from "../Store/actions/action";
import { Country, State, City } from "country-state-city";
import ReactLoading from "react-loading";
import * as yup from "yup";
import { Tab } from "@material-ui/core";
import Card3 from "./Layouts/Card3_trip";
import { Route, useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  grayBackground: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: "550px",
    padding: "30px",
    paddingBottom: "0px",
    marginTop: "100px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "10px",
      height: "auto",
    },
  },
  profileTabs: {
    marginLeft: "15px",
    fontSize: "0.9rem",
    "&:hover": {
      textDecoration: "underline",
      color: "gray",
    },
  },
  AfterAvatarFlex: {
    display: "flex",
    padding: " 0px 10px",
    paddingTop: "20px",
  },
  dialogSize: {
    paddingRight: "25px",
    height: "650px",
    display: "flex",
  },
  DialogRightColumn: {
    width: "250px",
    height: "100%",
    backgroundColor: "#f2f2f2",
    // display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
  },
  DialogLeftColumn: {
    width: "750px",
    height: "100%",
    paddingTop: "5px",
    paddingLeft: "20px",
  },
  imgCloseIconDiv: {
    display: "flex",
    margin: "10px 0px",
    justifyContent: "space-between",
  },
  button: {
    border: "1px solid black",
    height: "30px",
    borderRadius: "3px",
    backgroundColor: "#f2f2f2",
    color: "black",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "x-small",
      padding: "0px",
      lineHeight: "1.1",
      left: "-22px",
    },
  },
  afterTabDiv: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  introSection: {
    width: "25%",
    height: "250px",
    backgroundColor: "white",
    marginTop: "25px",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "10px",
      height: "147px",
    },
  },
  detailsSection: {
    width: "72%",
    marginLeft: "3%",
    height: "250px",
    backgroundColor: "white",
    marginTop: "25px",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "10px",
      height: "147px",
      marginLeft: "0px",
    },
  },
  TextfieldHeading: {
    fontSize: "0.8rem",
    fontWeight: "600",
    marginBottom: "2px",
  },
  textfield: {
    padding: "0px",
    width: "100%",

    marginTop: "5px",
    marginBottom: "5px",
    "& .MuiInputBase-root": {
      height: "33px",
    },
  },
  ButtonDiv: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: "0px",
    width: "60%",
    marginBottom: "20px",
  },
  avatarDiv: {
    height: "35%",
    backgroundColor: "white",
    padding: "10px",
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "none !important",
    },
  },
  introSectionData: {
    fontSize: "0.9rem",
    cursor: "pointer",
    marginBottom: "10px",
  },
  icon: {
    fontSize: "15px",
  },
  yourDetails: {
    fontWeight: "600",
    marginBottom: "10px",
    fontSize: "20px",
  },
  UserDetailsHead: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  UserDetails: {
    marginBottom: "10px",
  },
  ctry: {
    width: "200px",

    height: "2rem",

    marginTop: "5px",
  },
  imageInput: {
    display: "none",
  },
  addImage: {
    position: "absolute",
    top: "125px",
    left: "75px",
    "& .MuiIconButton-colorPrimary": {
      color: "black",
    },
    "& .MuiSvgIcon-root": {
      width: "2rem",
      height: "2rem",
    },
  },
  TripsDiv: {
    width: "100%",
    height: "100%",

    paddingBottom: "20px",
    display: "flex",
    flexWrap: "wrap",
  },
  root: {
    // flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    "&  .Mui-selected": {
      color: "#000",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#000",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
  // footer: {
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     width: "100%",
  //   },
  // },
  AfterAvatarDiv: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "40px",
    paddingTop: "10px",
    // backgroundColor: "#f2f2f2",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5px",
    },
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  window.scroll(0, 0);
  const user = props?.recentLoggedInUser;
  const history = useHistory();
  const [file, setFile] = React.useState({});
  const [url, setURL] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
  } = props;
  const [value, setValue] = React.useState(0);

  const handleSelect = (eventKey) => {
    console.log(eventKey);
    let route;
    // Switch cases based on eventKeys
    switch (eventKey) {
      case 0:
        route = `/profile`;
        break;
      case 1:
        route = `/profile/trips`;
        break;
      case 2:
        route = `/profile/bookings`;
        break;
    }
    console.log(route);
    history.push(route);
  };
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    handleSelect(newValue);
  };
  const handleClickOpen = () => {
    setValues({
      ...values,
      open: true,
    });
  };
  const countries = Country.getAllCountries();
  const handleClose = () => {
    setValues({
      ...values,
      open: false,
    });
  };
  useEffect(async () => {
    const verifyRes = await props.verifyTokenAction();

    if (verifyRes?.status === 200) {


      props.LoginValue();
    }

    else {
      history.push('/');
    }

  }, [props.isLoggedIn])



  const uploadImages = (e) => {
    setFile(e.target.files[0]);

    setValues({
      ...values,
      file: e.target.files[0],
    });
    setURL(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <CssBaseline>
      {props.recentLoggedInUser?.role === "Admin" ? (
        <Header admin="Admin" />
      ) : (
        <Header />
      )}

      <div className={classes.grayBackground}>
        <div className={classes.avatarDiv}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <Avatar
                src={
                  user?.avatar
                    ? `data:image/jpg;base64,${
                        /^[A-Za-z0-9+/]+[=]{0,3}$/.test(user?.avatar)
                          ? user?.avatar
                          : Buffer.from(user?.avatar).toString("base64")
                      }`
                    : ""
                }
                style={{ width: "110px", height: "110px" }}
              />
              <div className={classes.AfterAvatarDiv}>
                <Typography
                  style={{
                    fontSize: "1.5rem",
                    fontStyle: "oblique",
                    fontWeight: "bold",
                  }}
                >
                  {user?.first_name + " " + user?.last_name}
                </Typography>
                <Typography
                  style={{ fontStyle: "oblique", fontWeight: "bold" }}
                >
                  {user?.email}
                </Typography>
              </div>
            </div>
            <Button className={classes.button} onClick={handleClickOpen}>
              Edit Profile
            </Button>
            {/* bjbhjbj */}
            <Dialog
              style={{ height: "100%" }}
              open={values.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
            >
              <div className={classes.dialogSize}>
                <div className={classes.DialogRightColumn}>
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    className={classes.imageInput}
                    onChange={uploadImages}
                  />

                  <Avatar
                    src={
                      file.name
                        ? `${url}`
                        : user?.avatar
                        ? `data:image/jpg;base64,${
                            /^[A-Za-z0-9+/]+[=]{0,3}$/.test(
                              props.recentLoggedInUser?.avatar || user?.avatar
                            )
                              ? props.recentLoggedInUser?.avatar || user?.avatar
                              : Buffer.from(
                                  props.recentLoggedInUser?.avatar ||
                                    user?.avatar
                                ).toString("base64")
                          }`
                        : ""
                    }
                    style={{ width: "110px", height: "110px", margin: "20px" }}
                  ></Avatar>
                  <label
                    htmlFor="icon-button-file"
                    className={classes.addImage}
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
                <div className={classes.DialogLeftColumn}>
                  <div className={classes.imgCloseIconDiv}>
                    <img
                      src="../assets/images/tripadvisorLogo.png"
                      style={{ height: "50px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Close onClick={handleClose} />
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <Typography className={classes.TextfieldHeading}>
                        First Name
                      </Typography>
                      <TextField
                        error={touched.first_name && errors.first_name}
                        className={classes.textfield}
                        id="first_name"
                        type="String"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.first_name}
                        onBlur={handleBlur}
                        helperText={touched.first_name && errors.first_name}
                        fullWidth
                        required
                      />
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <Typography className={classes.TextfieldHeading}>
                        Last Name
                      </Typography>
                      <TextField
                        error={touched.last_name && errors.last_name}
                        className={classes.textfield}
                        id="last_name"
                        type="String"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.last_name}
                        onBlur={handleBlur}
                        helperText={touched.last_name && errors.last_name}
                        fullWidth
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Typography className={classes.TextfieldHeading}>
                      Email
                    </Typography>
                    <TextField
                      error={touched.email && errors.email}
                      className={classes.textfield}
                      id="email"
                      type="email"
                      variant="outlined"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                      helperText={touched.email && errors.email}
                      fullWidth
                      required
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "20px" }}>
                      <Typography className={classes.TextfieldHeading}>
                        Contact No.
                      </Typography>
                      <TextField
                        error={touched.contact && errors.contact}
                        className={classes.textfield}
                        id="contact"
                        type="Number"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.contact}
                        onBlur={handleBlur}
                        helperText={touched.contact && errors.contact}
                        fullWidth
                        required
                      />
                    </div>

                    <div>
                      <FormControl error={touched.country && errors.country}>
                        <Typography className={classes.TextfieldHeading}>
                          Country
                        </Typography>

                        <Select
                          align="left"
                          id="country"
                          className={classes.ctry}
                          value={values.country?.id}
                          variant="outlined"
                          onChange={(event, obj) => {
                            const country = countries[obj.props.index];
                            props.setValues({
                              ...values,
                              country: {
                                id: event.target.value,
                                name: country.name,
                              },
                              state: { id: "", name: "" },
                              city: { name: "" },
                            });
                          }}
                        >
                          {countries.map((country, index) => (
                            <MenuItem
                              value={country.isoCode}
                              index={index}
                              key={index}
                            >
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "20px" }}>
                      <FormControl
                        className={classes.divv}
                        error={touched.state && errors.state}
                      >
                        <Typography className={classes.TextfieldHeading}>
                          State
                        </Typography>
                        <Select
                          id="state"
                          align="left"
                          variant="outlined"
                          className={classes.ctry}
                          disabled={
                            State.getStatesOfCountry(values.country?.id)
                              .length > 0
                              ? false
                              : true
                          }
                          value={values.state?.id}
                          onChange={(event, obj) => {
                            const state = State.getStatesOfCountry(
                              values.country?.id
                            )[obj.props.index];

                            props.setValues({
                              ...values,
                              state: {
                                id: event.target.value,
                                name: state?.name,
                              },
                            });
                          }}
                        >
                          {State.getStatesOfCountry(values.country?.id).map(
                            (state, index) => (
                              <MenuItem
                                value={state.isoCode}
                                key={index}
                                index={index}
                              >
                                {state.name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </div>

                    <div>
                      <FormControl className={classes.divv}>
                        <Typography className={classes.TextfieldHeading}>
                          City
                        </Typography>
                        <Select
                          id="city"
                          align="left"
                          variant="outlined"
                          className={classes.ctry}
                          disabled={
                            City.getCitiesOfState(
                              values.country?.id,
                              values.state?.id
                            ).length > 0
                              ? false
                              : true
                          }
                          value={values.city?.name}
                          onChange={(event) => {
                            props.setValues({
                              ...values,
                              city: { name: event.target.value },
                            });
                          }}
                        >
                          {City.getCitiesOfState(
                            values.country?.id,
                            values.state?.id
                          ).map((city, index) => (
                            <MenuItem value={city.name}>{city.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <Typography className={classes.TextfieldHeading}>
                      Address
                    </Typography>
                    <TextField
                      error={touched.address && errors.address}
                      className={classes.textfield}
                      id="address"
                      type="String"
                      variant="outlined"
                      onChange={handleChange}
                      value={values.address}
                      onBlur={handleBlur}
                      helperText={touched.address && errors.address}
                      fullWidth
                      required
                    />
                  </div>

                  <div>
                    <Typography className={classes.TextfieldHeading}>
                      About You
                    </Typography>
                    <TextareaAutosize
                      error={touched.aboutYou && errors.aboutYou}
                      className={classes.textfield}
                      style={{ height: "60px", width: "100%", padding: "10px" }}
                      id="aboutYou"
                      type="String"
                      variant="outlined"
                      onChange={handleChange}
                      value={values.aboutYou}
                      onBlur={handleBlur}
                      helperText={touched.aboutYou && errors.aboutYou}
                      fullWidth
                      required
                    />
                  </div>
                  <div className={classes.ButtonDiv}>
                    <div style={{ alignItems: "center" }}>
                      <Button
                        type="submit"
                        style={{ marginRight: "15px" }}
                        className={classes.button}
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className={classes.button}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog>
          </div>

          <Tabs
            className={classes.root}
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChangeTab}
            aria-label="disabled tabs example"
          >
            <Tab label="Your Details" />
            {props.recentLoggedInUser?.role === "User" && (
              <Tab
                label="Your Trips"
                onClick={async () => {
                  setLoading(true);
                  const res = await props.storeTripAction();
                  if (res.status === 200) {
                    window.scrollTo(0, 0);
                    setLoading(false);
                  }
                }}
              />
            )}
            {props.recentLoggedInUser?.role === "User" && (
              <Tab
                label="Your Bookings"
                onClick={async () => {
                  setLoading(true);
                  const res = await props.storeBookingAction();
                  if (res.status === 200) {
                    window.scrollTo(0, 0);
                    setLoading(false);
                  }
                }}
              />
            )}
          </Tabs>
        </div>
        <div className={classes.afterTabDiv}>
          <div className={classes.introSection}>
            <Typography style={{ fontWeight: "600" }}>Intro</Typography>
            <div style={{ marginTop: "10px" }}>
              {props.recentLoggedInUser?.city?.name || user?.city?.name ? (
                <Typography className={classes.introSectionData}>
                  <LocationOnOutlined />
                  {props.recentLoggedInUser?.city?.name +
                    props.recentLoggedInUser?.state?.name +
                    props.recentLoggedInUser?.country?.name ||
                    user?.city?.name +
                      "," +
                      user?.state?.name +
                      " , " +
                      user?.country?.name}
                </Typography>
              ) : (
                <Typography
                  className={classes.introSectionData}
                  onClick={handleClickOpen}
                >
                  <Add className={classes.icon} /> your Current Location
                </Typography>
              )}
              <Typography className={classes.introSectionData}>
                <DateRangeOutlined className={classes.icon} /> Joined in{" "}
                {new Date(
                  props.recentLoggedInUser?.createdAt || user?.createdAt
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </Typography>
              {props.recentLoggedInUser?.aboutYou || user?.aboutYou ? (
                <Typography className={classes.introSectionData}>
                  {props.recentLoggedInUser?.aboutYou || user?.aboutYou}
                </Typography>
              ) : (
                <Typography
                  className={classes.introSectionData}
                  onClick={handleClickOpen}
                >
                  <Add className={classes.icon} /> Write some details about
                  yourself
                </Typography>
              )}
            </div>
          </div>

          {value === 0 && (
            <div className={classes.detailsSection}>
              <Typography className={classes.yourDetails}>
                Your Details
              </Typography>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",

                    width: "200px",
                  }}
                >
                  <Typography className={classes.UserDetailsHead}>
                    Name:
                  </Typography>
                  <Typography className={classes.UserDetailsHead}>
                    Email:
                  </Typography>
                  <Typography className={classes.UserDetailsHead}>
                    Contact No:
                  </Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography className={classes.UserDetails}>
                    {props.recentLoggedInUser?.first_name +
                      props.recentLoggedInUser?.last_name ||
                      user.first_name + " " + user.last_name}
                  </Typography>
                  <Typography className={classes.UserDetails}>
                    {props.recentLoggedInUser?.email || user?.email}
                  </Typography>
                  <Typography className={classes.UserDetails}>
                    {props.recentLoggedInUser?.contact || user?.contact}
                  </Typography>
                </div>
              </div>
            </div>
          )}
          {loading && value === 1 && (
            <div
              className={classes.introSection}
              style={{
                width: "72%",
                marginLeft: "3%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ReactLoading
                type="spinningBubbles"
                color="#000"
                height={50}
                width={50}
              />
            </div>
          )}
          {!loading && value === 1 && (
            <div
              className={classes.introSection}
              style={{ width: "72%", marginLeft: "3%", overflowY: "auto" }}
            >
              <div className={classes.TripsDiv}>
                {props.placeList.map((row) => (
                  <Card3
                    placeImage={row.avatar}
                    placeName={row.name}
                    category={row.category}
                    city={row.city.name}
                    id={row._id}
                
                    style={{}}
                  />
                ))}
              </div>
            </div>
          )}
          {loading && value === 2 && (
            <div
              className={classes.introSection}
              style={{
                width: "72%",
                marginLeft: "3%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ReactLoading
                type="spinningBubbles"
                color="#000"
                height={50}
                width={50}
              />
            </div>
          )}
          {!loading && value === 2 && (
            <div
              className={classes.introSection}
              style={{ width: "72%", marginLeft: "3%", overflowY: "auto" }}
            >
              <div className={classes.TripsDiv}>
                {props.placeList.map((row) => (
                  <Card3
                    placeImage={row.avatar}
                    placeName={row.name}
                    category={row.category}
                    city={row.city.name}
                    id={row._id}
                   
                    style={{}}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer className={classes.footer} />
    </CssBaseline>
  );
};

const EditProfileWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const user = props?.recentLoggedInUser;
    return {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      contact: user?.contact || "",
      address: user?.address || "",
      aboutYou: user?.aboutYou || "",
      country: user?.country || {},
      state: user?.state || {},
      city: user?.city || {},
    };
  },
  validationSchema: yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    contact: yup
      .number()
      .min(10, "Contact Should be 10 digit number")
      .typeError("Enter valid Phone Number")
      .required("Required"),
    country: yup.object(),
    state: yup.object(),
    city: yup.object(),
    address: yup.string(),
    aboutYou: yup.string(),
  }),
  handleSubmit: (data, { props, setValues }) => {

    const user = props?.recentLoggedInUser;
    const res = props.editUserAction(data, user._id);


    setValues({
      ...data,
      open: false,
    });
  },
})(Profile);
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vacation.isLoggedIn,
    recentLoggedInUser: state.vacation.recentLoggedInUser,
    placeList: state.vacation.placeList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      LoginValue,
      editUserAction,
      storeTripAction,
      storeBookingAction,
      verifyTokenAction,
      LogoutValue,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileWithFormik);
