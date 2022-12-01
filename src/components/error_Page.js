import React, { useEffect } from "react";
import Jump from "react-reveal/Jump";
import Zoom from "react-reveal/Zoom";
import Jello from "react-reveal/Jello";
import Flip from "react-reveal/Flip";
import Swing from "react-reveal/Swing";
import Wobble from "react-reveal/Wobble";
import Tada from "react-reveal/Tada";
import Shake from "react-reveal/Shake";
import { CssBaseline, Typography } from "@material-ui/core";
import Header from "./Layouts/Header";
import { makeStyles } from "@material-ui/core";
import MenuBar from "./Layouts/MenuBar";
import Footer from "./Layouts/Footer";

const useStyles = makeStyles((theme) => ({
  itemImage: {
    height: "400px",
    backgroundColor: "gray",
    margin: "10px 200px",
    width: "500px",
  },
}));
const Error_Page = () => {
  const classes = useStyles();

  return (
    <CssBaseline>
      <Header />
      <MenuBar />

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <div>
            <Swing>
              <Tada>
                <Wobble>
                  <Typography
                    style={{
                      fontSize: "4rem",
                      fontWeight: "bold",
                      margin: "30px 0px",
                      marginLeft: "150px",
                      color: "black",
                      textShadow: "2px 2px #48e1a0",

                    }}
                  >
                    OOPS!!
                  </Typography>
                </Wobble>
              </Tada>
            </Swing>
          </div>
          <div style={{ width: "600px" }}>
            <Typography
              style={{
                fontSize: "2rem",
                fontStyle: "Monospace",
                margin: "40px",
                color: "black",
                fontWeight: "600",
                textShadow: "2px 2px #48e1a0",
              }}
            >
              <Flip left cascade>
                THE PAGE YOU ARE LOOKING FOR IS ON HOLIDAY.... AND YOU SHOULD BE
                TOO..
              </Flip>
            </Typography>
          </div>
        </div>

        <Zoom>
          <Jump>
            <Jello>
              <img
                src="../assets/images/404.png"
                style={{ height: "300px", width: "500px" }}
              ></img>
            </Jello>
          </Jump>
        </Zoom>
      </div>

      <Footer />
    </CssBaseline>
  );
};
export default Error_Page;
