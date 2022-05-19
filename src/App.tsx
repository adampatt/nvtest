import React from "react";
import "./App.css";
import RocketDataTable from "./Components/RocketDataList";
// import LaunchList from "./Components/LaunchDataList";
// import LaunchPadData from "./Components/LaunchPadData";
import Table from "./Components/Table";

function App() {
	return (
		<div className="App">
			<RocketDataTable />
			{/* <LaunchList />
			<LaunchPadData /> */}
			<Table />
		</div>
	);
}

export default App;
