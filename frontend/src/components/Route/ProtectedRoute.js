import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    return (
        <React.Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (isAuthenticated === false) {
                            return <Redirect to="/login" />;
                        }
                        if (isAdmin === true && user.role !== "admin") {
                            return <Redirect to="/login" />;
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default ProtectedRoute;