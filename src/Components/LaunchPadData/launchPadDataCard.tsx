import React from "react";
import { Launchpads } from "../../hooks/useLaunchPad";

export default function LaunchDataCard({
	details,
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
			<h4>Name: {name}</h4>
			<h4>
				Location: {location.name},{location.region}{" "}
			</h4>
		</div>
	);
}
