import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
function SearchBar() {
	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate();
	const searchParams = (input) => {
		input = input.trim();
		const emptyInput = /^$/.test(input);
		const addressInput = /^[0-9a-f]{40}$/.test(input);
		const hashInput = /^[0-9a-f]{64}$/.test(input);
		if (emptyInput) {
			return false;
		}
		if (input.startsWith("000")) {
			return `/blocks/${input.toString()}`;
		}
		if (hashInput) {
			return `/transaction/${input.toString()}`;
		}
		if (addressInput) {
			return `/address/${input.toString()}`;
		}
	};
	const search = () => {
		const searchResult = searchParams(searchInput);
		console.log("search:" + searchResult);
		if (searchResult) {
			console.log(navigate);
			navigate(searchResult);
		} else {
			setSearchInput("");
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		search();
	};
	return (
		<div>
			<Form className="d-flex" onSubmit={handleSubmit}>
				<Form.Control
					type="search"
					placeholder="Search by Block Hash/Txn Hash/Addresss"
					className="me-2"
					aria-label="Search"
					onChange={(e) => {
						setSearchInput(e.target.value);
						console.log(e.target.value);
					}}
				/>
				<Button type="submit">Search</Button>
			</Form>
		</div>
	);
}
export default SearchBar;