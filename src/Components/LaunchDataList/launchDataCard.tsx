import React from "react";
import { Launches } from "../../hooks/useLaunches";
import Emoji from "../Emoji";

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
			<div className="IndividualCardData">
				<h5 data-testid="MissonName">
					Mission name
				</h5>
				<p>{mission_name}</p>
			</div>
			<div className="IndividualCardData">
				<h5>Rocket-name </h5>
				<p>{rocket.rocket_name}</p>
			</div>
			<div className="IndividualCardData">
				<h5>Was it a success? </h5>
				<p>
					{launch_success ? (
						<Emoji
							symbol="✅"
							label="greenTick"
						/>
					) : (
						<Emoji symbol="❌" label="redCross" />
					)}{" "}
				</p>
			</div>
		</div>
	);
}

// All centered
// Mission name rocket and success in block purple one line when wide, breaks down when smaller
// Display emoji for success
