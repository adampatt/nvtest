/* eslint-disable camelcase */
import React from "react";
import { Launches } from "../../hooks/useLaunches";
import Emoji from "../Emoji";
import "./styles.css";

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
				<h5>Mission name</h5>
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
