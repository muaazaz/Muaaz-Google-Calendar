import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../Pages/Home";
import Navbar from "../Components/Navbar";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import NotFound from "../Pages/404";
import CreateEvent from "../Pages/CreateEvent";
import EditEvents from "../Pages/EditEvents";
import Dashboard from "../Pages/Dashboard";
import Calendar from "../Pages/Calendar";
import PublicRoutes from "../Routes/Public";
import PrivateRoutes from "../Routes/Private";

const Routes = () => {
    return (
        <div className="App">
                <Router>
                    <Navbar />
                    <Switch>
                        <PublicRoutes exact path={"/"} component={Home} />
                        <PublicRoutes path={"/signup"} component={Signup} />
                        <PublicRoutes path={"/login"} component={Login} />

                        <PrivateRoutes path={"/dashboard"} component={Dashboard} />
                        <PrivateRoutes path={"/calendar"} component={Calendar} />
                        <PrivateRoutes path={"/event"} component={CreateEvent} />
                        <PrivateRoutes path={"/event/:id"} component={EditEvents} />

                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
        </div>
    );
}

export default Routes;