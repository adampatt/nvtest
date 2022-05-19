import React from "react";
import { useLaunches } from "../../hooks/useLaunches";
import LaunchDataCard from "./launchDataCard";

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

	if (data?.launchesPast.length === 0) {
		return (
			<div data-testid="no-data-to-display">
				No launches
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
					<LaunchDataCard
						mission_name={ld.mission_name}
						rocket={ld.rocket}
						launch_success={ld.launch_success}
						id={ld.id}
					/>
				))}
			</div>
		</section>
	);
}
