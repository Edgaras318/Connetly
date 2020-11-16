import React from "react";
import "./App.css";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Switch } from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import EventCreation from "./components/EventCreation";
import CreateLocation from "./components/CreateLocation";
import LocationOverview from "./components/LocationOverview";
import JoinEvent from "./components/JoinEvent";
import Datepicker from "./components/Datepicker";
import Datepickerdays from "./components/Datepickerdays";
import Route from "./components/Route";
import Offlinepage from "./components/Offlinepage";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute path="/" component={Dashboard} exact />
				<PublicRoute path="/login" component={Login} />
				<PublicRoute path="/register" component={Register} />
				<Route path="/dashboard" component={Dashboard} />

				<PrivateRoute path="/createlocation" component={CreateLocation} />
				<PrivateRoute path="/joinevent" component={JoinEvent} />
				<PrivateRoute path="/locationoverview" component={LocationOverview} />
				<PrivateRoute path="/createevent" component={EventCreation} />
				<PublicRoute path="/offline" component={Offlinepage} />

				<PublicRoute path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
