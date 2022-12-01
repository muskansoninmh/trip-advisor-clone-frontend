import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from 'cloudinary-react';

import Typography from "@material-ui/core/Typography";
import { editedPlacedIdAction, storeImageList, resetPlaceListAction } from "../../Store/actions/action";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "300px",
    padding: "20px",
    borderRadius: "10px",
    transform: "scale(1, 1)",
    transition: "1s",
    "&:hover": {
      transform: 'scale(1.1,1.1)',

    }
  },
  image: {
    width: "240px",
    height: "250px",
    borderRadius: "10px",
    "&:hover": {
      transition: "0.5s",
      boxShadow: "2px 2px 2px 2px gry"

    }
  }
}));

function PlaceCard(props) {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <div className={classes.card}
      onClick={async () => {



        await props.resetPlaceListAction();
        history.push(`/category/${props.state}/${props.id}`)
      }}
    >
        <Image
                            key="1"
                            cloudName="dkskccoaj"
                            publicId={props?.avatar}
                           className= {classes.image}
                            crop="scale"
                        />
      <Typography variant="h5" style={{
        position: "relative",
        width: 230,
        top: -80,
        height: 80,
        display: "flex",
        alignItems: "center",
        color: "white",
        left: 10,
        fontWeight: "bold",
        fontFamily: "unset",

      }} >{props.state} , {props.country} </Typography>

    </div>
  );
}
const mapPropsToValues = (state) => {
  return {
    // isLoggedIn: state.vacation.isLoggedIn,
    uniqueStatePlaceList: state.vacation.uniqueStatePlaceList,
    editedPlace: state.vacation.editedPlace,
    page: state.vacation.page,
    rowPerPage: state.vacation.rowPerPage,
    openLeftSideDrawer: state.vacation.openLeftSideDrawer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ editedPlacedIdAction, storeImageList, resetPlaceListAction }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(PlaceCard);