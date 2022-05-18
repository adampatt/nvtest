import { useLaunches } from "../../hooks/useLaunches";
export default function LaunchList() {
	const { error, loading, data } = useLaunches();

	if (error) {
		return <div>`Error! ${error.message}`</div>;
	}
	if (loading || !data) {
		return (
			<div data-testid="loading-stage">
				Loading...
			</div>
		);
	}
	return (
		<section className="sectionContainer">
			<div className="titleHolder">
				<h2>The five most recent launches</h2>
			</div>
			<div className="CardContainer">
				{data.launchesPast.map((ld) => (
					<div className="Card">
						<h4 data-testid="MissonName">
							Mission name: {ld.mission_name}{" "}
						</h4>
						<h4>Rocket: {ld.rocket.rocket_name} </h4>
						<h4>
							Success: {ld.launch_success ? "Yes" : "No"}{" "}
						</h4>
					</div>
				))}
			</div>
		</section>
	);
}
