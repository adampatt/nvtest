import React from "react";
import { Launchpads } from "../../hooks/useLaunchPad";
import "./styles.css";

export default function LaunchDataCard({
	location,
	name,
	id,
}: Launchpads) {
	return (
		<div
			className="Card"
			key={id}
			data-testid="LaunchPadData"
		>
			<div className="IndividualCardDataLP">
				<h5 data-testid="MissonName">Name:</h5>
				<p>{name}</p>
			</div>
			<div className="IndividualCardDataLP">
				<h5 data-testid="MissonName">Location</h5>
				<p>
					{location.name},{location.region}{" "}
				</p>
			</div>
		</div>
	);
}
