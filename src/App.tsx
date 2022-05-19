import React from "react";
import "./App.css";
import LaunchList from "./Components/LaunchDataList";
import LaunchPadData from "./Components/LaunchPadData";
import Table from "./Components/Table";

function App() {
	return (
		<div className="App">
			<LaunchList />
			<Table />
			<LaunchPadData />
		</div>
	);
}

export default App;
