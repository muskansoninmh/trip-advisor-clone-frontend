import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FormatAlignJustify, PinDropSharp } from "@material-ui/icons";
import HorizontalSlider1 from "./HorizontalSlider1";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiAccordionDetails-root": {
      display: "block"
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    fontWeight: "800",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (panel === "panel1") {

    }
  };

  return (
    <div className={classes.root}>
      {props.placeList.filter((place) => place.category === "Hotels" || place.category === "Restaurants").length > 0 && <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>HOTELS & RESTAURANTS</Typography>

        </AccordionSummary>
        <AccordionDetails >
          <HorizontalSlider1 placeList={props.placeList.filter((place) => place.category === "Hotels" || place.category === "Restaurants")} />
        </AccordionDetails>
      </Accordion>}
      {props.placeList.filter((place) => place.category === "Religious" || place.category === "Outing Places").length > 0 && <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>PLACE To VISIT</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <HorizontalSlider1 placeList={props.placeList.filter((place) => place.category === "Religious" || place.category === "Outing Places")} />
        </AccordionDetails>
      </Accordion>}
      {props.placeList.filter((place) => place.category === "Holiday Homes").length > 0 && <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>HOLIDAY HOMES</Typography>

        </AccordionSummary>
        <AccordionDetails >
          <HorizontalSlider1 placeList={props.placeList.filter((place) => place.category === "Holiday Homes")} />
        </AccordionDetails>
      </Accordion>}
      {props.placeList.filter((place) => place.category === "Package Holiday").length > 0 && <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>HOLIDAY PACKAGES</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <HorizontalSlider1 placeList={props.placeList.filter((place) => place.category === "Package Holiday")} />
        </AccordionDetails>
      </Accordion>}
    </div>
  );
}
const mapPropsToValues = (state) => {
  return {
    // isLoggedIn: state.vacation.isLoggedIn,

    placeList: state.vacation.placeList,
    page: state.vacation.page,
    rowPerPage: state.vacation.rowPerPage,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(ControlledAccordions);