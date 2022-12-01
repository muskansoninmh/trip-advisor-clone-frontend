import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";


import { connect } from "react-redux";
import { closeSearchBoxAction } from "../../Store/actions/action";
import { bindActionCreators } from "redux";
import { Paper, Typography } from "@material-ui/core";
import { BorderBottom, Hotel, HotelOutlined, LocalActivity, LocalActivityOutlined, LocationOnOutlined, RestaurantMenuTwoTone, RestaurantTwoTone, WbSunny, WbSunnyOutlined, Weekend, WeekendOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    main: {
        width: "100%",
        marginRight: "200px",

    },
    innerDiv: {
        display: "flex",

        width: "100%",

        marginLeft: "0px",
        height: "relative",
        marginRight: "200px",
        overflowY: "auto",
        background: "white",
        justifyContent: "center"
    },
    ul: {
        listStyleType: "none",
        width: "100%",
        padding: "10px"
    },
    li: {
        height: "60px",
        width: "100%",
        display: "flex",

        alignItems: "center",
        borderTop: "1px solid rgb(0 0 0 / 6%)",
        paddingLeft: "10px",
    },
    typography: {
        fontSize: "1rem",
        marginLeft: "10px",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    address: {
        fontSize: "0.8rem",
        marginLeft: "10px",
        color: "#737373"
    }

}));

const Suggestion = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const unique = []
    {
        props.value.length > 3 && props.placeList.map((place) => {
            if (place.city.name.toLowerCase().includes(props.value) && !unique.includes(place.city.name)) {
                console.log("city");
                unique.push(place.city.name)
            }
            else if (place.state.name.toLowerCase().includes(props.value) && !unique.includes(place.state.name)) {
                unique.push(place.state.name)
            }
            else if (place.country.name.toLowerCase().includes(props.value) && !unique.includes(place.country.name)) {
                unique.push(place.country.name)
            }
        })
    }
    console.log(unique);
    const options = (props.filterCategory === "") ? props.placeList.map(r => (
        <li key={r._id} className={classes.li}
            onClick={() => {
                props.closeSearchBoxAction()
                if (r.category === "Hotels" || r.category === "Restaurants" || r.category === "Holiday Homes" || r.category === "Package Holidays") {
                    history.push(`/tour/${r._id}`)
                }
                else if (r.category === "Religious" || r.category === "Outing Places") { history.push(`/image/${r.city}/${r._id}`) }
            }}
        >
            {r.category === "Hotels" && <HotelOutlined />}
            {r.category === "Restaurants" && <RestaurantMenuTwoTone />}
            {r.category === "Package Holidays" && <WeekendOutlined />}
            {r.category === "Religious" && <WbSunnyOutlined />}
            {r.category === "Outing Places" && <LocalActivityOutlined />}
            <div >
                <Typography className={classes.typography}> {r.name} </Typography>
                <Typography className={classes.address}> {r.address} </Typography>
            </div>
        </li>
    )) :
        unique.map(r => (
            <li key={r?._id} className={classes.li}
                onClick={
                    () => {
                        history.push(`/search/${props.value}/${props.filterCategory}`)
                    }
                }

            >

                <LocationOnOutlined />
                <div >
                    <Typography className={classes.typography}> {r} </Typography>

                </div>
            </li>
        ))

    return (
        <div className={classes.main}>
            <div className={classes.innerDiv}>
                <ul className={classes.ul}>
                    <li className={classes.li}><LocationOnOutlined />
                        <Typography className={classes.typography}> Nearby Location </Typography>
                    </li>

                    {(props.filterCategory === '' && props.value.length >= 3 && props.placeList.length > 0) &&
                        ((props.placeList.every((place) =>
                            place.city.name.toLowerCase().includes(props.value) ||
                            place.state.name.toLowerCase().includes(props.value) ||
                            place.country.name.toLowerCase().includes(props.value)

                        ))) && <li className={classes.li} onClick={() => {
                            {
                                props.closeSearchBoxAction();
                                props.placeList[0]?.city.name.toLowerCase().includes(props.value) ?
                                    history.push(`/category/${props.placeList[0]?.city.name}/${props.placeList[0]?._id}`) :
                                    props.placeList[0]?.state.name.toLowerCase().includes(props.value) ?
                                        history.push(`/category/${props.placeList[0]?.state.name}/${props.placeList[0]?._id}`) :
                                        history.push(`/category/${props.placeList[0]?.country.name}/${props.placeList[0]?._id}`)
                            }
                        }}>
                            <LocationOnOutlined />
                            < Typography className={classes.typography}>
                                {props.placeList[0]?.city.name.toLowerCase().includes(props.value) ?
                                    props.placeList[0]?.city.name :
                                    props.placeList[0]?.state.name.toLowerCase().includes(props.value) ?
                                        props.placeList[0]?.state.name :
                                        props.placeList[0]?.country.name
                                }
                            </Typography>

                        </li>}
                    {props.value.length >= 3 && options}
                </ul>
            </div>
        </div >
    )
};
const mapPropsToValues = (state) => {
    return {
        placeList: state.vacation.placeList,
        filterCategory: state.vacation.filterCategory,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ closeSearchBoxAction }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(Suggestion);
