import React from "react";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Container } from "@material-ui/core";
import {
  Call,
  Facebook,
  FaceOutlined,
  Http,
  Instagram,
  LinkedIn,
  Panorama,
  Pinterest,
  Room,
  Twitter,
  YouTube,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: "85px 100px",
    background: "#231f20",
    bottom: "0",
    width: "100%",
    // height: "100%",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(185px, 1fr))",
    gridGap: "50px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  heading: {
    color: "white",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#faa61a",
    fontFamily: "'Merriweather', serif",
  },
  footerLink: {
    color: "#fff",
    display: "flex",
    alignItems: "flex-end",
    marginLeft: "0px",
    marginBottom: "20px",
    fontSize: "16px",
    textDecoration: "none",
    "&:hover": {
      color: "lightgray",
      textDecoration: "underline",
      transition: "200ms ease-in",
    },
  },
  iconHover: {
    color: "white",
    "&:hover": {
      color: "#faa61a",

      transition: "200ms ease-in",
    },
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <div className={classes.row}>
        <div className={classes.column}>
          <h3 className={classes.heading}>CONTACT US</h3>

          <a
            href="https://www.google.com/maps/place/La+Net+Team+Software+Solutions/@24.611824,73.6993013,17z/data=!3m1!4b1!4m5!3m4!1s0x3967e55d43a2acff:0x86ada944b974a8b1!8m2!3d24.6118191!4d73.7014954"
            className={classes.footerLink}
          >
            <Room style={{ marginRight: "5px" }} />
            LanetTeamSoftSolution
          </a>
          <a href="#" className={classes.footerLink}>
            <Call style={{ marginRight: "5px" }} />
            +91 7025353580
          </a>
        </div>
        <div className={classes.column}>
          <h3 className={classes.heading}>COMPANY</h3>
          <a href="#" className={classes.footerLink}>
            Hotels
          </a>
          <a href="#" className={classes.footerLink}>
            Places to Visit
          </a>
          <a href="#" className={classes.footerLink}>
            Restaurant
          </a>
          <a href="#" className={classes.footerLink}>
            Holiday Homes
          </a>
        </div>
        <div className={classes.column}>
          <h3 className={classes.heading}>RESOURCES</h3>
          <a href="#" className={classes.footerLink}>
            Blogs
          </a>
          <a href="#" className={classes.footerLink}>
            Contact us
          </a>
          <a href="http://localhost:3000/signup" className={classes.footerLink}>
            Login
          </a>
          <a href="http://localhost:3000/signup" className={classes.footerLink}>
            Register
          </a>
        </div>
        <div className={classes.column}>
          <h3 className={classes.heading}>ABOUT US</h3>
          <p style={{ color: "white" }}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit.
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <a
              href="https://www.facebook.com/LanetTeamSoftSolution"
              className={(classes.footerLink, classes.iconHover)}
            >
              <Facebook />
            </a>
            <a
              href="https://www.instagram.com/lanet_team/"
              className={(classes.footerLink, classes.iconHover)}
            >
              <Instagram />
            </a>
            <a
              href="https://twitter.com/TeamLanet"
              className={(classes.footerLink, classes.iconHover)}
            >
              <Twitter />
            </a>
            <a
              href="https://www.linkedin.com/company/la-net-team-software-solution-pvt-ltd-/"
              className={(classes.footerLink, classes.iconHover)}
            >
              <LinkedIn />
            </a>
            <a
              href="http://lanetteam.com/"
              className={(classes.footerLink, classes.iconHover)}
            >
              <Http />
            </a>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", color: "gray" }}>
        <span>
          <a>www.LanetTeamSoftSolution.com</a>
        </span>
        @AllReservedRights
      </div>
    </Box>
  );
};
export default Footer;
