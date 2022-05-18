import "./App.css";
import RocketDataTable from "./Components/RocketDataList";
import LaunchList from "./Components/LaunchDataList";
import LaunchPadData from "./Components/LaunchPadData";

function App() {
	return (
		<div className="App">
			<RocketDataTable />
			<LaunchList />
			<LaunchPadData />
		</div>
	);
}

export default App;
