import { Redirect, Route } from "react-router";
import { connect } from "react-redux";
export const PrivateRoute = ({ component: Component, action, ...rest }) => {

    const role = (JSON.parse(localStorage.getItem("User")))?.role;
    const token = localStorage.getItem("Token");

    //   console.log("check", action === userDetails.role);
    console.log("check gg", rest);
    return (
        <Route
            {...rest}
            render={({ location, ...props }) =>
                token && role && action === role ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/notFound",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = (state) => {
    return {
        // isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, null)(PrivateRoute);