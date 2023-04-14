import React, { Component } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo-04.png"

class App extends Component {
	state = { walletInfo: {} }
	componentDidMount() {
		fetch(`${document.location.origin}/api/wallet-info`)
			.then((response) => response.json())
			.then((json) => this.setState({ walletInfo: json }))
	}
	render() {
		const { address, balance } = this.state.walletInfo
		return (
			<div className="App">
				<img className="logo" src={logo}></img>
				<br />
				<h3>Welcome to the IndiGold Blockchain...</h3>
				<br />
				<div>
					<Link to="/blocks">Blocks</Link>
				</div>
				<div>
					<Link to="/conduct-transaction">Conduct a Transaction</Link>
				</div>
				<div>
					<Link to="/transaction-pool">Transaction Pool</Link>
				</div>
				<br />
				<div className="WalletInfo">
					<div className="UserData">User Address: {address}</div>
					<hr className="UserElement" />
					<div className="UserData">User Balance: {balance}</div>
				</div>
			</div>
		)
	}
}
export default App