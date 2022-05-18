import { useLaunchPad } from "../../hooks/useLaunchPad";

export default function LaunchPadData() {
	const { error, loading, data } = useLaunchPad();
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
				<h2>Location of Launchpads</h2>
			</div>
			<div className="CardContainer">
				{data.launchpads.map((lp) => (
					<div
						className="Card"
						key={lp.id}
						data-testid="LaunchPadData"
					>
						<h4>Details: {lp.details}</h4>
						<h4>
							Location: {lp.location.name},
							{lp.location.region}{" "}
						</h4>
					</div>
				))}
			</div>
		</section>
	);
}
