import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Image } from 'cloudinary-react';

const useStyles = makeStyles((theme) => ({}));

 function Card3(props) {
  const user = props.recentLoggedInUser;
  const history = useHistory();
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(props.user)

  return (
    <div
      style={{
        width: "28%",
        minWidth: "250px",
        height: "300px",
        margin: "20px",
        backgroundColor: "whitesmoke",

        boxShadow: "rgb(35 35 35 / 11%) 2px 0px 10px 3px",
      }}
      onClick={() => {
        if (props.category === "Hotels" || props.category === "Restaurants" || props.category === "Holiday Homes" || props.category === "Package Holidays") {
          history.push(`/tour/${props.id}`)
        }
        else if (props.category === "Religious" || props.category === "Outing Places") { history.push(`/image/${props.city}/${props.id}`) }
      }}
    >
  
           <Image
                   key={props.id}
                   cloudName="dkskccoaj"
                   publicId={props?.placeImage}
                 
                   crop="scale"
                   style={{
                    width: "100%",
                    height: "220px",
          
                    "&:hover": {
                      opacity: 0.5,
                    },
                  }}
                   />
      <div
        style={{
          width: "100%",
          height: "80px",
          //   backgroundColor: "cadetblue",
        }}
      >
        <div
          style={{
            position: "relative",
            top: "-22px",
            marginLeft: "10px",
            fontWeight: "500",
          }}

        >
          <Avatar
            src={
              user?.avatar ?
                `data:image/jpg;base64,${/^[A-Za-z0-9+/]+[=]{0,3}$/.test(user?.avatar)
                  ? user?.avatar
                  : Buffer.from(user?.avatar).toString(
                    "base64"
                  )
                }` : ''
            }

          ></Avatar>
          <Typography
            variant="h6"
            style={{ fontWeight: "800", fontSize: "1rem", marginTop: "10px" }}
          >
            {props.placeName}
          </Typography>
          <Typography variant="caption" style={{ marginLeft: "250px" }}>

          </Typography>
        </div>
      </div>
    </div>
  );
}
const mapPropsToValues = (state) => {
  return {
    
    recentLoggedInUser: state.vacation.recentLoggedInUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({  }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(Card3);