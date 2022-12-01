import React from "react";
import Button from "@material-ui/core/Button";
import { Image } from 'cloudinary-react';
import { useTheme } from "@material-ui/core/styles";

import { Form, withFormik } from "formik";
import * as yup from "yup";

import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";

import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {
  Avatar,
  Box,
  CircularProgress,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import {
  closeDrawerAction,
  addPlaceAction,
  refreshList,
  drawerContentAction,
  openDrawerAction,
  storeImageList,
  editPlaceAction,
  backButtonDisabledAction,
  errorMessageAction,
  resetErrorMessageAction,
} from "../../Store/actions/action";
import { bindActionCreators } from "redux";
import { Add, PhotoCamera } from "@material-ui/icons";
import { Country, State, City } from "country-state-city";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px",
    justifyItems: "center",
  },


  root1: {
    "& > *": {
      margin: theme.spacing(10),
      width: theme.spacing(50),
    },
  },
  scroll: {
    height: "440px",
    overflow: "auto",
    padding: "20px",
    width: "100%",
    justifyContent: "center",
  },
  imageInput: {
    display: "none",
  },
  divv: {

    paddingLeft: "40px",
  },
  ImageDivv: {
    display: "flex",
    paddingLeft: "40px",
    "& .MuiIconButton-colorPrimary": {
      color: "black"
    },
  },
  label: {


    margin: "10px",
    marginLeft: "0px",

    fontWeight: 600
  },
  avatar: {


    width: "100px",
    height: "80px",
    display: "flex",
  },
  ctry: {
    width: "280px",

    height: "2.5rem",


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

function GeneralInfoForm(props) {
  const [file, setFile] = React.useState('');
  const [url, setURL] = React.useState({});

  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const countries = Country.getAllCountries();
  const classes = useStyles();
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

  const handleDateChange = (e) => {
    setValues({
      ...values,
      openingHours: e
    })
  }

  const uploadImages = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
          setValues({
            ...values,
      file: reader.result,
          });
        };

//     setValues({
//       ...values,
// file: e.target.files[0],
//     });
    setURL(URL.createObjectURL(e.target.files[0]));
    setIsSubmitting(true);
  };



  return (
    <div>
      <div className={classes.scroll}>
        {!props.isSubmitting && (
          <Form autoComplete="on" style={{marginBottom : "2rem"}}>
            <Typography variant="h6">{props.errorMessage}</Typography>

            <div className={classes.ImageDivv}>
              <label className={classes.label}>Upload Photo</label>
              <div
                style={{
                  marginLeft: "150px",
                  display: "flex",
                }}
              >
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  className={classes.imageInput}
                  onChange={uploadImages}
                />

                {file.length > 0 ? (
                  <img src={`${url}`} className={classes.avatar} />
                ) : props.backButton ? (
                  <Image
                            key="1"
                            cloudName="dkskccoaj"
                            publicId={props.placeList[0]?.avatar}
                            className={classes.avatar}
                            crop="scale"
                        />
                ) : props.drawerContent.label === "EDIT" ? (
                  <Image
                  key="1"
                  cloudName="dkskccoaj"
                  publicId={props.editedPlace[0]?.avatar}
                  className={classes.avatar}
                  crop="scale"
              />
                ) : (
                  ""
                )}

                <label htmlFor="icon-button-file" className="ml-32">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </div>
            <div className={classes.divv}>
              <FormControl fullWidth>
                <Typography className={classes.label}>Name:</Typography>
                <TextField
                  align="left"
                  variant="outlined"
                  error={touched.name && errors.name}
                  size="small"
                  id="name"
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  helperText={touched.name && errors.name}
                />
              </FormControl>
            </div>
            <div style={{ display: "flex" }}>
              <div className={classes.divv}>

                <FormControl fullWidth>
                  <Typography className={classes.label} >
                    Category :
                  </Typography>
                  <Select

                    variant="outlined"
                    id="category"

                    className={classes.ctry}
                    onChange={(e) => {
                      props.setValues({ ...values, category: e.target.value });
                    }}
                    value={values.category}
                    onBlur={handleBlur}
                    helperText={touched.category && errors.category}
                  >
                    <MenuItem value="Hotels">Hotels</MenuItem>
                    <MenuItem value="Outing Places">Outing Places</MenuItem>
                    <MenuItem value="Restaurants">Restaurants</MenuItem>
                    <MenuItem value="Holiday Homes">Holiday Homes</MenuItem>
                    <MenuItem value="Package Holidays">Package Holidays</MenuItem>
                    <MenuItem value="Religious">Religious</MenuItem>
                  </Select>
                </FormControl>
              </div>




              <div className={classes.divv}>
                <FormControl >
                  <Typography className={classes.label} >Season :</Typography>
                  <Select

                    variant="outlined"
                    id="season"
                    className={classes.ctry}
                    onChange={(e) => {
                      props.setValues({ ...values, season: e.target.value });
                    }}
                    value={values.season}
                    onBlur={handleBlur}
                    helperText={touched.season && errors.season}
                  >
                    <MenuItem value="All Seasons">All Seasons</MenuItem>
                    <MenuItem value="Summer">Summer</MenuItem>
                    <MenuItem value="Rainy">Rainy</MenuItem>
                    <MenuItem value="Autum">Autum</MenuItem>
                    <MenuItem value="Winter">Winter</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className={classes.divv}>
                <FormControl>
                  <Typography id="demo-simple-select-label" className={classes.label}>Month : </Typography>
                  <Select

                    id="month"
                    variant="outlined"
                    className={classes.ctry}
                    onChange={(e) => {
                      props.setValues({ ...values, month: e.target.value });
                    }}
                    value={values.month}
                    onBlur={handleBlur}
                    helperText={touched.month && errors.month}
                  >
                    <MenuItem value="All Months">All Months</MenuItem>
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                    <MenuItem value="April">April</MenuItem>
                    <MenuItem value="May">May</MenuItem>
                    <MenuItem value="June">June</MenuItem>
                    <MenuItem value="July">July</MenuItem>
                    <MenuItem value="August">August</MenuItem>
                    <MenuItem value="September">September</MenuItem>
                    <MenuItem value="October">October</MenuItem>
                    <MenuItem value="November">November</MenuItem>
                    <MenuItem value="December">December</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.divv}>
                <FormControl

                  error={touched.country && errors.country}
                >
                  <Typography className={classes.label}>Country</Typography>

                  <Select
                    align="left"
                    variant="outlined"
                    id="country"
                    className={classes.ctry}
                    value={values.country?.id}
                    onChange={(event, obj) => {
                      const country = countries[obj.props.index];
                      props.setValues({
                        ...values,
                        country: { id: event.target.value, name: country.name },
                        state: { id: "", name: "" },
                        city: { name: "" },
                      });
                    }}
                  >
                    {countries.map((country, index) => (
                      <MenuItem value={country.isoCode} index={index} key={index}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div style={{ display: "flex" }}>

              <div className={classes.divv}>
                <FormControl

                  error={touched.state && errors.state}
                >
                  <Typography className={classes.label}>state</Typography>
                  <Select
                    id="state"
                    variant="outlined"
                    align="left"
                    className={classes.ctry}
                    disabled={
                      State.getStatesOfCountry(values.country?.id).length > 0
                        ? false
                        : true
                    }
                    value={values.state?.id}
                    onChange={(event, obj) => {
                      const state = State.getStatesOfCountry(values.country?.id)[
                        obj.props.index
                      ];

                      props.setValues({
                        ...values,
                        state: { id: event.target.value, name: state?.name },
                      });
                    }}
                  >
                    {State.getStatesOfCountry(values.country?.id).map(
                      (state, index) => (
                        <MenuItem value={state.isoCode} key={index} index={index}>
                          {state.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>

              <div className={classes.divv}>
                <FormControl >
                  <Typography className={classes.label}>city</Typography>
                  <Select
                    id="city"
                    variant="outlined"
                    align="left"
                    className={classes.ctry}
                    disabled={
                      City.getCitiesOfState(values.country?.id, values.state?.id)
                        .length > 0
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
            {(values.category === "Hotels" ||
              values.category === "Holiday Homes" ||
              values.category === "Package Holidays"
            ) && <div className={classes.divv}>
                <FormControl fullWidth >
                  <Typography className={classes.label}>Package/per Day:</Typography>
                  <TextField
                    align="left"
                    variant="outlined"
                    size="small"
                    error={touched.package && errors.package}

                    id="package"
                    type="number"
                    onChange={handleChange}
                    value={values.package}
                    onBlur={handleBlur}
                    helperText={touched.package && errors.package}
                  />
                </FormControl>
              </div>}
            {(values.category === "Hotels" ||
              values.category === "Package Holidays"
            ) && <div className={classes.divv}>
                <FormControl fullWidth >
                  <Typography className={classes.label}>
                    {values.category === "Hotels" ?
                      "Number of Rooms" : "Number of Members"}
                  </Typography>
                  <TextField
                    align="left"
                    variant="outlined"
                    size="small"
                    error={touched.roomOrMembers && errors.roomOrMembers}

                    id="roomOrMembers"
                    type="number"
                    onChange={handleChange}
                    value={values.roomOrMembers}
                    onBlur={handleBlur}
                    helperText={touched.roomOrMembers && errors.roomOrMembers}
                  />
                </FormControl>
              </div>}
            {values.category === "Restaurants" &&
              <div style={{
                display: "flex"
              }}>
                <div className={classes.divv}>
                  <Typography className={classes.label}>Opening Hours</Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker autoOk inputVariant="outlined"
                      className={classes.ctry}
                      style={{
                        marginRight: "40px"
                      }}
                      size="small" value={values.openingHours}
                      onChange={(e) => {
                        const hours = new Date(e).getHours();
                        const minutes = new Date(e).getMinutes();

                        setValues({
                          ...values,
                          openingHours: e
                        })
                      }} />
                  </MuiPickersUtilsProvider>
                </div>
                <div>
                  <FormControl>
                    <Typography className={classes.label}>Closing Hours</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <TimePicker autoOk inputVariant="outlined"
                        className={classes.ctry}
                        size="small" value={values.closingHours} onChange={(e) => {

                          setValues({
                            ...values,
                            closingHours: e
                          })
                        }} />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </div>
              </div>}



            <div className={classes.divv}>
              <Typography className={classes.label} >contactNo Number:</Typography>

              <PhoneInput
                country={'in'}
                value={values.contactNo}
                onChange={phone => setValues({ ...values, contactNo: phone })}

                containerStyle={{
                  marginBottom: "15px",



                }}
                inputStyle={{
                  marginBottom: "15px",
                  height: "3rem",
                  width: "37.7rem"

                }}
                isValid={(value, country) => {

                  if (value.length < 12 && value.length > 2) {
                    return 'Invalid value: ' + value + ', ' + country.name;
                  }
                  else {
                    return true;
                  }

                }}


              />
            </div>
            <div className={classes.divv}>
              <FormControl fullWidth >
                <Typography className={classes.label}>Website:</Typography>
                <TextField
                  align="left"
                  size="small"
                  variant="outlined"
                  error={touched.website && errors.website}

                  id="website"

                  onChange={handleChange}
                  value={values.website}
                  onBlur={handleBlur}
                  helperText={touched.website && errors.website}

                />
              </FormControl>
            </div>

            <div className={classes.divv}>
              <FormControl fullWidth >
                <Typography className={classes.label}>Description:</Typography>
                <TextField
                  align="left"
                  variant="outlined"
                  error={touched.description && errors.description}

                  multiline
                  rows={5}
                  id="description"
                  onChange={handleChange}
                  value={values.description}
                  onBlur={handleBlur}
                  helperText={touched.description && errors.description}
                />
              </FormControl>
            </div>
            <div className={classes.divv}>
              <FormControl fullWidth >
                <Typography className={classes.label}>Address:</Typography>
                <TextField
                  align="left"
                  size="small"
                  variant="outlined"
                  error={touched.address && errors.address}

                  id="address"

                  onChange={handleChange}
                  value={values.address}
                  onBlur={handleBlur}
                  helperText={touched.address && errors.address}

                />
              </FormControl>
            </div>
          </Form>
        )}
        {props.isSubmitting && (
          <div className="flex  items-center justify-center">
            <CircularProgress />{" "}
          </div>
        )}
      </div>

      <Box
        style={{
          display: "flex",
          width: "100%",
          position: "absolute",
          left: 0,
          background : 'white', 
          right: 0,
          bottom: 0,
          paddingTop: "1rem",
          paddingBottom: "1rem",
          borderTop: "1px solid #80808038",
          justifyContent: "center",
        }}
      >
        <Button

          disabled
          variant="contained"
          className="mx-8"

          style={{
            marginLeft: "2rem",
            marginRight: "2rem",
            color: "white",
            // background: "black"
          }}
        >
          Back
        </Button>

        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
          className={classes.btn}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}

const GeneralInfoFormik = withFormik({

  enableReinitialize: true,

  mapPropsToValues: (props) => {
    console.log(props.editedPlace[0]?.contactNo);
    return {
      name:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.name
          : props.backButton
            ? props.placeList[0]?.name
            : "",
      description:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.description
          : props.backButton
            ? props.placeList[0]?.description
            : "",
      category:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.category
          : props.backButton
            ? props.placeList[0]?.category
            : "",

      season:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.season
          : props.backButton
            ? props.placeList[0]?.season
            : "",
      month:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.month
          : props.backButton
            ? props.placeList[0]?.month
            : "",
      package:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.package
          : props.backButton
            ? props.placeList[0]?.package
            : "",
      country:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.country
          : props.backButton
            ? props.placeList[0]?.country
            : {},
      state:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.state
          : props.backButton
            ? props.placeList[0]?.state
            : {},
      city:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.city
          : props.backButton
            ? props.placeList[0]?.city
            : {},
      address:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.address
          : props.backButton
            ? props.placeList[0]?.address
            : "",
      openingHours: props.drawerContent.label === "EDIT"
        ? props.editedPlace[0]?.openingHours
        : props.backButton
          ? props.placeList[0]?.openingHours
          : new Date(),
      closingHours: props.drawerContent.label === "EDIT"
        ? props.editedPlace[0]?.closingHours
        : props.backButton
          ? props.placeList[0]?.closingHours
          : new Date(),
      contactNo:
        props.drawerContent.label === "EDIT"
          ? props.editedPlace[0]?.contactNo
          : props.backButton
            ? props.placeList[0]?.contactNo :
            ''
      ,
      website: props.drawerContent.label === "EDIT"
        ? props.editedPlace[0]?.website
        : props.backButton
          ? props.placeList[0].website
          : '',
      roomOrMembers: props.drawerContent.label === "EDIT"
        ? props.editedPlace[0]?.roomOrMembers
        : props.backButton
          ? props.placeList[0]?.roomOrMembers
          : '',


    };
  },
  validationSchema: (props) =>
    yup.object().shape({
      name: props.drawerContent.label === "ADD" &&
        yup.string().min(1).trim().required("Name is required") ,
      description: props.drawerContent.label === "ADD" &&
        yup.string().min(1).trim().required("Description is required") ,
      category: props.drawerContent.label === "ADD" &&
        yup.string().required("Category is required") ,
      month: props.drawerContent.label === "ADD" &&
        yup.string().required("Month is required") ,
      // package: yup.number(),
      country: props.drawerContent.label === "ADD" &&
        yup.object().required("country is required") ,
      season: props.drawerContent.label === "ADD" &&
        yup.string().required("Season is required") ,
      state: props.drawerContent.label === "ADD" && yup.object(),
      city:  props.drawerContent.label === "ADD" && yup.object(),
      address: props.drawerContent.label === "ADD" &&
        yup.string().min(4).required("Address is required") ,
      contactNo: props.drawerContent.label === "ADD" &&  yup.string(),
      website: props.drawerContent.label === "ADD" && yup.string(),
      roomOrMembers: props.drawerContent.label === "ADD" &&  yup.number()


    }),
  handleSubmit: async (data, { props, setFieldValue, setIsSubmitting }) => {
    try {
      console.log("enter");
      if (props.drawerContent.label === "ADD") {
        if (props.addedPlace[0]?._id) {
          console.log("fdgdfggh");

          // const res =
          await props.editPlaceAction(props.addedPlace[0]._id, data);

          // if (!res) {
          props.handleNext();

          props.backButtonDisabledAction();

          // }
          // else {
          //     props.errorMessageAction(res)
          // }
        } else {
          console.log("dfgg");
          // const res =
          await props.addPlaceAction(data);

          // if (!res) {
          props.handleNext();
          props.backButtonDisabledAction();
          // }
          // else {
          // props.errorMessageAction(res)
          // }
        }
      } else if (props.drawerContent.label === "EDIT") {
        console.log("edit");
        await props.editPlaceAction(props.editedPlace[0]?._id, data);
        // if (!res) {
        props.handleNext();
        props.storeImageList(props.editedPlace[0]?._id);
        props.backButtonDisabledAction();
        // }
        // else {
        // props.errorMessageAction(res)
        // }
      }
    } catch (e) {
      console.log(e);
    }
  },
})(GeneralInfoForm);

const mapPropsToValues = (state) => {
  return {
    // openDrawer: state.Employee.demo.openDrawer,
    drawerContent: state.vacation.drawerContent,
    editedPlace: state.vacation.editedPlace,
    // otherDetails: state.Employee.demo.otherDetails,
    placeList: state.vacation.placeList,
    addedPlace: state.vacation.addedPlace,
    // image: state.Employee.demo.image,
    backButton: state.vacation.backButton,
    // errorMessage: state.Employee.demo.errorMessage,
    // loader: state.Employee.demo.loader
    drawerContent: state.vacation.drawerContent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      closeDrawerAction,
      addPlaceAction,
      backButtonDisabledAction,
      editPlaceAction,
      storeImageList,
    },
    dispatch
  );
};

export default connect(mapPropsToValues, mapDispatchToProps)(GeneralInfoFormik);
