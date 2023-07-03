import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Outlet,
	createRoutesFromElements,
} from "react-router-dom";
import { NetworkContext } from "./context/NetworkContext";
import "../custom.css";
import Faucet from "./pages/Faucet";
import Navbar from "./navigation/Navbar";
import Explorer from "./pages/Explorer";
import LandingPage from "./pages/LandingPage";
import Wallet from "./pages/Wallet";
import Mine from "./pages/Mine";
import Nodes from "./pages/Nodes";
import TransactionDetails from "./pages/TransactionDetails";
import BlockDetails from "./pages/BlockDetails";
import AddressDetails from "./pages/AddressDetails";

disableReactDevTools();

const Layout = () => {
	const [activePorts, setActivePorts] = useState([]);
	const [chosenPorts, setChosenPorts] = useState([]);

	return (
		<NetworkContext.Provider
			value={{ activePorts, setActivePorts, chosenPorts, setChosenPorts }}
		>
			<div>
				<Navbar />
				<Outlet />
			</div>
		</NetworkContext.Provider>
	);
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />}>
			<Route path="/" element={<LandingPage />}></Route>
			<Route path="/faucet" element={<Faucet />}></Route>
			<Route path="/explorer" element={<Explorer />}></Route>
			<Route path="/wallet" element={<Wallet />}></Route>
			<Route path="/mine" element={<Mine />}></Route>
			<Route path="/nodes" element={<Nodes />}></Route>
			<Route
				path="/transaction/:txHash"
				element={<TransactionDetails />}
			></Route>
			<Route path="/block/:blockHash" element={<BlockDetails />}></Route>
			<Route path="/address/:address" element={<AddressDetails />}></Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
