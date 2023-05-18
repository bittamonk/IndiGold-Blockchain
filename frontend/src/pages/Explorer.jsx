import "../../custom.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import SearchBar from "../navigation/SearchBar";
// import ReactTooltip from "react-tooltip";
// import { 'document-duplicate' } from "@heroicons/react";

function Explorer() {
	const [allConfirmedTransactions, setAllConfirmedTransactions] = useState([]);
	const [allConfirmedBlocks, setAllConfirmedBlocks] = useState([]);

	useEffect(() => {
		(async function loadData() {
			const confirmedTransactions = await axios.get(
				`http://localhost:5555/transactions/confirmed`
			);
			setAllConfirmedTransactions(
				confirmedTransactions.data.reverse().slice(0, 10)
			);
			const confirmedBlocks = await axios.get(`http://localhost:5555/blocks`);
			setAllConfirmedBlocks(confirmedBlocks.data.reverse().slice(0, 10));
		})();
	}, []);

	const howLongAgo = function (dateCreated) {
		const dt = new Date(dateCreated);
		const timestamp = dt.getTime();
		const now = new Date();
		const then = timestamp;
		const diff = now - then;
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(seconds / 3600);
		const days = Math.floor(seconds / 86400);
		const weeks = Math.floor(seconds / 604800);
		const months = Math.floor(seconds / 2629800);
		const years = Math.floor(seconds / 31557600);
		if (seconds < 60) {
			return `${seconds} seconds ago`;
		} else if (minutes < 60) {
			return `${minutes} minutes ago`;
		} else if (hours < 24) {
			return `${hours} hours ago`;
		} else if (days < 7) {
			return `${days} days ago`;
		} else if (weeks < 4) {
			return `${weeks} weeks ago`;
		} else if (months < 12) {
			return `${months} months ago`;
		} else {
			return `${years} years ago`;
		}
	};

	return (
		<div>
			<br />
			<h1>IndiGold Explorer</h1>
			<br></br>
			<SearchBar></SearchBar>
			<br></br>
			<div className="container-fluid">
				<div className="card">
					<div className="card-body">
						<h4 className="card-title-0">
							{/* Confirmed Blocks: {allConfirmedBlocks.length} */}
							Latest Blocks
						</h4>
						<div className="scrollable">
							{allConfirmedBlocks.length > 0 &&
								allConfirmedBlocks.map((d, index) => (
									<Row className="blk-data">
										<p className="first-line ln-ht">
											<span>
												Index: <span className="blue-text">{`${d.index}`}</span>
											</span>
											<span className="text-pink">
												{howLongAgo(`${d.dateCreated}`)}
											</span>
										</p>
										<p className="ln-ht">
											BlockHash:{" "}
											<a href={`/block/${d.blockHash}`}>{`${d.blockHash.slice(
												0,
												12
											)}...${d.blockHash.slice(52, 64)}`}</a>
										</p>
										<p className="ln-ht">
											Mined By:{" "}
											<a href={`/address/${d.minedBy}`}>{`${d.minedBy.slice(
												0,
												12
											)}...${d.minedBy.slice(28, 40)}`}</a>
										</p>
										<hr />
									</Row>
								))}
						</div>
					</div>
				</div>

				<div className="card">
					<div className="card-body">
						<h4 className="card-title-0">
							{/* Confirmed Transactions: {allConfirmedTransactions.length} */}
							Latest Transactions
						</h4>
						<div className="scrollable">
							{allConfirmedTransactions.length > 0 &&
								allConfirmedTransactions.map((d, index) => (
									<Row className="txn-data">
										<p className="first-line ln-ht">
											<span>
												{/* TxnHash: <span className="blue-text">{`${d.transactionDataHash}`}</span> */}
												TxnHash:{" "}
												<a
													href={`/transaction/${d.transactionDataHash}`}
												>{`${d.transactionDataHash.slice(
													0,
													7
												)}...${d.transactionDataHash.slice(57, 64)}`}</a>
											</span>
											<span className="text-pink">
												{howLongAgo(`${d.dateCreated}`)}
											</span>
										</p>
										<p className="ln-ht">
											From:{" "}
											<a href={`/address/${d.from}`}>{`${d.from.slice(
												0,
												12
											)}...${d.from.slice(28, 40)}`}</a>
										</p>
										<p className="ln-ht">
											To:{" "}
											<a href={`/address/${d.to}`}>{`${d.to.slice(
												0,
												12
											)}...${d.to.slice(28, 40)}`}</a>
										</p>
										<hr />
									</Row>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Explorer;
