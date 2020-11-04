import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function PrivateRoute({ component: Component, ...rest }) {
    const [cookies, setCookie] = useCookies(["token"]);
    const isAuthenticated = async () => {
        try {
            const response = await axios.get(
                "https://projeto2-web-backend-wat.herokuapp.com/verifyToken",
                { xsrfCookieName: "token", withCredentials: true }
            );
            if (response.status === 200) return true;
            console.log(response.status);
        } catch (err) {
            console.log(err.response);
            return false;
        }
    };

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/projeto2-web/login" />
                )
            }
        />
    );
}

export default PrivateRoute;