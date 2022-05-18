import React from "react";
import { Launches } from "../../hooks/useLaunches";

export default function LaunchDataCard({
	mission_name,
	rocket,
	launch_success,
	id,
}: Launches) {
	return (
		<div
			className="Card"
			data-testid="PastLaunchData"
			key={id}
		>
			<h4 data-testid="MissonName">
				Mission name: {mission_name}{" "}
			</h4>
			<h4>Rocket: {rocket.rocket_name} </h4>
			<h4>
				Success: {launch_success ? "Yes" : "No"}{" "}
			</h4>
		</div>
	);
}
